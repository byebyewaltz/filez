import express from "express";
import { getFolders, getFolderById } from "#db/queries/folders.js";
import { createFile } from "#db/queries/files.js";

const router = express.Router();
export default router;

const REQUIRED_FILE_FIELDS = ["name", "size"];

// GET /folders — all folders
router.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.json(folders);
  } catch (err) {
    next(err);
  }
});

// Shared :id lookup — runs for any route using :id
router.param("id", async (req, res, next, id) => {
  try {
    const folder = await getFolderById(id);
    if (!folder) return res.status(404).send("Folder not found.");
    req.folder = folder;
    next();
  } catch (err) {
    next(err);
  }
});

// GET /folders/:id — folder including its files array
router.get("/:id", (req, res) => {
  res.json(req.folder);
});

// POST /folders/:id/files — create a file inside the folder
router.post("/:id/files", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required.");
    }

    for (const field of REQUIRED_FILE_FIELDS) {
      if (req.body[field] === undefined) {
        return res.status(400).send(`Missing required field: ${field}`);
      }
    }

    const { name, size } = req.body;
    const file = await createFile({ name, size, folder_id: req.folder.id });
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
});