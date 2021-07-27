import '../../scss/modal1.scss';

export abstract class Modal {
  element: HTMLElement;

  header: HTMLHeadingElement;

  img: HTMLImageElement;

  audio: HTMLAudioElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.classList.add('modal1');
    this.element.innerHTML = `
    <div class="modal1__window">
      <h3 class="modal1__header"></h3>
      <img class="modal1__img" src="" alt="" />
      <audio class="modal1__audio" src=""></audio>
    </div>
    `;
    this.header = this.element.querySelector('.modal1__header') as HTMLHeadingElement;
    this.img = this.element.querySelector('.modal1__img') as HTMLImageElement;
    this.audio = this.element.querySelector('.modal1__audio') as HTMLAudioElement;
  }
}
