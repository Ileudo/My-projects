import { Modal } from '../../core/templates/Modal';
import imgModalWin from '../../assets/images/Modal/modal-win.png';
import audioModalWin from '../../assets/audio/finish-game-success.mp3';

export class ModalWin extends Modal {
  constructor() {
    super();
    this.header.textContent = 'Win!';
    this.img.src = imgModalWin;
    this.audio.src = audioModalWin;
  }
}
