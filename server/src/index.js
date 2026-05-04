import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors());
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/reports", reportRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//if (process.env.NODE_ENV !== 'production') {
//  app.listen(PORT, () => {
 //   console.log(`Server is running on port ${PORT}`);
 // });
//}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;



if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}



export default app;


