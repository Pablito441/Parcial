import express from "express";
//importacion de los ednpoints
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  addBookToAuthor,
} from "../controllers/authors.controller.js";

const router = express.Router();
//EndPoints
router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.put("/:id/addBook/:bookId", addBookToAuthor);

export default router;
