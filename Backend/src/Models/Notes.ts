import mongoose, { Document, Model } from "mongoose";

interface Note extends Document {
  title: String;
  content: String;
}

const noteSchema = new mongoose.Schema<Note>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Note: Model<Note> = mongoose.model("Note", noteSchema);
