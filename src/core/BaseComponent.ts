import { IBaseComponent } from '../utils/interfaces/IBaseComponent';
import { IConfig } from '../utils/interfaces/IConfig';

export class BaseComponent implements IBaseComponent {
  element: HTMLElement;

  constructor(config: IConfig) {
    this.element = document.createElement(config.tag);
    if (config.class) this.element.classList.add(config.class);
    if (config.id) this.element.id = config.id;
  }
}
