import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const QuizPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const category = "Science"; // Replace with dynamic category if needed

  // Fetch quiz questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, "categories", category, "questions");
        const snapshot = await getDocs(questionsRef);
        const fetchedQuestions = snapshot.docs.map(doc => ({
          id: doc.id,
          question: doc.data().question,
          answers: doc.data().answers.map((answer: string) => answer.replace(/"/g, "")),
          correctAnswer: doc.data().correctAnswer.replace(/"/g, ""),
        }));

        // Shuffle answers for each question
        const shuffledQuestions = fetchedQuestions.map(question => ({
          ...question,
          answers: question.answers.sort(() => Math.random() - 0.5), // Shuffle answers here
        }));

        setQuestions(fetchedQuestions);
        setShuffledQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswerSubmit = () => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1); // Increment score by 1
    }

    // Move to the next question or complete the quiz
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(""); // Reset selected answer
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const handleRestart = () => {
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");

    // Shuffle questions again for a fresh experience
    const reshuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(reshuffled);
  };

  return (
    <div className="min-h-screen p-10 ">
      <div className="max-w-3xl mx-auto bg-slate-800 shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Take the Quiz</h1>

        {quizCompleted ? (
          <div>
            <h2 className="text-xl font-bold text-green-600">Quiz Completed!</h2>
            <p className="mt-4 text-lg">Your Score: {score} / {shuffledQuestions.length}</p>
            <button
              onClick={handleRestart}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : shuffledQuestions.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </h2>
            <p className="mt-4">{shuffledQuestions[currentQuestionIndex].question}</p>

            <div className="mt-4">
              {shuffledQuestions[currentQuestionIndex].answers.map((answer: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(answer)}
                  className={`block w-full text-left p-2 my-2 border rounded ${
                    selectedAnswer === answer ? "bg-green-400 text-white" : "bg-"
                  } hover:bg-green-400`}
                >
                  {answer}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {currentQuestionIndex + 1 === shuffledQuestions.length ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
