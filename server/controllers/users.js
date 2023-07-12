import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from "dotenv";
import axios from "axios";
import cheerio from "cheerio";

dotenv.config();

const secret = process.env.SECRET; //secret key for the token generation
const BASE_URL = process.env.BASE_URL;

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPassCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const { name, leetcode, codechef, codeforces, atcoder, friends } = existingUser;
        const user = { name, username, leetcode, codechef, codeforces, atcoder, friends };

        const token = jwt.sign({ username: existingUser.username }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: user, token });

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
        const { leetcode, codechef, codeforces, atcoder, friends } = result;
        const user = { name, username, leetcode, codechef, codeforces, atcoder, friends };
        const token = jwt.sign({ username: result.username }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateUser = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const { name, codeforces, codechef, leetcode, atcoder } = req.body;
        const decodedData = jwt.verify(token, secret);
        let username = decodedData?.username;
        const user = await User.findOne({ username: decodedData?.username });
        if (!user) return res.status(404).json({ message: "User not found!" });
        // const existingUser = await User.findOne({ username });
        // if (!existingUser) return res.status(400).json({ message: "User not found!" });
        const updatedUser = await User.findByIdAndUpdate(user._id, { name, codeforces, codechef, leetcode, atcoder }, { new: true });
        const tok = jwt.sign({ username: updatedUser.username }, secret, { expiresIn: "1h" });
        const { friends } = updatedUser;
        const user1 = { name, username, leetcode, codechef, codeforces, atcoder, friends };
        res.status(200).json({ result: user1, token: tok });
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
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
            const updatedArray = ans[index].data.result.map(obj => ({ oj: 'codeforces', problem: obj.problem.name, verdict: obj.verdict, submissionUrl: `https://codeforces.com/contest/${obj.problem.contestId}/submission/${obj.id}`, problemUrl: `https://codeforces.com/contest/${obj.problem.contestId}/problem/${obj.problem.index}`, profileUrl: `https://codeforces.com/profile/${codeforces}`, profileUrl2: `/users/${username}`, timestamp: obj.creationTimeSeconds, username: username }));
            submissions = submissions.concat(updatedArray);
            index++;
        }
        if (leetcode) {
            const updatedArray = ans[index].data.data.recentAcSubmissionList?.map(obj => ({ oj: 'leetcode', problem: obj.title, verdict: 'OK', submissionUrl: `https://leetcode.com/submissions/detail/${obj.id}/`, problemUrl: `https://leetcode.com/problems/${obj.titleSlug}/`, profileUrl: `https://leetcode.com/${leetcode}`, profileUrl2: `/users/${username}`, timestamp: parseInt(obj.timestamp), username: username }));
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
        return submissions;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getFriendsSubmissions = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // console.log(token);
    // const { username } = req.params;
    try {
        const decodedData = jwt.verify(token, secret);
        // console.log(decodedData);
        const user = await User.findOne({ username: decodedData?.username });
        if (!user) return res.status(404).json({ message: "User not found!" });

        // const existingUser = await User.findOne({ username });
        // if (!existingUser) return res.status(400).json({ message: "User not found!" });

        const friends = user.friends;
        let submissions = [];
        for (let friend of friends) {
            const API = axios.create({ baseURL: BASE_URL });
            let { data } = await API.get(`/users/submissions/${friend}`);
            submissions = submissions.concat(data.result);
        }
        sortByOjProperty(submissions);
        res.status(200).json({ result: submissions });
    }
    catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

export const getFriends = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // const { username } = req.params;
    try {
        const decodedData = jwt.verify(token, secret);
        const user = await User.findOne({ username: decodedData?.username });
        if (!user) return res.status(404).json({ message: "User not found!" });

        // const existingUser = await User.findOne({ username });
        // if (!existingUser) return res.status(400).json({ message: "User not found!" });

        const friends = user.friends;
        res.status(200).json({ result: friends });
    }
    catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

export const toggleFriend = async (req, res) => {
    const { friendUsername } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decodedData = jwt.verify(token, secret);
        const username = decodedData?.username;
        const user = await User.findOne({ username: decodedData?.username });
        if (!user) return res.status(404).json({ message: 'User not found!' });


        const { friends } = user;
        const friendIndex = friends.indexOf(friendUsername);

        const { leetcode, codechef, codeforces, atcoder, name } = user;
        
        if (friendIndex === -1) {
            friends.push(friendUsername);
            await user.save();
            const newUser = { name, username, leetcode, codechef, codeforces, atcoder, friends };
            const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
            res.status(200).json({ result: newUser, token, message: 'Friend added successfully' });
        } else {
            friends.splice(friendIndex, 1);
            await user.save();
            const newUser = { name, username, leetcode, codechef, codeforces, atcoder, friends };
            const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
            res.status(200).json({ result: newUser, token, message: 'Friend removed successfully' });
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

export const searchUser = async (req, res) => {
    const searchQuery = req.query.user;

    try {
        let users = await User.find({
            $or: [
                { username: { $regex: searchQuery, $options: 'i' } },
                { name: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        users = users.map(obj => ({ username: obj.username }));
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getUserDetails = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const { name, codeforces, codechef, leetcode, atcoder } = user;

        let apiCalls = [];
        if (codeforces){
            apiCalls.push(axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`));
            apiCalls.push(axios.get(`https://codeforces.com/api/user.status?handle=${codeforces}`));
        }
        if (leetcode) {
            apiCalls.push(axios.get(`https://leetcode.com/graphql?query=query query {  matchedUser(username: "${leetcode}") { username profile {  reputation ranking } submitStats { acSubmissionNum { difficulty count submissions }  } } userContestRanking(username: "${leetcode}") { attendedContestsCount rating globalRanking totalParticipants topPercentage } recentAcSubmissionList(username: "${leetcode}", limit: 15){ title titleSlug timestamp} }`));
        }
        if (atcoder) {
            apiCalls.push(axios.get(`http://atcoder.jp/users/${atcoder}`));
            apiCalls.push(axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${atcoder}`));
        }
        if (codechef) {
            apiCalls.push(axios.get(`https://www.codechef.com/users/${codechef}`));
        }
        apiCalls.push(axios.get(`${BASE_URL}/users/submissions/${username}`));
        
        const ans = await Promise.all(apiCalls);
        let cfProfile = null;
        let lcProfile = null;
        let acProfile = null;
        let ccProfile = null;
        
        // console.log(ans[0].data.result);
        let index = 0;
        if (codeforces) {
            cfProfile = {
                username: codeforces,
                rating: ans[index].data.result[index].rating,
                rank: ans[index].data.result[index].rank,
                maxRating: ans[index].data.result[index].maxRating,
                totQues: (ans[index+1].data.result).filter((sub) => sub.verdict=="OK").length
            }
            index+=2;
        }

        if (leetcode) {
            lcProfile = {
                username: leetcode,
                rating: Math.round(ans[index].data.data.userContestRanking.rating),
                rank: ans[index].data.data.userContestRanking.globalRanking,
                totQues: ans[index].data.data.matchedUser.submitStats.acSubmissionNum[0].count,
                accuracy: (ans[index].data.data.matchedUser.submitStats.acSubmissionNum[0].count*100)/ans[index].data.data.matchedUser.submitStats.acSubmissionNum[0].submissions
            }
            index++;
        }

        if (atcoder){
            let $ = cheerio.load(ans[index].data);
            let rating = $('.dl-table tr:nth-child(2) td span:nth-child(1)').text();
            let maxRating = $('.dl-table tr:nth-child(3) td span:nth-child(1)').text();
            let globalRank = $('.dl-table tr:nth-child(1) td').text().replace(/[^0-9]/g, '');
            let fullySolvedCount = ans[index+1].data.count;
            acProfile = { username: atcoder, rating, maxRating, globalRank, fullySolvedCount };
            index+=2;
        }

        if (codechef) {
            let $ = cheerio.load(ans[index].data);
            let rating = $('.rating-number').contents().get(0).nodeValue.trim();
            let maxRating = $('.rating-header.text-center').find('small').text().trim().match(/\d+/)[0];
            let globalRank = $('.rating-ranks li:nth-child(1) strong').text().trim();
            let fullySolvedCount = $('.rating-data-section.problems-solved').find('h5').text().match(/\(.*?\)/)[0].replace(/\D/g, '');
            ccProfile = {username: codechef, rating, maxRating, globalRank, fullySolvedCount};
            index++;
        }

        let submissions = sortByOjProperty(ans[index].data.result);

        const resultObj = { name, username, cfProfile, lcProfile, acProfile, ccProfile, submissions}
        res.status(200).json(resultObj);
    } catch (error) {
    }
}

export const isFriend = async(req,res) => {
    try{
        const {username} = req.params;
        const {user} = req;
        const {friends} = user;
        if(friends.includes(username)){
            res.status(200).json({isFriend: true});
        }else{
            res.status(200).json({isFriend: false});
        }
    }catch(error){
        res.status(500).json({error: 'Something went wrong'});
    }
}