import express  from "express";
import { getLatestProblems } from "../controllers/problems.js";

const router = express.Router();

router.get("/latest", getLatestProblems);

export default router;