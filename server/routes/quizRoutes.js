import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuizByType, submitAnswer } from "../controllers/quizController.js";

const router = express.Router();
router.use(protect);

router.get("/:type", getQuizByType);
router.post("/submit", submitAnswer);

export default router;
