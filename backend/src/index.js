import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import dns from "dns";

// Setting dns to this specific so that it don't break while connecting to MONGODB
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = env.PORT;
// Connect to db
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});