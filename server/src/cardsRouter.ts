import { Router } from 'express';
import { cardsController } from './cardsController';

export const cardsRouter = Router();

cardsRouter.get('/api/:categoryName/cards', cardsController.findAllCards);
cardsRouter.get('/api/:categoryName/cards/:enWord', cardsController.findOneCard);
cardsRouter.post('/api/:categoryName/cards', cardsController.createCard);
cardsRouter.put('/api/:categoryName/cards/:enWord', cardsController.updateCard);
cardsRouter.delete('/api/:categoryName/cards/:enWord', cardsController.deleteCard);
