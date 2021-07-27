import { BaseComponent } from '../../core/BaseComponent';
import { store } from '../../store/store';
import { IWinner } from '../../utils/interfaces/IWinner';
import { IWinnerFullStats } from '../../utils/interfaces/IWinnerFullStats';
import { Car } from '../garage/garage/Car';

export class Winner extends BaseComponent implements IWinner {
  render(winner: IWinnerFullStats, index: number): HTMLElement {
    this.element.innerHTML = `
      <td>${(store.winnersPage - 1) * store.winnersPerPage + index + 1}</td>
      <td>${
  new Car({ tag: 'div', class: 'car-icon', id: `car-icon-${index + 1}` }).render(winner.car.color).outerHTML
}</td>
      <td>${winner.car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>`;
    return this.element;
  }
}
