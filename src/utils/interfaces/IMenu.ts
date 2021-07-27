import { IControlsBlock } from './IControlsBlock';
import { ICreateBlock } from './ICreateBlock';
import { IUpdateBlock } from './IUpdateBlock';

export interface IMenu {
  createBlock: ICreateBlock;

  updateBlock: IUpdateBlock;

  controlsBlock: IControlsBlock;

  render(): HTMLElement;
}
