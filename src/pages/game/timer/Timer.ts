import './timer.scss';
import { BaseComponent } from '../../../common/base-components';
import { addZero } from '../../../utils/utils';
import { Config } from '../../../utils/interfaces';

export class Timer extends BaseComponent {
  minutes: number;

  seconds: number;

  timerInterval: NodeJS.Timeout | null;

  clearTimerInterval: void;

  timePast: number;

  minutesForm: HTMLSpanElement;

  secondsForm: HTMLSpanElement;

  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `<p class="game-board__timer">
    <span id="minutes">00</span>:<span id="seconds">00</span>
  </p>`;
    this.minutes = 0;
    this.seconds = 0;
    this.timerInterval = null;
    this.timePast = 0;
    this.minutesForm = this.element.querySelector('#minutes') as HTMLElement;
    this.secondsForm = this.element.querySelector('#seconds') as HTMLElement;
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.calcTime();
      this.showTime();
    }, 1000);
  }

  calcTime(): void {
    this.timePast += 1000;
    this.seconds = Math.round((this.timePast / 1000) % 60);
    this.minutes = Math.floor((this.timePast / 1000 / 60) % 60);
  }

  showTime(): void {
    try {
      this.minutesForm.textContent = addZero(this.minutes);
      this.secondsForm.textContent = addZero(this.seconds);
    } catch {
      this.stopTimer();
    }
  }

  stopTimer(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  clear(): void {
    this.stopTimer();
    this.minutes = 0;
    this.seconds = 0;
    this.timePast = 0;
    this.minutesForm.textContent = '00';
    this.secondsForm.textContent = '00';
  }
}

export const timer = new Timer({ tag: 'div', classes: ['game-board__timer-wrapper'], id: 'timer' });
