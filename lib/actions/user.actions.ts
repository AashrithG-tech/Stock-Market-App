'use server'

import { connectToDatabase } from "@/database/mongoose";

export const getAllUsersForNewsEmail = async () => {
    try {
        // Ensure DB connection
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error("No database connection");

        // TEMPORARY: Log collections so you know which one has your users
        const collections = await db.listCollections().toArray();
        console.log("Mongo Collections:", collections);

        // FIXED: Your auth system actually stores users in "users"
        // BUT many users had no "name", so they were being filtered out.
        const users = await db.collection("users").find(
            { email: { $exists: true, $ne: null } },
            { projection: { _id: 1, email: 1, name: 1 } }
        ).toArray();

        console.log("Fetched Users:", users);

        // FIXED: Removed the bad filter (was removing all users)
        return users.map((user) => ({
            id: user._id?.toString(),
            email: user.email,
            name: user.name || "User"   // fallback so Inngest won't crash
        }));

    } catch (e) {
        console.error("Error fetching users for news email", e);
        return [];
    }
}
