import express from "express";
import {
  getAllBooks,
  getBookByID,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";
//EndPoints

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
