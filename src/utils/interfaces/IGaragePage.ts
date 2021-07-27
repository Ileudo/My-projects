import { ICarInfo } from './ICarInfo';
import { IGarage } from './IGarage';
import { IMenu } from './IMenu';
import { IWinnerResult } from './IWinnerResult';

export interface IGaragePage {
  menu: IMenu;
  garage: IGarage;
  render(): HTMLElement;
  subscribe(): void;
  raceAll(promises: Promise<IWinnerResult>[], ids: number[]): Promise<{ car: ICarInfo; time: number }>;
}
