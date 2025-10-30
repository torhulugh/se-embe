import mongoose from "mongoose";

const connectDB = async () => {
  const dburl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
  try {
    await mongoose.connect(dburl);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    console.log(`Database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
