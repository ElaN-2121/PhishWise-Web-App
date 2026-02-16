import Question from "../model/Question.js";
import Attempt from "../model/Attempt.js";

export const getQuizByType = async (req, res) => {
  const type = req.params.type;
  const questions = await Question.find({ type }).select("-correctAnswer");
  res.json(questions);
};

export const submitAnswer = async (req, res) => {
  const { questionId, selectedAnswer } = req.body;
  const question = await Question.findById(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  const isCorrect = selectedAnswer === question.correctAnswer;

  await Attempt.create({ user: req.user._id, question: questionId, isCorrect });

  res.json({ correct: isCorrect, explanation: question.explanation });
};
