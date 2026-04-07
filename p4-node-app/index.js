import express from "express";
import connectDB from "./configs/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

// imported files
import userRoutes from "./routes/userRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import swaggerSpec from "./configs/swagger.js";

dotenv.config();
const app = express();

app.use("/client", express.static("views"));

//middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());

const PORT = process.env.PORT || 4502;

//connection to Database
connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/invitation", invitationRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
