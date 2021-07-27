import '../../scss/category-card.scss';
import { flip, flipBack, playAudio } from '../../utils/functions';
import { ICard, ICardData } from '../../utils/interfaces';

export class Card {
  element: HTMLElement;

  en: string;

  ru: string;

  img: string;

  audio: string;

  constructor(cardData: ICardData) {
    this.en = cardData.en;
    this.ru = cardData.ru;
    this.img = cardData.img;
    this.audio = cardData.audio;

    this.element = document.createElement('a');
    this.element.classList.add('category__card', 'col-sm-6', 'col-lg-4', 'col-xl-3');
    this.element.innerHTML = `
    <div class="category__card-content">
      <div class="category__card-back">
        <span class="bi bi-music-note-beamed"></span>
        <div class="category__image-wrapper">
          <img src="./assets/images/${localStorage.getItem('category')}/${this.img}" alt="${this.en}" />
        </div>
        <div class="category__card-body">
          <p class="category__card-text">${this.en}</p>
          <span class="bi bi-arrow-repeat"></span>
        </div>
      </div>
      <div class="category__card-front">
        <div class="category__image-wrapper">
          <img src="./assets/images/${localStorage.getItem('category')}/${this.img}" alt="${this.ru}" />
        </div>
        <div class="category__card-body">
          <p class="category__card-text">${this.ru}</p>
        </div>
      </div>
      <audio src="./assets/audio/${localStorage.getItem('category')}/${this.audio}"></audio>
    </div>
    `;
  }

  init(): ICard {
    this.element.addEventListener('click', flip);
    this.element.addEventListener('click', playAudio);
    this.element.addEventListener('mouseleave', flipBack);
    return this;
  }
}
