import '../../../scss/catCardAdmin.scss';

export class catCardAdmin {
  element: HTMLDivElement;

  constructor(name: string, length: number) {
    this.element = document.createElement('div');
    this.element.classList.add('col-sm-6', 'col-lg-4', 'col-xl-3', 'admin-panel__card');
    this.element.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title admin-panel__card-title">${name}</h5>
    <button type="button" class="btn-close admin-panel__card-btn-close"></button>
  </div>
  <div class="modal-body">
    <p class="admin-panel__modal-body-words">WORDS: <b>${length}</b></p>
    <form class="form-floating admin-panel__card-form">
      <input type="text" class="form-control" id="input-${name}" placeholder="name@example.com" value="${name}">
      <label for="input-${name}">Category Name</label>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-success admin-panel__card-update">Update</button>
    <a href="#admin-panel-words" class="btn btn-outline-success admin-panel__card-add-word">Add Word</a>
    <button type="button" class="btn btn-outline-danger admin-panel__card-cancel">Cancel</button>
    <button type="button" class="btn btn-outline-success admin-panel__card-update-submit">Update</button>
  </div>`;
  }
}
