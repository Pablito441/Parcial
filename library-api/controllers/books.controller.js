import Book from "../models/Book.model.js";
import Author from "../models/Author.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authors");
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener todos los libros", error });
  }
};

export const getBookByID = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("authors");
    if (!book) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener el libro por id", error });
  }
};
export const createBook = async (req, res) => {
  try {
    const { authors } = req.body;

    if (!authors || authors.length === 0) {
      return res
        .status(400)
        .json({ message: "El libro debe tener al menos un autor" });
    }

    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isBookAssigned = await Author.exists({ books: bookId });
    if (isBookAssigned) {
      return res.status(400).json({
        message:
          "No se puede eliminar el libro porque está asignado a un autor",
      });
    }

    await Book.findByIdAndDelete(bookId);
    res.json({ message: "Libro eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
