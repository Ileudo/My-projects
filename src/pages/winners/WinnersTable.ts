import { BaseComponent } from '../../core/BaseComponent';
import { IWinnersTable } from '../../utils/interfaces/IWinnersTable';
import { Winner } from './Winner';
import { store } from '../../store/store';
import { IWinnerFullStats } from '../../utils/interfaces/IWinnerFullStats';

export class WinnersTable extends BaseComponent implements IWinnersTable {
  render(): HTMLElement {
    this.element.innerHTML = `
      <thead>
        <th>№</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table-button ${store.sortBy === 'wins' ? store.sortOrder : ''}" id="table-wins">Wins</th>
        <th class="table-button ${
  store.sortBy === 'time' ? store.sortOrder : ''
}" id="table-time">Best time (seconds)</th>
      </thead>
      <tbody>
      </tbody>`;
    this.renderWinnersList();
    return this.element;
  }

  renderWinnersList(): void {
    const tableBody = this.element.querySelector('tbody') as HTMLTableSectionElement;
    (store.winners as IWinnerFullStats[]).forEach((winner: IWinnerFullStats, index: number) => {
      const newWinner = new Winner({ tag: 'tr' }).render(winner, index);
      tableBody.append(newWinner);
    });
  }
}
