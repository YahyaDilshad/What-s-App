import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to DB`);
  } catch (err) {
    console.log("❌ MongoDB Error: " + err.message);
  }
};

export default dbconnection;
