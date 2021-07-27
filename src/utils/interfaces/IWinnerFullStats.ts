import { ICarInfo } from './ICarInfo';

export interface IWinnerFullStats {
  id: number;
  wins: number;
  time: number;
  car: ICarInfo;
}
