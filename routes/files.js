import express from "express";
import { getFiles } from "#db/queries/files.js";

const router = express.Router();
export default router;

// GET /files — all files including folder_name
router.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.json(files);
  } catch (err) {
    next(err);
  }
});