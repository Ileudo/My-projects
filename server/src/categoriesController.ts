import { Categories } from './models/category';

class CategoriesController {
  async findAllCategories(req, res) {
    try {
      const categories = await Categories.find();
      if (!categories) throw Error('No categories were found');
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async findOneCategory(req, res) {
    try {
      const { name } = req.params;
      const category = await Categories.findOne({ name: name });
      if (!category) throw Error('No category was found');
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const newCategory = new Categories({ name, img: '', cards: [] });
      await newCategory.save();
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const { name } = req.params;
      const { name: newName, img: newImg } = req.body;
      const updatedCategory = await Categories.findOneAndUpdate(
        { name: name },
        { name: newName, img: newImg },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { name } = req.params;
      await Categories.findOneAndRemove({ name: name });
      res.status(200).json({});
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

export const categoriesController = new CategoriesController();
