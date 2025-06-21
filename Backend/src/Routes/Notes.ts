import {
  createNote,
  deleteNote,
  getNote,
  getNoteById,
  updateNote,
} from "../Controllers/Notes";

import express from "express";
const router = express.Router();

router.get("/", getNote);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
