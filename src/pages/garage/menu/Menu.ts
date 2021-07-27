import { BaseComponent } from '../../../core/BaseComponent';
import { IConfig } from '../../../utils/interfaces/IConfig';
import { IMenu } from '../../../utils/interfaces/IMenu';
import { ControlsBlock } from './ControlsBlock';
import { CreateBlock } from './CreateBlock';
import { UpdateBlock } from './UpdateBlock';

export class Menu extends BaseComponent implements IMenu {
  createBlock: CreateBlock;

  updateBlock: UpdateBlock;

  controlsBlock: ControlsBlock;

  constructor(config: IConfig) {
    super(config);
    this.createBlock = new CreateBlock({ tag: 'form', class: 'create-block', id: 'create-car' });
    this.updateBlock = new UpdateBlock({ tag: 'form', class: 'update-block', id: 'update-car' });
    this.controlsBlock = new ControlsBlock({ tag: 'div', class: 'controls-block', id: 'race-control' });
  }

  render(): HTMLElement {
    this.element.append(this.createBlock.render());
    this.element.append(this.updateBlock.render());
    this.element.append(this.controlsBlock.render());
    return this.element;
  }
}
