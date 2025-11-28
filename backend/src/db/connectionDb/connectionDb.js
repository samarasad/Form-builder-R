import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('mongoDB Connected');
  } catch (err) {
    console.error("mongoDB connection error:", err.message);
    process.exit(1); // stop the server if DB fails in production
  }
};
