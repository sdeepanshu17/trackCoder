import axios from "axios";

export const getLatestProblems = async (req, res) => {
    try {
        let apiCalls = [];
        apiCalls.push(axios.get(`https://codeforces.com/api/problemset.problems`));
        // more calls to be added in future
        
        const ans = await Promise.all(apiCalls);

        let resp = ans[0].data.result.problems.slice(0,20).map(obj => ({ oj: 'codeforces', name: obj.name, url: `https://codeforces.com/contest/${obj.contestId}/problem/${obj.index}`}));

        // res.status(200).json(ans[0].data.result.problems.slice(0,20));
        res.status(200).json(resp);
    } catch (error) {
        res.status(501);
    }
}