import Question from "../model/Question.js";

// CRUD fro questions

//POST question
export const createQuestion = async (req, res) => {
  const { questionText, type, options, correctAnswer, explanation } = req.body;
  const question = await Question.create({
    questionText,
    type,
    options,
    correctAnswer,
    explanation,
  });
  res.status(201).json(question);
};

//GET question
export const getQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
};

// PUT question
export const updateQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });

  Object.assign(question, req.body);
  await question.save();
  res.json(question);
};

//DELETE question
export const deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });

  await question.remove();
  res.json({ message: "Question deleted" });
};
