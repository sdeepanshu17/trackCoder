import express  from "express";
import { getFriends, getFriendsSubmissions, getUserDetails, getUserSubmissions, searchUser, signin, signup, toggleFriend, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/friendsubmissions", getFriendsSubmissions);
router.get("/submissions/:username", getUserSubmissions);
router.get("/friends", getFriends);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update", updateUser);
router.get("/profile/:username", getUserDetails);
router.patch("/friend/:friendUsername", toggleFriend);
router.get("/search", searchUser);

export default router;