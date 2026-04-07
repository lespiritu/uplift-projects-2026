import express from "express";
import cors from "cors";

import connectDB from "./configs/connectDB.js";
import dotenv from "dotenv";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4502;

// MongoDB Connection
connectDB();

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api", (req, res) => {
  res.json({ name: "leon" });
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
