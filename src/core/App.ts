import { updateStateGarage } from '../pages/garage/garage-api';
import { GaragePage } from '../pages/garage/GaragePage';
import { updateStateWinners } from '../pages/winners/winners-api';
import { WinnersPage } from '../pages/winners/WinnersPage';
import { IGaragePage } from '../utils/interfaces/IGaragePage';
import { IPageSwitcher } from '../utils/interfaces/IPageSwitcher';
import { IWinnersPage } from '../utils/interfaces/IWinnersPage';
import { refreshStore } from '../utils/utils';
import { PageSwitcher } from './PageSwitcher';

export class App {
  container: HTMLElement;

  pageSwitcher: IPageSwitcher;

  garagePage: IGaragePage;

  winnersPage: IWinnersPage;

  constructor() {
    this.container = document.body;
    this.pageSwitcher = new PageSwitcher({ tag: 'header', class: 'page-switcher', id: 'page-switcher' });
    this.garagePage = new GaragePage({ tag: 'div', class: 'garage-page', id: 'garage-page' });
    this.garagePage.subscribe();
    this.winnersPage = new WinnersPage({ tag: 'div', class: 'winners-page', id: 'winners-page' });
    this.winnersPage.element.hidden = true;
  }

  async run(): Promise<void> {
    await refreshStore();
    this.container.append(this.pageSwitcher.render());
    this.container.append(this.garagePage.render());
    this.container.append(this.winnersPage.render());
    this.switchPageListener();
  }

  switchPageListener(): void {
    const toWinners = document.getElementById('to-winners') as HTMLButtonElement;
    const toGarage = document.getElementById('to-garage') as HTMLButtonElement;
    const garagePage = document.getElementById('garage-page') as HTMLElement;
    const winnersPage = document.getElementById('winners-page') as HTMLElement;

    toWinners.addEventListener('click', async () => {
      winnersPage.hidden = false;
      garagePage.hidden = true;
      await updateStateWinners();
      this.winnersPage.render();
    });
    toGarage.addEventListener('click', async () => {
      winnersPage.hidden = true;
      garagePage.hidden = false;
      await updateStateGarage();
    });
  }
}
