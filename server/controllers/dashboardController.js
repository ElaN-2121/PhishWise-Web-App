import Question from "../model/Question.js";
import Attempt from "../model/Attempt.js";

export const getDashboard = async (req, res) => {
  const userId = req.user._id;

  const totalQuestions = await Question.countDocuments();
  const attempts = await Attempt.find({ user: userId });

  // best attempt per question
  const bestAttemptsMap = {};
  attempts.forEach(a => {
    if (!bestAttemptsMap[a.question] || a.isCorrect) bestAttemptsMap[a.question] = a.isCorrect;
  });

  const correctCount = Object.values(bestAttemptsMap).filter(v => v).length;
  const percentage = (correctCount / totalQuestions) * 100;

  const knowledgeCompleted = await Attempt.countDocuments({ user: userId, "question": { $in: await Question.find({ type: "knowledge" }).select("_id") } });
  const realWorldCompleted = await Attempt.countDocuments({ user: userId, "question": { $in: await Question.find({ type: "realworld" }).select("_id") } });
  const labsCompleted = await Attempt.countDocuments({ user: userId, "question": { $in: await Question.find({ type: "lab" }).select("_id") } });

  let level = null;
  if (percentage >= 90) level = "Expert";
  else if (percentage >= 80) level = "Intermediate";

  res.json({
    totalQuestions,
    correct: correctCount,
    percentage,
    knowledgeCompleted,
    realWorldCompleted,
    labsCompleted,
    level,
    eligibleForCertificate: percentage >= 80
  });
};
