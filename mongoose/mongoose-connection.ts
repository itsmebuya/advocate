import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);
    console.log("connection successful");
  } catch (error) {
    console.log("Mongoose connection error", error);
    console.log("connection Failed");
  }
};
