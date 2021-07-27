import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const cardSchema = new Schema({
  en: { type: String, required: [true, 'Word field is required'] },
  ru: { type: String, required: [true, 'Translation field is required'] },
  img: { type: String, required: [true, 'Image is required'], unique: true },
  audio: { type: String, required: [true, 'Audio is required'], unique: true },
});

export const Cards = mongoose.model('card', cardSchema);
