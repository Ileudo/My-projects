import './modal-victory.scss';
import { Config } from '../../utils/interfaces';
import { BaseComponent } from '../../common/base-components';
import { score } from '../score/Score';
import { navigate } from '../../utils/utils';

export class ModalVictory extends BaseComponent {
  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="modal__content">
      <p class="modal__text">
      Congratulations! You successfully found all matches on
      <span class="modal__minutes" id="modal__minutes">0</span>.
      <span class="modal__seconds" id="modal__seconds">0</span> minutes.
      </p>
      <button class="btn modal__btn">OK</button>
    </div>`;
  }

  openModal(): void {
    this.element.classList.add('opened');
    document.body.classList.remove('notScrollable');
    this.closeModalListener();
  }

  closeModalListener(): void {
    const okButton = this.element.querySelector('.modal__btn') as HTMLElement;
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element || event.target === okButton) {
        this.closeModal();
        ModalVictory.goToScorePage();
      }
    });
  }

  closeModal(): void {
    this.element.classList.remove('opened');
    document.body.classList.add('notScrollable');
  }

  static goToScorePage(): void {
    navigate('score');
    // header.showStartGameButton();
    score.getDataFromDB();
  }
}

export const modalVictory = new ModalVictory({ tag: 'section', classes: ['modal'], id: '' });
