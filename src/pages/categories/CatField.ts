import '../../scss/categories-card.scss';
import data from '../../data.json';
import { ICatCard, ICategory, ICatField } from '../../utils/interfaces';
import { CatCard } from './CatCard';

export class CatField {
  element: HTMLElement;

  categoriesRow: HTMLDivElement;

  cards: ICatCard[] = [];

  constructor() {
    this.element = document.createElement('section');
    this.element.classList.add('categories');
    this.element.innerHTML = `
    <div class="container-xxl">
      <div class="row categories__row"></div>
    </div>`;

    this.categoriesRow = this.element.querySelector('.categories__row') as HTMLDivElement;
  }

  init(): ICatField {
    this.setCards();
    this.addCards();
    return this;
  }

  setCards(): ICatField {
    const categoriesData: ICategory[] = data.categories;
    this.cards = categoriesData.map((categoryData: ICategory) =>
      new CatCard(categoryData.name, categoryData.img).init()
    );
    return this;
  }

  addCards(): ICatField {
    this.cards.map((card) => this.categoriesRow.append(card.element));
    return this;
  }

  clear(): ICatField {
    this.cards = [];
    this.categoriesRow.innerHTML = '';
    return this;
  }
}
