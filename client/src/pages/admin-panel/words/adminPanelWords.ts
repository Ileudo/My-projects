import { SERVER_ADRESS } from '../../..';
import { ICardData } from '../../../utils/interfaces';
import { getWordsData } from '../admin-panel-api';
import { WordCardAdmin } from './wordCardAdmin';
import { WordCardNewAdmin } from './wordCardNewAdmin';

export class AdminPanelWords {
  element: HTMLElement;

  categoryName: string;

  cardsField: HTMLDivElement;

  constructor(categoryName: string) {
    this.categoryName = categoryName;
    this.element = document.createElement('section');
    this.element.classList.add('words');
    this.element.innerHTML = `
    <div class="container-xxl">
      <h2 class="words__title">${categoryName}</h2>
      <div class="row words__row"></div>
    </div>`;
    this.cardsField = this.element.querySelector('.words__row') as HTMLDivElement;
  }

  async init(): Promise<void> {
    await this.render();
    this.listenEvents();
  }

  async render(): Promise<void> {
    this.cardsField.innerHTML = '';
    try {
      const wordsData: ICardData[] | undefined = await getWordsData(this.categoryName);
      if (!wordsData) return;
      wordsData.map(({ en, ru, img, audio }) => {
        const wordCard = new WordCardAdmin(en, ru, img, audio);
        return this.cardsField.append(wordCard.element);
      });
      const newWordCard = new WordCardNewAdmin();
      this.cardsField.append(newWordCard.element);
    } catch (error) {}
  }

  listenEvents(): void {
    this.element.onclick = async (event: Event) => {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('words__new-card-add-word-image-content')) {
          const card = event.target.closest('.words__new-card') as HTMLDivElement;
          card.classList.add('change');
        }

        if (event.target.classList.contains('words__new-card-btn-cancel')) {
          const card = event.target.closest('.words__new-card') as HTMLDivElement;
          card.classList.remove('change');
        }

        if (event.target.classList.contains('words__new-card-btn-add')) {
          event.preventDefault();
          const card = event.target.closest('.words__new-card') as HTMLDivElement;
          const form = card.querySelector('form') as HTMLFormElement;
          const formData = new FormData(form);
          const responce = await fetch(`${SERVER_ADRESS}/api/${this.categoryName}/cards`, {
            method: 'POST',
            body: formData,
          });
          const result = responce.json();
          this.init();
          return result;
        }

        if (event.target.classList.contains('words__card-btn-change')) {
          const card = event.target.closest('.words__card') as HTMLDivElement;
          card.classList.add('change');
        }

        if (event.target.classList.contains('words__card-btn-cancel')) {
          const card = event.target.closest('.words__card') as HTMLDivElement;
          card.classList.remove('change');
        }

        if (event.target.classList.contains('words__card-btn-add')) {
          event.preventDefault();
          const card = event.target.closest('.words__card') as HTMLDivElement;
          const form = card.querySelector('form') as HTMLFormElement;

          const formData = new FormData(form);
          const enWord = card.querySelector('.words__card-form-en-word') as HTMLSpanElement;
          const en = enWord.textContent;
          const responce = await fetch(`${SERVER_ADRESS}/api/${this.categoryName}/cards/${en}`, {
            method: 'PUT',
            body: formData,
          });
          const result = responce.json();
          this.init();
          return result;
        }

        if (event.target.classList.contains('words__card-btn-close')) {
          const card = event.target.closest('.words__card') as HTMLDivElement;
          const enWord = card.querySelector('.words__card-form-en-word') as HTMLSpanElement;
          const en = enWord.textContent;
          const responce = await fetch(`${SERVER_ADRESS}/api/${this.categoryName}/cards/${en}`, {
            method: 'DELETE',
          });
          const result = await responce.json();
          card.remove();
          return result;
        }
      }
    };
  }
}
