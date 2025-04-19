import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;
