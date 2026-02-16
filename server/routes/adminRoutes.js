import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from "../controllers/adminController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.post("/questions", createQuestion);
router.get("/questions", getQuestions);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

export default router;
