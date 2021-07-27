import { ICarInfo } from './ICarInfo';
import { IWinnerFullStats } from './IWinnerFullStats';

export interface IStore {
  carsPage: number;
  carsCount: number | null;
  cars: ICarInfo[] | null;
  pagesCountGarage: number | null;
  carsPerPage: number;
  winnersPage: number;
  winners: IWinnerFullStats[] | null;
  winnersCount: number | null;
  pagesCountWinners: number | null;
  winnersPerPage: number;
  animation: {
    [key: number]: number;
  };
  sortBy: string;
  sortOrder: string;
}
