import { BaseComponent } from '../../../core/BaseComponent';
import { IUpdateBlock } from '../../../utils/interfaces/IUpdateBlock';

export class UpdateBlock extends BaseComponent implements IUpdateBlock {
  render(): HTMLElement {
    this.element.innerHTML = `
    <input type="text" class="input input-small create-block__input-text" id="update-car-name" disabled />
    <input type="color" class="create-block__input-color" value="#212529" id="update-car-color" disabled />
    <button class="btn btn-lightyellow btn-sm create-block__btn"
    id="update-car-btn" type="submit" disabled>Update Car</button>
      `;
    return this.element;
  }
}
