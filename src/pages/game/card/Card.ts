import './card.scss';
import { BaseComponent } from '../../../common/base-components';
import { Config } from '../../../utils/interfaces';

export class Card extends BaseComponent {
  pathToImage: string;

  isFlipped = true;

  constructor(config: Config, pathToImage: string) {
    super(config);
    this.pathToImage = pathToImage;
  }

  render(): void {
    this.element.innerHTML = `
    <div class="game-board__card card">
      <div class="card__front" style="background-image: url('./assets/public/cardsets/${this.pathToImage}')">
        <div class="card__front-state">
          <div class="card__front-icon card__front-icon--right">
            <img src="./assets/public/icons/right.svg" alt="you're right">
          </div>
          <div class="card__front-icon card__front-icon--wrong">
          <img src="./assets/public/icons/wrong.svg" alt="you're wrong">
          </div>
        </div>
      </div>
      <div class="card__back"></div>
    </div>`;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  flipToFront(): Promise<void> {
    this.isFlipped = true;
    return this.flip();
  }

  private flip(): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('flipped');
      this.element.addEventListener('transitionend', () => resolve(), { once: true });
    });
  }
}

// const card = new Card({
//   tag: 'div',
//   classes: ['game-board__card-wrapper', 'flipped'],
//   id: '',
// },
//   'pathToImage'
// );
