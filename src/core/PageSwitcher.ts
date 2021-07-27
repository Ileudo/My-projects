import { IPageSwitcher } from '../utils/interfaces/IPageSwitcher';
import { BaseComponent } from './BaseComponent';

export class PageSwitcher extends BaseComponent implements IPageSwitcher {
  render(): HTMLElement {
    this.element.innerHTML = `
    <button class="btn btn-outline-yellow btn-sm page-switcher__btn-to-garage" id="to-garage">To Garage</button>
    <button class="btn btn-outline-yellow btn-sm page-switcher__btn-to-winners" id="to-winners">To Winners</button>`;
    return this.element;
  }
}
