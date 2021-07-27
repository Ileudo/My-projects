import { Modal } from '../../core/templates/Modal';
import imgModalLoose from '../../assets/images/Modal/modal-loose.png';
import audioModalLoose from '../../assets/audio/finish-game-failure.mp3';

export class ModalLoose extends Modal {
  constructor(num: number) {
    super();
    if (num === 1) {
      this.header.textContent = `${num} error`;
    } else {
      this.header.textContent = `${num} errors`;
    }
    this.img.src = imgModalLoose;
    this.audio.src = audioModalLoose;
  }
}
