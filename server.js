import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);

const connectDB = async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log("Failed to connect to DB:",err);
    }
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});




