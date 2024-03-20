import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

import { connectToDb } from "./service/db.js";
import authRouter from "./routes/auth.route.js";
import urlRouter from "./routes/url.routes.js";
import redirectRouter from "./routes/redirect.routes.js";

const app = express();
app.use(express.json());
const corsOptions = {
    "origin": "http://localhost:5173",
    "credentials": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));
app.use(cookieParser());
await connectToDb();

app.use("/auth", authRouter)
app.use("/url", urlRouter);
app.use("/", redirectRouter);

app.listen(process.env.PORT, () => {
    console.log(`😊 Server running on http://localhost:${process.env.PORT}/`);
});