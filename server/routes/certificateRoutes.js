import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateCertificate, verifyCertificate } from "../controllers/certificateController.js";

const router = express.Router();
router.post("/", protect, generateCertificate);
router.get("/verify/:certificateId", verifyCertificate);

export default router;
