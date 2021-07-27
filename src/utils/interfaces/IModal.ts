import { IBaseComponent } from './IBaseComponent';

export interface IModal extends IBaseComponent {
  render(name: string, time: number): HTMLElement;
}
