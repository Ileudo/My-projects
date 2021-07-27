import { BaseComponent } from '../../../core/BaseComponent';
import { store } from '../../../store/store';
import { IConfig } from '../../../utils/interfaces/IConfig';
import { IGarage } from '../../../utils/interfaces/IGarage';
import { IModal } from '../../../utils/interfaces/IModal';
import { IPagination } from '../../../utils/interfaces/IPagination';
import { Modal } from './Modal';
import { Pagination } from '../../../core/Pagination';
import { Track } from './Track';
import { updateStateGarage } from '../garage-api';

export class Garage extends BaseComponent implements IGarage {
  pagination: IPagination;

  modal: IModal;

  constructor(config: IConfig) {
    super(config);
    this.pagination = new Pagination({ tag: 'nav', class: 'pagination' });
    this.modal = new Modal({ tag: 'section', class: 'modal' });
  }

  render(): HTMLElement {
    this.element.innerHTML = `
    <h2 class="garage__title">Garage(${store.carsCount})</h2>
    <div class="garage__page-number">Page #${store.carsPage}</div>
    <div class="garage__track track">
      <ul class="track__list">
      </ul>
      </div>
    `;

    const trackList = this.element.querySelector('.track__list') as HTMLUListElement;
    if (store.cars) {
      store.cars.forEach((car) => {
        const track = new Track({ tag: 'li', class: 'track__item', id: `track-${car.id}` }).render(car);
        trackList.append(track);
      });
    }

    this.element.append(this.pagination.render());
    this.element.append(this.modal.element);

    this.setGaragePagination();
    this.updateGaragePaginationState();
    return this.element;
  }

  setGaragePagination(): void {
    this.pagination.prev.addEventListener('click', async () => {
      store.carsPage--;
      await updateStateGarage();
      this.render();
      this.updateGaragePaginationState();
    });

    this.pagination.next.addEventListener('click', async () => {
      store.carsPage++;
      await updateStateGarage();
      this.render();
      this.updateGaragePaginationState();
    });
  }

  updateGaragePaginationState(): void {
    store.pagesCountGarage = Math.ceil(<number>store.carsCount / store.carsPerPage);

    if (store.carsPage === 1) {
      this.pagination.prev.disabled = true;
    } else {
      this.pagination.prev.disabled = false;
    }

    if (store.carsPage === store.pagesCountGarage) {
      this.pagination.next.disabled = true;
    } else {
      this.pagination.next.disabled = false;
    }
  }
}
