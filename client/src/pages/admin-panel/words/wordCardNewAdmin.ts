import { SERVER_ADRESS } from '../../..';
import '../../../scss/word-card-new-admin.scss';

export class WordCardNewAdmin {
  element: HTMLDivElement;

  form: HTMLFormElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('col-sm-6', 'col-lg-4', 'col-xl-3', 'words__new-card');
    this.element.innerHTML = `
    <form class="words__new-card-form">
      <div class="modal-header">
        <h5 class="modal-title">Add new word</h5>
      </div>
      <div class="modal-body">
        <div class="words__new-card-add-word-image-wrapper">
          <img class="words__new-card-add-word-image-content" src="${SERVER_ADRESS}/images/cross.png" alt="add-card">
        </div>
        <div class="form-floating words__new-card-form-en">
          <input type="text" name="en" class="form-control" id="add-word-en" placeholder="Enter a english word" value="">
          <label for="add-word-en">Word</label>
        </div>
        <div class="form-floating words__new-card-form-ru">
          <input type="text" name="ru" class="form-control" id="add-word-ru" placeholder="Enter a translation" value="">
          <label for="add-word-ru">Translation</label>
        </div>
        <div class="words__new-card-form-img">
          <label for="add-word-img">Image:</label>
          <input type="file" name="img" id="add-word-img" >
        </div>
        <div class="words__new-card-form-audio">
          <label for="add-word-audio">Audio:</label>
          <input type="file" name="audio" id="add-word-audio">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger words__new-card-btn-cancel">Cancel</button>
        <button type="button" class="btn btn-outline-success words__new-card-btn-add">Add</button>
      </div>
    </form>`;
    this.form = this.element.querySelector('form') as HTMLFormElement;
  }
}
