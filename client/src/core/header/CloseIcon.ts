import '../../scss/close-icon.scss';
import { ICloseIcon } from '../../utils/interfaces';

export class CloseIcon {
  element: HTMLElement;

  target: string;

  togglingClass: string;

  overlay: string;

  targetElement!: HTMLElement;

  overlayElement!: HTMLElement;

  constructor(targetElement: string, togglingClass: string, overlay: string) {
    this.element = document.createElement('button');
    this.element.classList.add('close-icon');
    this.element.setAttribute('type', 'button');
    this.element.innerHTML = `
    <span></span>
    <span></span>
    <span></span>`;

    this.togglingClass = togglingClass;
    this.overlay = overlay;
    this.target = targetElement;
  }

  init(): ICloseIcon {
    this.overlayElement = document.querySelector(this.overlay) as HTMLElement;
    this.targetElement = document.querySelector(this.target) as HTMLElement;

    this.element.addEventListener('click', () => {
      this.element.classList.toggle('open');
    });

    this.element.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.targetElement.classList.toggle(this.togglingClass);
    });

    this.overlayElement.addEventListener('click', (e: Event) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest(this.target) &&
        this.targetElement.classList.contains('show')
      ) {
        this.element.classList.toggle('open');
        this.targetElement.classList.toggle(this.togglingClass);
      }
    });
    return this;
  }
}
