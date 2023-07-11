import express  from "express";
import { getFriends, getFriendsSubmissions, getUserDetails, getUserSubmissions, removeFriend, signin, signup, updateUser, verifyUser } from "../controllers/users.js";

const router = express.Router();

router.get("/:username", getUserDetails);
router.get("/submissions/:username", getUserSubmissions);
router.get("/friends/:username", getFriends);
router.get("/friendsubmissions/:username", getFriendsSubmissions);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:username", updateUser);
router.delete("/:username/friends/:friendUsername", removeFriend);

export default router;