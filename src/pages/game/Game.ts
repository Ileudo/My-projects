import './game.scss';
import { BaseComponent } from '../../common/base-components';
import { Card } from './card/Card';
import { addZero, delay } from '../../utils/utils';
import { cardsField } from './cards-field/CardsField';
import { timer } from './timer/Timer';
import { Config, ImageThemeModel } from '../../utils/interfaces';
import { modalVictory } from '../modal/ModalVictory';
import { registration } from '../register/Registration';
import { settings } from '../settings/Settings';

/* Класс Game создает новую игру, где его метод будет добавлять на поле все карточки, которые у нас есть. */

const SHOW_TIME = 3000;
const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  activeCard?: Card;

  isChecking: boolean;

  points: number;

  rightAnswerCount: number;

  wrongAnswerCount: number;

  modalMinutesForm!: HTMLElement;

  modalSecondsForm!: HTMLElement;

  timeout: NodeJS.Timeout | null;

  constructor(config: Config) {
    super(config);
    this.points = 0;
    this.rightAnswerCount = 0;
    this.wrongAnswerCount = 0;
    this.isChecking = false;
    this.timeout = null;
  }

  render(): void {
    this.element.appendChild(timer.element);
    this.element.appendChild(cardsField.element);
    this.element.appendChild(modalVictory.element);
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.start();
    this.clearOnPageLeave();
  }

  async start(): Promise<void> {
    const res = await fetch('./assets/public/images.json');
    const cardSets: ImageThemeModel[] = await res.json();
    const cardSet = cardSets.find((cardset) => cardset.theme === settings.currentSettings.theme);
    if (cardSet) {
      let pathToImages = cardSet.images.map((name) => `${cardSet.theme}/${name}`);
      pathToImages = this.applyLevelSetting(pathToImages);
      cardsField.newGame(pathToImages);
    }

    this.forceTurn();
    cardsField.cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
  }

  applyLevelSetting(pathToImages: string[]): string[] {
    if (settings.currentSettings.difficulty === 'easy') {
      this.element.classList.add('easy');
      this.element.classList.remove('medium');
      this.element.classList.remove('hard');
      return pathToImages.slice(0, 4);
    }
    if (settings.currentSettings.difficulty === 'medium') {
      this.element.classList.remove('easy');
      this.element.classList.add('medium');
      this.element.classList.remove('hard');
      return pathToImages.slice(0, 6);
    }
    this.element.classList.remove('easy');
    this.element.classList.remove('medium');
    this.element.classList.add('hard');
    return pathToImages;
  }

  forceTurn(): void {
    this.timeout = setTimeout(() => {
      cardsField.cards.forEach((card) => {
        card.flipToBack();
        card.element.addEventListener('transitionend', () => card.element.classList.add('enabled'), { once: true });
      });

      timer.startTimer();
    }, SHOW_TIME);
  }

  private async cardHandler(card: Card) {
    if (this.isChecking) return;
    if (card.isFlipped) return;

    if (!this.activeCard) {
      this.activeCard = card;
      card.flipToFront();
      return;
    }

    this.isChecking = true;
    cardsField.cards.forEach((c) => c.element.classList.remove('enabled'));
    await card.flipToFront();

    if (this.activeCard.pathToImage !== card.pathToImage) {
      this.wrongAnswerCount++;
      this.activeCard.element.classList.add('wrong');
      card.element.classList.add('wrong');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.activeCard.element.classList.remove('wrong');
      card.element.classList.remove('wrong');
    } else {
      this.rightAnswerCount++;
      this.activeCard.element.classList.add('right');
      card.element.classList.add('right');
      this.checkVictory();
    }

    this.isChecking = false;
    this.activeCard = undefined;
    cardsField.cards.forEach((c) => c.element.classList.add('enabled'));
  }

  checkVictory(): void {
    if (cardsField.cards.every((card) => card.element.classList.contains('right'))) {
      timer.stopTimer();
      this.saveTime();
      modalVictory.openModal();
      this.calcPoints();
      this.savePlayerResultToDB();
    }
  }

  saveTime(): void {
    this.modalMinutesForm = document.getElementById('modal__minutes') as HTMLSpanElement;
    this.modalSecondsForm = document.getElementById('modal__seconds') as HTMLSpanElement;
    this.modalMinutesForm.textContent = `${timer.minutes}`;
    this.modalSecondsForm.textContent = addZero(timer.seconds);
  }

  calcPoints(): void {
    this.points = (this.rightAnswerCount - this.wrongAnswerCount) * 100 - timer.timePast / 100;
    if (this.points < 0) this.points = 0;
  }

  savePlayerResultToDB(): void {
    const openRequest = indexedDB.open('ileudo', 1);
    let db: IDBDatabase;

    const playerResult = {
      player: registration.data,
      minutes: timer.minutes,
      seconds: timer.seconds,
      rightAnswers: this.rightAnswerCount,
      wrongAnswers: this.wrongAnswerCount,
      points: this.points,
    };

    function addDataToDB() {
      const transaction = db.transaction('Score', 'readwrite');
      const games = transaction.objectStore('Score');
      games.add(playerResult);
    }

    openRequest.addEventListener('success', () => {
      db = openRequest.result;
      addDataToDB();
    });

    openRequest.addEventListener('error', () => {
      throw new Error('Request to database failed');
    });

    openRequest.addEventListener('upgradeneeded', () => {
      db = openRequest.result;
    });
  }

  clearOnPageLeave(): void {
    window.addEventListener('hashchange', () => {
      if (window.location.hash.slice(1) !== 'game') this.clear();
    });
  }

  clear(): void {
    this.points = 0;
    this.rightAnswerCount = 0;
    this.wrongAnswerCount = 0;
    this.isChecking = false;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = null;
    timer.clear();
    cardsField.clear();
  }
}

export const game = new Game({
  tag: 'section',
  classes: ['game-board'],
  id: 'game',
});
