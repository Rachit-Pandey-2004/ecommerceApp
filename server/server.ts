import express from 'express'
import connect from './src/configs/mongoDB'
import authRoutes from './src/routes/auth.route'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

dotenv.config();
connect();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("✅ Server running on port 3000"));