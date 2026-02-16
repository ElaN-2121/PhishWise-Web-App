import Certificate from "../model/Certificate.js";
import Attempt from "../model/Attempt.js";
import Question from "../model/Question.js";
import crypto from "crypto";

export const generateCertificate = async (req, res) => {
  const userId = req.user._id;

  const totalQuestions = await Question.countDocuments();
  const attempts = await Attempt.find({ user: userId });

  const bestAttemptsMap = {};
  attempts.forEach(a => {
    if (!bestAttemptsMap[a.question] || a.isCorrect) bestAttemptsMap[a.question] = a.isCorrect;
  });

  const correctCount = Object.values(bestAttemptsMap).filter(v => v).length;
  const percentage = (correctCount / totalQuestions) * 100;

  if (percentage < 80) return res.status(403).json({ message: "Not eligible for certificate" });

  let level = percentage >= 90 ? "Expert" : "Intermediate";

  let certificate = await Certificate.findOne({ user: userId });
  if (certificate) {
    // Upgrade if better score
    if (percentage > certificate.percentage) {
      certificate.percentage = percentage;
      certificate.level = level;
      certificate.lastUpdated = Date.now();
      await certificate.save();
    }
  } else {
    const year = new Date().getFullYear();
    const random = crypto.randomBytes(3).toString("hex").toUpperCase();
    const certificateId = `PHISH-${year}-${random}`;

    certificate = await Certificate.create({ user: userId, certificateId, percentage, level });
  }

  res.json({ message: "Certificate generated", certificate });
};

export const verifyCertificate = async (req, res) => {
  const certificate = await Certificate.findOne({ certificateId: req.params.certificateId }).populate("user", "name");
  if (!certificate) return res.json({ valid: false });

  res.json({
    valid: true,
    name: certificate.user.name,
    level: certificate.level,
    percentage: certificate.percentage,
    issuedAt: certificate.issuedAt
  });
};
