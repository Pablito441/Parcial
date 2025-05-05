import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  birthdate: { type: Date, required: true },
  nationality: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model("Author", authorSchema);
