import '../../scss/toggle-icon.scss';
import { IToggler } from '../../utils/interfaces';

export class Toggler implements IToggler {
  element: HTMLLabelElement;

  togglingClass: string;

  targetElement: HTMLElement;

  constructor(targetElement: string, togglingClass: string) {
    this.element = document.createElement('label');
    this.element.classList.add('toggler');
    this.element.innerHTML = `
      <input type="checkbox" ${localStorage.getItem('mode') === 'play' ? 'checked' : ''}>
      <span class="switch-left">Play</span>
      <span class="switch-right">Train</span>`;

    this.togglingClass = togglingClass;
    this.targetElement = document.querySelector(targetElement) as HTMLElement;
  }

  init(): IToggler {
    const checkbox = this.element.querySelector('input') as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      this.targetElement.classList.toggle(this.togglingClass);
      if (localStorage.getItem('mode') === null) {
        localStorage.setItem('mode', 'play');
      } else {
        localStorage.removeItem('mode');
      }
    });
    return this;
  }
}
