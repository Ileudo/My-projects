import { BaseComponent } from './base-components';
import { game } from '../pages/game/Game';
import { header } from './header/Header';
import { home } from '../pages/home/Home';
import { score } from '../pages/score/Score';
import { settings } from '../pages/settings/Settings';

export class App {
  container: HTMLElement;

  defaultPageId: string;

  constructor() {
    this.container = document.body;
    this.defaultPageId = 'current-page';
  }

  run(): void {
    this.container.appendChild(header.element);
    this.enableRouteChange();
  }

  static removeCurrentPage(): void {
    const currentPage = document.getElementById('current-page');
    if (currentPage) {
      currentPage.remove();
    }
  }

  createNewPage(hash: string): void {
    let page: BaseComponent | null = null;

    if (hash === 'home' || hash === '') page = home;
    if (hash === 'game') {
      page = game;
      game.render();
    }
    if (hash === 'settings') page = settings;
    if (hash === 'score') page = score;

    this.renderNewPage(page);
  }

  renderNewPage(page: BaseComponent | null): void {
    if (page) {
      this.container.append(page.element);
      page.element.id = this.defaultPageId;
    }
  }

  enableRouteChange(): void {
    let hash = window.location.hash.slice(1);
    this.createNewPage(hash);
    window.addEventListener('hashchange', () => {
      hash = window.location.hash.slice(1);
      App.removeCurrentPage();
      this.createNewPage(hash);
    });
  }
}

export const app = new App();
