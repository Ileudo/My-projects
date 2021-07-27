import '../../scss/offcanvas.scss';
import data from '../../data.json';
import { IAuthModal, ICategory, IOffcanvas } from '../../utils/interfaces';
import { AuthModal } from '../../pages/auth/AuthModal';
import { store } from '../../utils/store';
import { findAllCategories } from '../../pages/admin-panel/admin-panel-api';
import { SERVER_ADRESS } from '../..';

export class Offcanvas {
  element: HTMLElement;

  list: HTMLUListElement;

  listCategories: HTMLUListElement;

  listAdminPanel: HTMLUListElement;

  btnDropdownCategories: HTMLButtonElement;

  btnDropdownAdminPanel: HTMLButtonElement;

  authModal: IAuthModal;

  btnLogin: HTMLAnchorElement;

  btnLogout: HTMLAnchorElement;

  btnAdminPanel: HTMLAnchorElement;

  constructor() {
    this.element = document.createElement('aside');
    this.element.classList.add('offcanvas', 'offcanvas-start');
    this.element.id = 'offcanvas';
    this.element.innerHTML = `
    <div class="offcanvas-body mt-5">
      <ul class="offcanvas__list navbar-nav"></ul>
    </div>
    `;

    this.list = this.element.querySelector('.offcanvas__list') as HTMLUListElement;

    this.list.innerHTML = `
    <li class="nav-item offcanvas__nav-item--btn-login">
      <a class="btn nav-link offcanvas__btn-login">Login as admin</a>
      <div><small>username: admin; password: 0000</small></div>
    </li>
    <li class="nav-item"><a class="btn nav-link offcanvas__btn-logout">Log out</a></li>
    <li class="dropdown nav-item dropdown__admin-panel">
      <button class="btn dropdown-toggle nav-link" type="button">Admin Panel</button>
      <ul class="dropdown-menu">
        <li><a href="#admin-panel-categories" class="btn nav-link offcanvas__admin-panel-categories" data-route="#admin-panel-categories">Categories</a></li>
        <li><a href="#admin-panel-words" class="btn nav-link offcanvas__admin-panel-words" data-route="#admin-panel-words">Words</a></li>
      </ul>
    </li>
    <li class="nav-item"><a href="#" class="nav-link btn" data-route="">Main Page</a></li>
    <li class="dropdown nav-item dropdown__categories">
      <button class="btn dropdown-toggle nav-link" type="button">Choose Category</button>
      <ul class="dropdown-menu"></ul>
    </li>
    `;

    this.listCategories = this.element.querySelector('.dropdown__categories .dropdown-menu') as HTMLUListElement;
    this.btnDropdownCategories = this.element.querySelector(
      '.dropdown__categories .dropdown-toggle'
    ) as HTMLButtonElement;

    this.listAdminPanel = this.element.querySelector('.dropdown__admin-panel .dropdown-menu') as HTMLUListElement;
    this.btnDropdownAdminPanel = this.element.querySelector(
      '.dropdown__admin-panel .dropdown-toggle'
    ) as HTMLButtonElement;

    this.btnLogin = this.element.querySelector('.offcanvas__btn-login') as HTMLAnchorElement;
    this.btnLogout = this.element.querySelector('.offcanvas__btn-logout') as HTMLAnchorElement;
    this.btnAdminPanel = this.element.querySelector('.offcanvas__admin-panel') as HTMLAnchorElement;
    this.authModal = new AuthModal();
  }

  async init(): Promise<IOffcanvas> {
    await this.renderMenuList();
    this.authModal.init();
    this.listenDropdownCall();
    this.listenAuthModalCall();
    this.listenLogOut();
    this.saveCategory();
    return this;
  }

  async renderMenuList(): Promise<IOffcanvas> {
    const categories = (await findAllCategories()) as ICategory[];
    const categoryNames = categories.map((category: ICategory) => category.name);
    categoryNames.forEach((name: string) => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="nav-link btn" data-route="#cards" data-cat="${name}">${name}</a>`;
      this.listCategories.append(li);
    });
    return this;
  }

  saveCategory(): IOffcanvas {
    const catLinks = this.element.querySelectorAll('[data-cat]') as NodeListOf<HTMLAnchorElement>;
    catLinks.forEach((link) => {
      link.addEventListener('click', () => {
        localStorage.setItem('category', link.dataset.cat as string);
        if (window.location.hash === '#cards') {
          window.location.hash = '#card';
        } else {
          window.location.hash = '#cards';
        } // Routing Kostyli
      });
    });
    return this;
  }

  listenDropdownCall(): void {
    this.btnDropdownCategories.onclick = () => {
      this.listCategories.classList.toggle('show');
    };
    this.btnDropdownAdminPanel.onclick = () => {
      this.listAdminPanel.classList.toggle('show');
    };
  }

  listenAuthModalCall() {
    this.btnLogin.onclick = () => {
      this.authModal.element.classList.toggle('show');
      this.element.append(this.authModal.element);
    };
  }

  listenLogOut() {
    this.btnLogout.onclick = async () => {
      const responce = await fetch(`${SERVER_ADRESS}/logout`, {
        credentials: 'include',
      });
      document.body.classList.remove('admin');
      if (responce.status === 200) window.location.hash = '';
    };
  }
}
