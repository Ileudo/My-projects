import { BaseComponent } from '../../../core/BaseComponent';
import { IControlsBlock } from '../../../utils/interfaces/IControlsBlock';

export class ControlsBlock extends BaseComponent implements IControlsBlock {
  render(): HTMLElement {
    this.element.innerHTML = `
    <button class="btn btn-lightgreen btn-sm controls-block__btn-race" id="race">Race</button>
    <button class="btn btn-lightred btn-sm controls-block__btn-reset" id="reset" disabled>Reset</button>
    <button class="btn btn-lightyellow btn-sm controls-block__btn-generate" id="generate">Generate Cars</button>
    `;
    return this.element;
  }
}
