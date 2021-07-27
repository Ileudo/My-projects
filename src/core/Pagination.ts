import { BaseComponent } from './BaseComponent';
import { IPagination } from '../utils/interfaces/IPagination';
import { IConfig } from '../utils/interfaces/IConfig';

export class Pagination extends BaseComponent implements IPagination {
  prev!: HTMLButtonElement;

  next!: HTMLButtonElement;

  id = 0;

  constructor(config: IConfig) {
    super(config);
    this.id++;
  }

  render(): HTMLElement {
    this.element.innerHTML = `
    <ul class="pagination-list">
      <li class="page-item"><button class="btn btn-sm btn-lightyellow" id="prev-${this.id}">Prev</button></li>
      <li class="page-item"><button class="btn btn-sm btn-lightyellow" id="next-${this.id}">Next</button></li>
    </ul>
    `;
    this.prev = this.element.querySelector(`#prev-${this.id}`) as HTMLButtonElement;
    this.next = this.element.querySelector(`#next-${this.id}`) as HTMLButtonElement;
    return this.element;
  }
}
