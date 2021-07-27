import { IMenu } from './IMenu';

export interface IApp {
  container: HTMLElement;
  menu: IMenu;

  run(): void;
}
