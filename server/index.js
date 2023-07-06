import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createProxyMiddleware } from 'http-proxy-middleware';
import userRoutes from "./routes/users.js"
import { atcoderKKProxy, atcoderProxy, codechefProxy } from "./proxy/proxy.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use( '/graphql', createProxyMiddleware({ target: 'https://leetcode.com', changeOrigin: true }));
app.use(codechefProxy);
app.use(atcoderProxy);
app.use(atcoderKKProxy);

app.use('/users', userRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => console.log(err));
