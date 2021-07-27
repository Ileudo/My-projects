import { SERVER_ADRESS } from '../../..';
import { getData } from '../admin-panel-api';
import { catCardAdmin } from './catCardAdmin';
import { catCardNewAdmin } from './catCardNewAdmin';

export class AdminPanelCategories {
  element: HTMLElement;

  cardsField: HTMLDivElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.classList.add('admin-panel');
    this.element.innerHTML = `
    <div class="container-xxl">
      <div class="row admin-panel__row"></div>
    </div>`;
    this.cardsField = this.element.querySelector('.admin-panel__row') as HTMLDivElement;
  }

  init(): void {
    this.render();
    this.listenEvents();
  }

  render(): void {
    this.cardsField.innerHTML = '';
    getData().then((categoriesData) => {
      const addCards = categoriesData.map((category: { name: string; length: number }) => {
        return this.cardsField.append(new catCardAdmin(category.name, category.length).element);
      });
      this.cardsField.append(new catCardNewAdmin().element);
    });
  }

  listenEvents(): void {
    this.element.onclick = async (event: Event) => {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('admin-panel__card-btn-close')) {
          const card = event.target.closest('.admin-panel__card') as HTMLDivElement;
          const cardName = card.querySelector('.admin-panel__card-title') as HTMLHeadingElement;
          const categoryName = cardName.textContent;
          const responce = await fetch(`${SERVER_ADRESS}/api/categories/${categoryName}`, {
            method: 'DELETE',
          });
          const result = await responce.json();
          card.remove();
          localStorage.removeItem('admin-category');
          return result;
        }

        if (event.target.classList.contains('admin-panel__card-update')) {
          const card = event.target.closest('.admin-panel__card') as HTMLDivElement;
          card.classList.add('update');
        }

        if (event.target.classList.contains('admin-panel__card-cancel')) {
          const card = event.target.closest('.admin-panel__card') as HTMLDivElement;
          card.classList.remove('update');
        }

        if (event.target.classList.contains('admin-panel__card-update-submit')) {
          const card = event.target.closest('.admin-panel__card') as HTMLDivElement;
          const cardName = card.querySelector('.admin-panel__card-title') as HTMLHeadingElement;
          const oldCategoryName = cardName.textContent;
          const nameInput = card.querySelector('.admin-panel__card-form input') as HTMLInputElement;
          const newCategoryName = nameInput.value;
          const responce = await fetch(`${SERVER_ADRESS}/api/categories/${oldCategoryName}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name: newCategoryName }),
          });
          const result = await responce.json();
          this.init();
          return result;
        }

        if (event.target.classList.contains('admin-panel__card-add-category-cancel')) {
          const card = event.target.closest('.admin-panel__card-add-category') as HTMLDivElement;
          card.classList.remove('create');
        }

        if (event.target.classList.contains('admin-panel__card-add-category-image-content')) {
          const card = event.target.closest('.admin-panel__card-add-category') as HTMLDivElement;
          card.classList.add('create');
        }

        if (event.target.classList.contains('admin-panel__card-add-category-create')) {
          const card = event.target.closest('.admin-panel__card-add-category') as HTMLDivElement;
          const nameInput = card.querySelector('.admin-panel__card-add-category-form input') as HTMLInputElement;
          const name = nameInput.value;
          const responce = await fetch(`${SERVER_ADRESS}/api/categories`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name: name }),
          });
          const result = await responce.json();
          this.init();
          return result;
        }

        if (event.target.classList.contains('admin-panel__card-add-word')) {
          const card = event.target.closest('.admin-panel__card') as HTMLDivElement;
          const cardName = card.querySelector('.admin-panel__card-title') as HTMLHeadingElement;
          const categoryName = cardName.textContent as string;
          localStorage.setItem('admin-category', categoryName);
        }
      }
    };
  }
}
