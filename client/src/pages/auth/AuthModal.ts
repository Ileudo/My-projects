import { SERVER_ADRESS } from '../..';
import '../../scss/auth-modal.scss';
import { IAuthModal } from '../../utils/interfaces';
import { store } from '../../utils/store';

export class AuthModal {
  element: HTMLDivElement;

  form: HTMLFormElement;

  closeIcon: HTMLButtonElement;

  btnLogin: HTMLButtonElement;

  btnCancel: HTMLButtonElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('modal', 'fade');
    this.element.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Authorization</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="text" name="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" id="password" placeholder="********">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btn-cancel">Cancel</button>
            <button type="submit" class="btn btn-success" id="btn-login">Login</button>
          </div>
        </form>
      </div>
    </div>`;

    this.form = this.element.querySelector('form') as HTMLFormElement;
    this.closeIcon = this.element.querySelector('.btn-close') as HTMLButtonElement;
    this.btnLogin = this.element.querySelector('#btn-login') as HTMLButtonElement;
    this.btnCancel = this.element.querySelector('#btn-cancel') as HTMLButtonElement;
  }

  init(): IAuthModal {
    this.listenModalClose();
    this.listenLogin();
    return this;
  }

  listenModalClose(): IAuthModal {
    this.closeIcon.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      this.element.classList.toggle('show');
    });
    this.element.addEventListener('click', function (event: Event) {
      if (event.target instanceof HTMLElement) {
        if (event.target === this) this.classList.toggle('show');
      }
    });
    return this;
  }

  listenLogin(): IAuthModal {
    this.form.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      const username = this.form.email.value;
      const password = this.form.password.value;
      try {
        const responce = await fetch(`${SERVER_ADRESS}/login`, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await responce.json();
        this.element.classList.remove('show');
        console.log(data);
        if (data.user) {
          document.body.classList.add('admin');
          window.location.hash = '#admin-panel-categories';
        }
      } catch (error) {
        console.log(new Error('Can not connect to DB. Please, login again later'), error);
      }
    });
    return this;
  }
}
