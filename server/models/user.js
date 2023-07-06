import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    leetcode: {type: String},
    codeforces: {type: String},
    codechef: {type: String},
    atcoder: {type: String},
    friends: {type: [String], default: []}
});

const User = mongoose.model('user',userSchema);

export default User;