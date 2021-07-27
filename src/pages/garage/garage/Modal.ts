import { BaseComponent } from '../../../core/BaseComponent';
import { IModal } from '../../../utils/interfaces/IModal';

export class Modal extends BaseComponent implements IModal {
  render(name: string, time: number): HTMLElement {
    this.element.innerHTML = `
    <p class="modal-text">${name} went first [${time}]</p>
    `;
    this.closeModalListener();
    return this.element;
  }

  closeModalListener(): void {
    this.element.addEventListener('click', () => {
      this.element.classList.remove('show');
    });
  }
}
