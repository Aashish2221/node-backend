// CommonJS version
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // avoid strictQuery warnings on some Mongoose versions
    mongoose.set('strictQuery', false);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // fail fast
  }
};

module.exports = connectDB;
