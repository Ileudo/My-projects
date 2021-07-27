import '../../scss/modal.scss';

export abstract class Modal {
  element: HTMLElement;

  header: HTMLHeadingElement;

  img: HTMLImageElement;

  audio: HTMLAudioElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.classList.add('modal');
    this.element.innerHTML = `
    <div class="modal__window">
      <h3 class="modal__header"></h3>
      <img class="modal__img" src="" alt="" />
      <audio class="modal__audio" src=""></audio>
    </div>
    `;
    this.header = this.element.querySelector('.modal__header') as HTMLHeadingElement;
    this.img = this.element.querySelector('.modal__img') as HTMLImageElement;
    this.audio = this.element.querySelector('.modal__audio') as HTMLAudioElement;
  }
}
