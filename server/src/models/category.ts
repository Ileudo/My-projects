import { Schema, model } from 'mongoose';

export const cardSchema = new Schema({
  en: { type: String, required: [true, 'Word field is required'] },
  ru: { type: String, required: [true, 'Translation field is required'] },
  img: { type: String, required: [true, 'Image is required'] },
  audio: { type: String, required: [true, 'Audio is required'] },
});

export const categorySchema = new Schema({
  name: { type: String, required: [true, 'Name field is required'], unique: true },
  img: { type: String },
  cards: [cardSchema],
});

export const Categories = model('category', categorySchema);
