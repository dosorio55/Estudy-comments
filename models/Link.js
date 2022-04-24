import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    name: { type: String, required: true },
    puntuation: { type: String, required: true },
    category: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model('Link', linkSchema);

export {Link}