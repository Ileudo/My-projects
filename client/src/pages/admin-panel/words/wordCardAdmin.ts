import { SERVER_ADRESS } from '../../..';
import '../../../scss/word-card-admin.scss';

export class WordCardAdmin {
  element: HTMLDivElement;

  en: string;

  ru: string;

  img: string;

  audio: string;

  categoryName: string;

  constructor(en: string, ru: string, img: string, audio: string) {
    this.en = en;
    this.ru = ru;
    this.img = img;
    this.audio = audio;
    this.categoryName = localStorage.getItem('admin-category') as string;
    this.element = document.createElement('div');
    this.element.classList.add('col-sm-6', 'col-lg-4', 'col-xl-3', 'words__card');
    this.element.innerHTML = `
    <div class="modal-header">
      <button type="button" class="btn-close words__card-btn-close"></button>
    </div>
    <div class="modal-body">
      <form class="words__new-card-form">
        <div class="form-floating words__card-form-en--edit">
          <input type="text" class="form-control" id="add-word-en-${en}" placeholder="Enter a english word" value="${en}">
          <label for="add-word-en-${en}">Word</label>
        </div>
        <div class="form-floating words__card-form-ru--edit">
          <input type="text" class="form-control" id="add-word-ru-${en}" placeholder="Enter a translation" value="${ru}">
          <label for="add-word-ru-${en}">Translation</label>
        </div>
        <div class="words__card-form-audio--edit">
          <label for="add-word-audio-${en}">Audio:</label>
          <input type="file" id="add-word-audio-${en}">
        </div>
        <div class="words__card-form-img--edit">
          <label for="add-word-img-${en}">Image:</label>
          <input type="file" id="add-word-img-${en}">
        </div>
      </form>
      <div class="words__card-form-en">
        <span><b>en:</b></span>
        <span class="words__card-form-en-word">${en}</span>
      </div>
      <div class="words__card-form-ru">
        <span><b>ru:</b></span>
        <span>${ru}</span>
      </div>
      <div class="words__card-form-audio">
        <span><b>audio:</b></span>
        <span>${audio}</span>
      </div>
      <div class="words__card-form-img">
        <span><b>image:</b></span>
        <div class="words__card-form-img-wrapper"><img src="${SERVER_ADRESS}/images/${this.categoryName}/${img}" alt="${en}"></div>
      </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-success words__card-btn-change">Change</button>
      <button type="button" class="btn btn-outline-danger words__card-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-outline-success words__card-btn-add">Add</button>
    </div>`;
  }
}
