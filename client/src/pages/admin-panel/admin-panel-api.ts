import { SERVER_ADRESS } from '../..';
import { ICardData } from '../../utils/interfaces';

export async function getData() {
  const responce = await fetch(`${SERVER_ADRESS}/api/categories`);
  const result = await responce.json();
  if (responce.status !== 200) throw new Error(`${result}`);
  const categoriesData = result.map((category: any) => {
    return { name: category.name, length: category.cards.length };
  });
  return categoriesData;
}

export async function findAllCategories() {
  const responce = await fetch(`${SERVER_ADRESS}/api/categories`);
  const result = await responce.json();
  if (responce.status !== 200) throw new Error(`${result}`);
  return result;
}

export async function findOneCategoryData(category: string) {
  const responce = await fetch(`${SERVER_ADRESS}/api/categories/${category}`);
  const result = await responce.json();
  if (responce.status !== 200) throw new Error(`${result}`);
  return result;
}

export async function getWordsData(categoryName: string) {
  try {
    const responce = await fetch(`${SERVER_ADRESS}/api/${categoryName}/cards`);
    const result: ICardData[] = await responce.json();
    if (responce.status !== 200) throw new Error(`${result}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
