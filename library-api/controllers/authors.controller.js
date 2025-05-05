import Author from "../models/Author.model.js";
import Book from "../models/Book.model.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");
    if (!author)
      return res.status(404).json({ message: "Autor no encontrado" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El autor debe tener un nombre" });
    }

    const newAuthor = new Author(req.body);
    const saved = await newAuthor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updated = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: "Author eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addBookToAuthor = async (req, res) => {
  try {
    const { id, bookId } = req.params;

    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    if (author.books.includes(bookId)) {
      return res
        .status(400)
        .json({ message: "El libro ya está asociado al autor" });
    }

    author.books.push(bookId);
    await author.save();

    res.json({ message: "Libro agregado al autor", author });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
