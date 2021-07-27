import { IStore } from '../utils/interfaces/IStore';

export const store: IStore = {
  carsPage: 1,
  cars: null,
  carsCount: null,
  pagesCountGarage: null,
  carsPerPage: 7,
  winnersPage: 1,
  winners: null,
  winnersCount: null,
  pagesCountWinners: null,
  winnersPerPage: 10,
  animation: {},
  sortBy: 'time',
  sortOrder: 'desc',
};
