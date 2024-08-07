import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express(); 

app.use(cookieParser());
app.use(cors({origin: "*", credentials: true}));
app.use(express.json());

// routes import
import userRouter from "./route/user.js";
import chatRoomRouter from "./route/chatRoom.js";

//routes declaration
app.use("/user", userRouter);
app.use("/chatRoom", chatRoomRouter);

export {app}