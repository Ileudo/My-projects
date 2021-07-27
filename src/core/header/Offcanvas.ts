import '../../scss/offcanvas.scss';
import data from '../../data.json';
import { ICategory, IOffcanvas } from '../../utils/interfaces';

export class Offcanvas {
  element: HTMLElement;

  list: HTMLUListElement;

  catLinks: NodeListOf<HTMLAnchorElement>;

  constructor() {
    this.element = document.createElement('aside');
    this.element.classList.add('offcanvas', 'offcanvas-start');
    this.element.id = 'offcanvas';

    this.list = document.createElement('ul');
    this.list.classList.add('offcanvas__list');
    this.element.append(this.list);

    this.list.innerHTML = `
    <li><a href="#" class="offcanvas__link" data-route="">Main Page</a></li>`;

    const categories: string[] = data.categories.map((category: ICategory) => category.name);
    categories.forEach((name) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#cards" class="offcanvas__link" data-route="#cards" data-cat="${name}">${name}</a>`;
      this.list.append(li);
    });

    this.catLinks = this.element.querySelectorAll('[data-cat]');
  }

  init(): IOffcanvas {
    this.saveCategory();
    return this;
  }

  saveCategory(): IOffcanvas {
    this.catLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const randomHashToInitHashChange = '#card'; // КОСТЫЛИ
        window.location.hash = randomHashToInitHashChange;
        window.location.hash = '#cards';
        localStorage.setItem('category', link.dataset.cat as string);
      });
    });
    return this;
  }
}
