import { IModal } from './IModal';
import { IPagination } from './IPagination';

export interface IGarage {
  pagination: IPagination;
  modal: IModal;
  render(): HTMLElement;
  updateGaragePaginationState(): void;
  setGaragePagination(): void;
}
