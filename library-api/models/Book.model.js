import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  gender: { type: String, required: true },
  publication: { type: Date, required: true },
  available: { type: Boolean, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
});

export default mongoose.model("Book", bookSchema);
