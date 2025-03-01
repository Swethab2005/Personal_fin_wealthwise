import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import finRouter from "./routes/finRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;


connectDB();


app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => res.send("API working"));

app.use("/api/finance", finRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
