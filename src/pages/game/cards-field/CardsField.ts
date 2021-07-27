import './cards-field.scss';
import { BaseComponent } from '../../../common/base-components';
import { Card } from '../card/Card';

export class CardsField extends BaseComponent {
  cards: Card[] = [];

  newGame(pathToImages: string[]): void {
    this.cards = pathToImages
      .concat(pathToImages)
      .map(
        (pathToImage) => new Card({ tag: 'div', classes: ['game-board__card-wrapper', 'flipped'], id: '' }, pathToImage)
      )
      .sort(() => Math.random() - 0.5);

    this.addCards();
  }

  addCards(): void {
    this.cards.forEach((card) => {
      card.render();
      this.element.appendChild(card.element);
    });
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }
}

export const cardsField = new CardsField({
  tag: 'div',
  classes: ['game-board__cards-field'],
  id: 'cards-field',
});
