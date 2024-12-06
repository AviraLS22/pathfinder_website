import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectMongo;
