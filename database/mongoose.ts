import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in environment.");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("🔌 Connecting to MongoDB...");
        mongoose.set("strictQuery", true);

        cached.promise = mongoose
            .connect(MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
            })
            .then((mongoose) => {
                console.log("✅ MongoDB Connected:", mongoose.connection.host);
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB Error:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

(global as any).mongoose = cached;
