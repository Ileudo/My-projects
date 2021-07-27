import { ICardsField, ICatField, IHeader } from '../utils/interfaces';
import { CardsField } from '../pages/category/CardsField';
import { CatField } from '../pages/categories/CatField';
import { Header } from './header/Header';

export class App {
  container: HTMLBodyElement;

  header: IHeader;

  catField: ICatField;

  cardsField: ICardsField;

  page: HTMLDivElement;

  constructor() {
    this.container = document.body as HTMLBodyElement;
    this.header = new Header();
    this.container.prepend(this.header.element);
    this.page = document.createElement('div');
    this.page.id = 'page';
    this.container.append(this.page);
    this.catField = new CatField();
    this.cardsField = new CardsField();
  }

  init(): void {
    this.header.init();
    const hash = window.location.hash;
    this.renderNewPage(hash);
    this.listenHashChange();
  }

  renderNewPage(hash: string): void {
    this.page.innerHTML = '';
    this.setActiveOffcanvasLink(hash);
    if (hash === '') {
      this.catField.clear();
      this.page.append(this.catField.element);
      this.catField.init();
    } else if (hash === '#cards') {
      this.cardsField.clear();
      this.page.append(this.cardsField.element);
      this.cardsField.init();
    }
  }

  setActiveOffcanvasLink(hash: string) {
    const links = Array.from(this.header.offcanvas.list.querySelectorAll('.offcanvas__link')) as HTMLAnchorElement[];
    links.find((link) => link.parentElement?.classList.contains('current'))?.parentElement?.classList.remove('current');
    let activeLinks = links.filter((link) => link.dataset.route === hash);
    try {
      const tmp = activeLinks.find((link) => link.dataset.cat === localStorage.getItem('category'));
      if (tmp !== undefined) activeLinks = [tmp];
    } catch (e) {}
    activeLinks[0].parentElement?.classList.add('current');
  }

  listenHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      this.renderNewPage(hash);
    });
  }
}
