import {
  IAdminPanelCategories,
  IAdminPanelWords,
  IAuthModal,
  ICardsField,
  ICatField,
  IHeader,
} from '../utils/interfaces';
import { CardsField } from '../pages/category/CardsField';
import { CatField } from '../pages/categories/CatField';
import { Header } from './header/Header';
import { store } from '../utils/store';
import { AdminPanelCategories } from '../pages/admin-panel/cats/adminPanelCategories';
import { AdminPanelWords } from '../pages/admin-panel/words/adminPanelWords';
import { DEFAULT_CATEGORY, SERVER_ADRESS } from '..';

export class App {
  container: HTMLBodyElement;

  header: IHeader;

  catField: ICatField;

  cardsField: ICardsField;

  page: HTMLDivElement;

  AdminPanelCategories: IAdminPanelCategories;

  AdminPanelWords: IAdminPanelWords | null;

  constructor() {
    this.container = document.body as HTMLBodyElement;
    this.header = new Header();
    this.container.prepend(this.header.element);
    this.page = document.createElement('div');
    this.page.id = 'page';
    this.container.append(this.page);
    this.catField = new CatField();
    this.cardsField = new CardsField();
    this.AdminPanelCategories = new AdminPanelCategories();
    this.AdminPanelWords = null;
  }

  init(): void {
    this.header.init();
    const hash = window.location.hash;
    this.renderNewPage(hash);
    this.listenHashChange();
  }

  async renderNewPage(hash: string): Promise<void> {
    this.page.innerHTML = '';
    this.header.offcanvas.element.classList.remove('show');
    this.header.closeIcon.element.classList.remove('open');
    await checkAuthorization();
    this.setActiveOffcanvasLink(hash);
    if (hash === '' || hash === '#') {
      this.catField.clear();
      this.page.append(this.catField.element);
      this.catField.init();
    } else if (hash === '#cards') {
      //  Routing Kostyli
      this.cardsField.clear();
      this.page.append(this.cardsField.element);
      this.cardsField.init();
    } else if (hash === '#card') {
      //  Routing Kostyli
      this.cardsField.clear();
      this.page.append(this.cardsField.element);
      this.cardsField.init();
    } else if (hash === '#admin-panel-categories') {
      this.page.append(this.AdminPanelCategories.element);
      this.AdminPanelCategories.init();
    } else if (hash === '#admin-panel-words') {
      if (!localStorage.getItem('admin-category')) localStorage.setItem('admin-category', DEFAULT_CATEGORY);
      const adminCategory = localStorage.getItem('admin-category') as string;
      this.AdminPanelWords = new AdminPanelWords(adminCategory);
      this.page.append(this.AdminPanelWords.element);
      this.AdminPanelWords.init();
    }
  }

  setActiveOffcanvasLink(hash: string) {
    const links = Array.from(this.header.offcanvas.list.querySelectorAll('.nav-link')) as HTMLAnchorElement[];
    links.find((link) => link.parentElement?.classList.contains('current'))?.parentElement?.classList.remove('current');
    let activeLinks = links.filter((link) => link.dataset.route === hash);
    try {
      const tmp = activeLinks.find((link) => link.dataset.cat === localStorage.getItem('category'));
      if (tmp !== undefined) activeLinks = [tmp];
      activeLinks[0].parentElement?.classList.add('current');
    } catch (e) {}
  }

  listenHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      this.renderNewPage(hash);
    });
  }
}

async function checkAuthorization() {
  const responce = await fetch(`${SERVER_ADRESS}/login`, {
    credentials: 'include',
  });
  if (responce.status === 200) {
    document.body.classList.add('admin');
  } else {
    document.body.classList.remove('admin');
  }
}
