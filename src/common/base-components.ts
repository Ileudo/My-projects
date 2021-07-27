import { Config } from '../utils/interfaces';

export class BaseComponent {
  element: HTMLElement;

  constructor(config: Config) {
    this.element = document.createElement(config.tag);
    this.element.classList.add(...config.classes);
    this.element.id = config.id;
  }
}
