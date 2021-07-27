import { BaseComponent } from '../../core/BaseComponent';
import { IPagination } from './IPagination';
import { IWinnersTable } from './IWinnersTable';

export interface IWinnersPage extends BaseComponent {
  table: IWinnersTable;
  pagination: IPagination;
  render(): HTMLElement;
  subscribe(): void;
  setWinnersPagination(): void;
  updateWinnersPaginationState(): void;
}
