import { IWinnerFullStats } from './IWinnerFullStats';

export interface IWinner {
  render(winner: IWinnerFullStats, index: number): HTMLElement;
}
