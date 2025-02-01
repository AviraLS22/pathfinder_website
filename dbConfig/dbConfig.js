import mongoose from 'mongoose';

let isConnected = 0; // Track the connection state

const connectMongo = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection;
  }
//rough comment
  try {
    const db = await mongoose.connect(process.env.MONGO_URI); // No need for deprecated options

    isConnected = db.connections[0].readyState; // 1 means connected
    console.log("MongoDB Connected Successfully");
    return db.connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongo;
