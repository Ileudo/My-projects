import { fileService } from './fileService';
import { Categories } from './models/category';

class CardsController {
  async findAllCards(req, res) {
    try {
      const { categoryName } = req.params;
      const category = await Categories.findOne({ name: categoryName });
      if (!category) throw Error('No cards were found');
      const cards = category.cards;
      res.status(200).json(cards);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async findOneCard(req, res) {
    try {
      const { categoryName, enWord } = req.params;
      const category = await Categories.findOne({ name: categoryName });
      if (!category) throw Error('No card  was found');
      const card = category.cards.find((card) => card.en === enWord);
      if (!card) throw Error('No card was found');
      res.status(200).json(card);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async createCard(req, res) {
    try {
      const { categoryName } = req.params;
      const { en, ru } = req.body;
      console.log(en);
      const { img, audio } = req.files;
      const audioName = fileService.saveAudio(audio, categoryName);
      const imgName = fileService.saveImage(img, categoryName);
      const category = await Categories.findOne({ name: categoryName });
      category.img = imgName;
      if (!category) throw Error('No category was found');
      const newCard = { en, ru, img: imgName, audio: audioName };
      // const isExisted = category.cards.some((card) => card.en === en);
      // console.log(isExisted);
      // if (isExisted) throw Error('This word already exists');
      category.cards.push(newCard);
      await category.save();
      res.status(200).json(category.cards);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async updateCard(req, res) {
    try {
      const { categoryName, enWord } = req.params;
      const { en, ru } = req.body;
      const { img, audio } = req.files;
      const audioName = fileService.saveAudio(audio, categoryName);
      const imgName = fileService.saveImage(img, categoryName);
      const category = await Categories.findOne({ name: categoryName });
      if (!category) throw Error('No category was found');
      const newCard = { en, ru, img: imgName, audio: audioName };
      let cardIndex = category.cards.findIndex((card) => card.en === enWord);
      if (cardIndex < 0) throw Error('No card was found');
      category.cards.splice(cardIndex, 1);
      category.cards[cardIndex] = newCard;
      await category.save();
      res.status(200).json(category.cards);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async deleteCard(req, res) {
    try {
      const { categoryName, enWord } = req.params;
      const category = await Categories.findOne({ name: categoryName });
      if (!category) throw Error('No category was found');
      const cardIndex = category.cards.findIndex((card) => card.en === enWord);
      if (cardIndex < 0) throw Error('No card was found');
      category.cards.splice(cardIndex, 1);
      await category.save();
      res.status(200).json({});
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

export const cardsController = new CardsController();
