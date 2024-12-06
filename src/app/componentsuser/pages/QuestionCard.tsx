import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

type QuestionCardProps = {
  question: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  handleAnswer: (selectedAnswer: string) => void;
};

const QuestionCard = ({ question, handleAnswer }: QuestionCardProps) => {
  const { question: qText, correct_answer, incorrect_answers } = question;
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (correct_answer && incorrect_answers) {
      setShuffledOptions(
        [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)
      );
    }
  }, [correct_answer, incorrect_answers]);

  if (!question || !qText) {
    return <div>No question available.</div>;
  }

  const sanitizedQuestion = DOMPurify.sanitize(qText);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2
        className="text-lg font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: sanitizedQuestion }}
        aria-live="polite"
      />
      <div>
        {shuffledOptions.map((option, index) => {
          const sanitizedOption = DOMPurify.sanitize(option);
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="block w-full text-left bg-gray-200 p-2 mb-2 rounded-lg hover:bg-blue-300"
              dangerouslySetInnerHTML={{ __html: sanitizedOption }}
              aria-label={`Option ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
