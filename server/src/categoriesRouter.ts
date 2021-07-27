import { Router } from 'express';
import { categoriesController } from './categoriesController';

export const categoriesRouter = Router();

categoriesRouter.get('/api/categories', categoriesController.findAllCategories);
categoriesRouter.get('/api/categories/:name', categoriesController.findOneCategory);
categoriesRouter.post('/api/categories', categoriesController.createCategory);
categoriesRouter.patch('/api/categories/:name', categoriesController.updateCategory);
categoriesRouter.delete('/api/categories/:name', categoriesController.deleteCategory);
