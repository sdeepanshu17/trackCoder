import express  from "express";
import { getUserDetails, getUserSubmissions, signin, signup, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/:username", getUserDetails);
router.get("/submissions/:username", getUserSubmissions);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:username", updateUser);

export default router;