import { BaseComponent } from '../../../core/BaseComponent';
import { ICreateBlock } from '../../../utils/interfaces/ICreateBlock';

export class CreateBlock extends BaseComponent implements ICreateBlock {
  render(): HTMLElement {
    this.element.innerHTML = `
    <input type="text" class="input input-small create-block__input-text" id="create-car-name"/>
    <input type="color" class="create-block__input-color" id="create-car-color" value="#ffda6a"/>
    <button class="btn btn-lightyellow btn-sm create-block__btn" id="create-car-btn" type="submit">Create Car</button>
      `;
    return this.element;
  }
}
