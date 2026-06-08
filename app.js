import express from "express";
import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

const app = express();
export default app;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// body parsing
app.use(express.json());

// routes
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

// error handling
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});