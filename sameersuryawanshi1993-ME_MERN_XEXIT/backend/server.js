import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/config.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);

app.listen(port, () => {
  console.log(`Server is Running on port: ${port} `);
  connectDb();
});
