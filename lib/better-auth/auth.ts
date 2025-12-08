import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    // Connect MongoDB
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("MongoDB connection not found");

    authInstance = betterAuth({
        database: mongodbAdapter(db as any),

        secret: process.env.BETTER_AUTH_SECRET!,
        baseURL: process.env.BETTER_AUTH_URL!,

        /**
         * ❌ VERY IMPORTANT:
         * Completely disable email verification & email sending
         * (this prevents Nodemailer errors & hanging signup calls)
         */
        email: {
            sendVerificationEmail: false,
        },

        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false, // MUST be false
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },

        plugins: [nextCookies()],
    });

    return authInstance;
};

export const auth = await getAuth();
