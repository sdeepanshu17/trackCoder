import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from "dotenv";
import axios from "axios";
import cheerio from "cheerio";
import { JSDOM } from "jsdom";

dotenv.config();

const secret = process.env.SECRET; //secret key for the token generation

export const verifyUser = async (req,res) => {
    try {
        const { token } = req.body;
        const decodedData = jwt.verify(token, secret);
        const user = await User.findOne({ username: decodedData?.username });
        if (!user) return res.status(404).json({ message: "User doesn't exist." });
        res.status(200).json({ result: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPassCorrect) return res.status(400).json({ message: "Invalid credentials." })

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => {
    const { password, confirmPassword, name, username } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already exists." })
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." })

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ username, password: hashedPassword, name });
        // console.log(result);
        const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getUserDetails = async (req, res) => {
    const { username } = req.params;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "User not found!" });
        res.status(200).json({ result: existingUser });
    } catch (error) {

    }
}

export const updateUser = async (req, res) => {
    const { username } = req.params;
    const { name, codeforces, codechef, leetcode, atcoder } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "User not found!" });
        const updatedUser = await User.findByIdAndUpdate(existingUser._id, { name, codeforces, codechef, leetcode, atcoder }, { new: true });
        const token = jwt.sign({ username: updatedUser.username, id: updatedUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: updatedUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

function sortByOjProperty(objectsArray) {
    objectsArray.sort((a, b) => {
        return b.timestamp - a.timestamp;
    });

    return objectsArray;
}

export const getUserSubmissions = async (req, res) => {
    const { username } = req.params;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "User not found!" });
        const codeforces = existingUser.codeforces;
        const leetcode = existingUser.leetcode;
        const atcoder = existingUser.atcoder;
        const codechef = existingUser.codechef;
        // console.log(leetcode);
        let submissions = [];
        let apiCalls = [];
        if (codeforces) {
            const CF = axios.create({ baseURL: 'https://codeforces.com/api/' });
            apiCalls.push(CF.get(`/user.status?handle=${codeforces}&from=1&count=20`));
        }
        if (leetcode) {
            const LC = axios.create({ baseURL: 'https://leetcode.com/' });
            apiCalls.push(LC.get(`/graphql?query=query {recentAcSubmissionList(username: "${leetcode}", limit: 20) {id title titleSlug timestamp }}`));
        }
        if (atcoder) {
            const AC = axios.create({ baseURL: 'https://kenkoooo.com/atcoder/atcoder-api/v3/' });
            const currentDate = new Date(); const pastDate = new Date();
            pastDate.setDate(currentDate.getDate() - 14);
            const time = Math.round(pastDate.getTime() / 1000);
            apiCalls.push(AC.get(`/user/submissions?user=${atcoder}&from_second=${time}`));
        }
        // if (codechef){
        //     const CC = axios.create({baseURL: 'https://www.codechef.com'});
        //     apiCalls.push(CC.get(`/users/${codechef}`));
        // }
        const ans = await Promise.all(apiCalls);
        let index = 0;
        if (codeforces) {
            // https://codeforces.com/contest/1132/submission/211390463
            const updatedArray = ans[index].data.result.map(obj => ({ oj: 'codeforces', problem: obj.problem.name, verdict: obj.verdict, submissionUrl: `https://codeforces.com/contest/${obj.problem.contestId}/submission/${obj.id}`, problemUrl: `https://codeforces.com/contest/${obj.problem.contestId}/problem/${obj.problem.index}`, profileUrl: `https://codeforces.com/profile/${codeforces}`, profileUrl2: `/users/${username}`, timestamp: obj.creationTimeSeconds, username: username }));
            submissions = submissions.concat(updatedArray);
            index++;
        }
        if (leetcode) {
            const updatedArray = ans[index].data.data.recentAcSubmissionList.map(obj => ({ oj: 'leetcode', problem: obj.title, verdict: 'OK', submissionUrl: `https://leetcode.com/submissions/detail/${obj.id}/`, problemUrl: `https://leetcode.com/problems/${obj.titleSlug}/`, profileUrl: `https://leetcode.com/${leetcode}`, profileUrl2: `/users/${username}`, timestamp: parseInt(obj.timestamp), username: username }));
            submissions = submissions.concat(updatedArray);
            index++;
        }
        if (atcoder) {
            const updatedArray = ans[index].data.map(obj => ({ oj: 'atcoder', problem: obj.problem_id, verdict: obj.result, submissionUrl: `https://atcoder.jp/contests/${obj.contest_id}/submissions/${obj.id}`, problemUrl: `https://atcoder.jp/contests/${obj.contest_id}/tasks/${obj.problem_id}`, profileUrl: `https://atcoder.jp/users/${codeforces}`, profileUrl2: `/users/${username}`, timestamp: obj.epoch_second, username: username }));
            submissions = submissions.concat(updatedArray);
            index++;
        }
        // if (codechef){
        //     const $ = cheerio.load(ans[index]);
        //     submissions.push(ans[index].data);
        //     // console.log(ans[index]);
        //     const data = [];
        //     $('table.dataTable tbody tr').each((index, element) => {
        //     const row = {};
        //     $(element)
        //         .find('td')
        //         .each((i, el) => {
        //         const header = $(el).closest('table').find('th').eq(i).text().trim();
        //         const value = $(el).text().trim();
        //         row[header] = value;
        //         });
        //     data.push(row);
        //     });
        //     console.log(data);
        //     submissions = submissions.concat(data);
        //     index++;
        // }

        // console.log(ans[index]);

        sortByOjProperty(submissions);
        res.status(200).json({ result: submissions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getFriendsSubmissions = async (req, res) => {
    const { username } = req.params;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "User not found!" });

        const friends = existingUser.friends;
        let submissions = [];
        for (let friend of friends) {
            // console.log(friend);
            const API = axios.create({ baseURL: 'http://localhost:5001/' });
            let { data } = await API.get(`/users/submissions/${friend}`);
            submissions = submissions.concat(data.result);
            // console.log(res);
        }
        sortByOjProperty(submissions);
        res.status(200).json({ result: submissions });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getFriends = async (req, res) => {
    const { username } = req.params;
    // console.log(username);
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "User not found!" });
        const friends = existingUser.friends;
        res.status(200).json({ result: friends });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const removeFriend = async (req, res) => {
    const { username, friendUsername } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) { return res.status(404).json({ message: 'User not found' }); }

        const { friends } = user;
        const friendIndex = friends.indexOf(friendUsername);
        if (friendIndex === -1) { return res.status(404).json({ message: 'Friend not found in the user\'s friends list' }); }
        friends.splice(friendIndex, 1);
        await user.save();
        res.json({ message: 'Friend removed successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}