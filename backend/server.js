import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DBURL);
    if (db) {
      console.log("DB is connected");
    }
  } catch (error) {
    console.log(error);
  }
};
