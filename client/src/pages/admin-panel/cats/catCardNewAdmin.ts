import { SERVER_ADRESS } from '../../..';
import '../../../scss/catCardNewAdmin.scss';

export class catCardNewAdmin {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('col-sm-6', 'col-lg-4', 'col-xl-3', 'admin-panel__card-add-category');
    this.element.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">Create New Category</h5>
      </div>
      <div class="modal-body">
        <div class="admin-panel__card-add-category-image-wrapper">
          <img class="admin-panel__card-add-category-image-content" src="${SERVER_ADRESS}/images/cross.png" alt="add-card">
        </div>
        <form class="form-floating admin-panel__card-add-category-form">
          <input type="text" class="form-control" id="add-category-input" placeholder="Enter a category name" value="">
          <label for="add-category-input">Category Name</label>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger admin-panel__card-add-category-cancel">Cancel</button>
        <button type="button" class="btn btn-outline-success admin-panel__card-add-category-create">Create</button>
      </div>`;
  }
}
