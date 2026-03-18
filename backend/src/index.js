import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import { setServers } from "node:dns/promises";

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        setServers(["1.1.1.1", "8.8.8.8"]);
        await connectDB();
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });
        
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("MongoDB connection failed!!", error);
    }
}

startServer();