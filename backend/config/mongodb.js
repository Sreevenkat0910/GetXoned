import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Atlas Connected");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        // Enhanced connection options for Atlas
        const options = {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
        };

        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, options);
        console.log("🚀 MongoDB Atlas connection established");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB Atlas:", error.message);
        // Don't exit the process, let the server continue without DB
    }
}

export default connectDB;