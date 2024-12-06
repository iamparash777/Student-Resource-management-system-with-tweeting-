  import { useState } from "react";
  import { db } from "../../firebaseConfig";
  import { collection, addDoc, Timestamp } from "firebase/firestore";
  import { getAuth } from "firebase/auth";

  const Page = () => {
    const [category, setCategory] = useState("");
    const [inputText, setInputText] = useState("");
    const [parsedData, setParsedData] = useState<any[]>([]);

    const parseQuestion = (input: string) => {
      const questionMatch = input.match(/Question: (.*?)\?/);
      const question = questionMatch ? questionMatch[1] : null;

      const answersMatch = input.match(/\? (.*)\./);
      const answers = answersMatch ? answersMatch[1].split(",").map(a => a.trim()) : [];

      const correctAnswerMatch = answers.find(answer => answer.startsWith('"') && answer.endsWith('"'));
      const correctAnswer = correctAnswerMatch ? correctAnswerMatch.replace(/"/g, '') : null;

      return {
        question,
        answers,
        correctAnswer,
      };
    };

    const handleSubmit = async () => {
      // Validate user authentication
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("You must be signed in to add questions.");
        return;
      }

      // Validate category input
      if (!category.trim()) {
        alert("Category cannot be empty!");
        return;
      }

      const lines = inputText.split("\n").filter(line => line.trim() !== "");
      const questions = lines.map(line => parseQuestion(line));
      setParsedData(questions);

      try {
        const categoryRef = collection(db, "categories", category, "questions");

        for (const item of questions) {
          if (!item.question || !Array.isArray(item.answers) || item.answers.length === 0 || !item.correctAnswer) {
            console.warn("Skipping invalid question item:", item);
            continue;
          }

          await addDoc(categoryRef, {
            question: item.question,
            answers: item.answers,
            correctAnswer: item.correctAnswer,
            timestamp: Timestamp.now(),
            userId: currentUser.uid, // Associate with the current user
          });
        }

        alert("Questions added successfully!");
        setInputText(""); // Clear input after successful submission
        setCategory(""); // Clear category
      } catch (error) {
        console.error("Error adding questions:", error);
        alert("Failed to add questions. Please check the console for more details.");
      }
    };

    const handleRestart = () => {
      setParsedData([]); // Reset questions
      setCategory(""); // Clear category
      setInputText(""); // Clear input
    };

    return (
      <div className="min-h-screen p-10 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Add Questions to a Category</h1>
          <label className="block mb-2 font-medium">Category Name:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category name (e.g., Science, Computer)"
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-2 font-medium">Questions:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Enter questions in the format:\nQuestion: What is 2+2?\nAnswers: "4", 3, 5, 6.`}
            rows={10}
            className="w-full mb-4 p-2 border rounded"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Questions
          </button>

          {parsedData.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Parsed Questions</h2>
              <ul className="mt-2">
                {parsedData.map((item, index) => (
                  <li key={index} className="border-b py-2">
                    <strong>Question:</strong> {item.question} <br />
                    <strong>Answers:</strong> {item.answers.join(", ")} <br />
                    <strong>Correct Answer:</strong> {item.correctAnswer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  };

  export default Page;
