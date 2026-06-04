import express from "express";
import filesRouter   from "./routes/files.js";
import foldersRouter from "./routes/folders.js";

const app = express();
export default app;

// Body-parsing middleware
app.use(express.json());

// Routes
app.use("/files",   filesRouter);
app.use("/folders", foldersRouter);

// Error-handling middleware — must be last, must have 4 params
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error.");
});