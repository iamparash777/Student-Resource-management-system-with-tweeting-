import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';
const app = express();
const openai = new OpenAI({
  apiKey: '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',
});

app.use(cors());
app.use(express.json());

// Endpoint to fetch quiz questions
app.get('/quiz', async (req, res) => {
  const { category, difficulty, questionType } = req.query;

  try {
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a quiz generator.' },
        { role: 'user', content: `Generate a ${difficulty} ${questionType} question in the category of ${category}. Provide four options and the correct answer.` },
      ],
    });

    const questionData = gptResponse.choices[0].message.content;

    // Parse the GPT response into the structure you need
    const parsedData = parseQuestionData(questionData);

    res.json(parsedData);
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to parse GPT output
const parseQuestionData = (data) => {
  const questionRegex = /Question: (.*?)\n/;
  const optionsRegex = /Options: (.*?)\n/;
  const answerRegex = /Answer: (.*?)\n/;

  const questionMatch = data.match(questionRegex);
  const optionsMatch = data.match(optionsRegex);
  const answerMatch = data.match(answerRegex);

  if (questionMatch && optionsMatch && answerMatch) {
    return {
      question: questionMatch[1],
      options: optionsMatch[1].split(', '),
      correctAnswer: answerMatch[1],
    };
  }

  return {};
};

app.listen(5000, () => {
  console.log('API running on port 5000');
});
