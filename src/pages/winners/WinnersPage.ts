import { BaseComponent } from '../../core/BaseComponent';
import { IConfig } from '../../utils/interfaces/IConfig';
import { IWinnersPage } from '../../utils/interfaces/IWinnersPage';
import { IWinnersTable } from '../../utils/interfaces/IWinnersTable';
import { WinnersTable } from './WinnersTable';
import { store } from '../../store/store';
import { Pagination } from '../../core/Pagination';
import { IPagination } from '../../utils/interfaces/IPagination';
import { getWinners, updateStateWinners } from './winners-api';

export class WinnersPage extends BaseComponent implements IWinnersPage {
  table: IWinnersTable;

  pagination: IPagination;

  constructor(config: IConfig) {
    super(config);
    this.table = new WinnersTable({ tag: 'table', class: 'table', id: 'table' });
    this.pagination = new Pagination({ tag: 'nav', class: 'pagination' });
  }

  render(): HTMLElement {
    this.element.innerHTML = `
    <h2 class="winners__title">Winners(${store.winnersCount})</h2>
    <h3 class="winners__page">Page #${store.winnersPage}</h3>`;
    this.element.append(this.table.render());
    this.element.append(this.pagination.render());
    this.subscribe();
    this.updateWinnersPaginationState();
    return this.element;
  }

  subscribe(): void {
    this.setWinnersPagination();
    this.setSortOrder();
  }

  setWinnersPagination(): void {
    this.pagination.prev.addEventListener('click', async () => {
      store.winnersPage--;
      await updateStateWinners();
      this.render();
      this.updateWinnersPaginationState();
    });

    this.pagination.next.addEventListener('click', async () => {
      store.winnersPage++;
      await updateStateWinners();
      this.render();
      this.updateWinnersPaginationState();
    });
  }

  updateWinnersPaginationState(): void {
    store.pagesCountWinners = Math.ceil(<number>store.winnersCount / store.winnersPerPage);

    if (store.winnersPage === 1) {
      this.pagination.prev.disabled = true;
    } else {
      this.pagination.prev.disabled = false;
    }

    if (store.winnersPage === store.pagesCountWinners) {
      this.pagination.next.disabled = true;
    } else {
      this.pagination.next.disabled = false;
    }
  }

  async setSortOrder(): Promise<void> {
    const wins = this.element.querySelector('#table-wins') as HTMLTableHeaderCellElement;
    const time = this.element.querySelector('#table-time') as HTMLTableHeaderCellElement;

    wins.addEventListener('click', async () => {
      store.sortBy = 'wins';
      if (wins.classList.contains('asc')) {
        store.sortOrder = 'desc';
        wins.classList.remove('asc');
        wins.classList.add('desc');
      } else if (wins.classList.contains('desc')) {
        store.sortOrder = 'asc';
        wins.classList.remove('desc');
        wins.classList.add('asc');
      } else {
        store.sortOrder = 'desc';
        time.classList.remove('asc');
        time.classList.remove('desc');
        wins.classList.add('desc');
      }
      await getWinners(store.winnersPage, store.winnersPerPage, store.sortBy, store.sortOrder);
      await updateStateWinners();
      this.render();
    });
    time.addEventListener('click', async () => {
      store.sortBy = 'time';
      if (time.classList.contains('asc')) {
        store.sortOrder = 'desc';
        time.classList.remove('asc');
        time.classList.add('desc');
      } else if (time.classList.contains('desc')) {
        store.sortOrder = 'asc';
        time.classList.remove('desc');
        time.classList.add('asc');
      } else {
        store.sortOrder = 'desc';
        wins.classList.remove('asc');
        wins.classList.remove('desc');
        time.classList.add('desc');
      }
      await updateStateWinners();
      this.render();
    });
  }
}
