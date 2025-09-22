const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to ThinkBBridge db");
        return true;
    } catch (error) {
        console.error('Database connection error:', error.message);
        return false;
    }
};

module.exports = connectDB;