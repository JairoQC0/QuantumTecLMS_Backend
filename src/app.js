// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRouter } from "./modules/auth/auth.routes.js";
import { userRouter } from "./modules/users/user.routes.js";
import { courseRouter } from "./modules/courses/course.routes.js";
import { contentRouter } from "./modules/content/content.routes.js";
import { enrollmentRouter } from "./modules/enrollments/enrollment.routes.js";
import { assignmentRouter } from "./modules/assignments/assignment.routes.js";
import { errorHandler } from "./core/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/content", contentRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/api/assignments", assignmentRouter);

// Health
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`LMS backend escuchando en puerto ${PORT}`);
});
