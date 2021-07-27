import './header.scss';
import { avatarTemplate } from '../../assets/images/register/avatar-template.svg';
import { BaseComponent } from '../base-components';
import { Config } from '../../utils/interfaces';
import { registration } from '../../pages/register/Registration';
import { game } from '../../pages/game/Game';
import { modalVictory } from '../../pages/modal/ModalVictory';

export class Header extends BaseComponent {
  gameControlBlock: HTMLDivElement;

  registerBlock: HTMLDivElement;

  buttonStartNewGame: HTMLAnchorElement;

  buttonRegisterNewPlayer: HTMLAnchorElement;

  buttonStopGame: HTMLAnchorElement;

  avatar!: HTMLImageElement;

  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="header__col1">
      <a href="#home" class="header__logo">
        <div class="header__logo-inner header__logo-inner--top">Match</div>
        <div class="header__logo-inner header__logo-inner--bottom">Match</div>
      </a>
    </div>
    <div class="header__col2">
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li class="header__menu-item">
            <a href="#home" class="header__menu-link">
              <div class="header__menu-icon header__menu-icon--about">
                <img src="./assets/public/icons/about.svg" alt="about">
              </div>
              <div class="header__menu-subtitle">About Game</div>
            </a>
          </li>
          <li class="header__menu-item">
            <a href="#score" class="header__menu-link">
              <div class="header__menu-icon">
                <img src="./assets/public/icons/score.svg" alt="score">
              </div>
              <div class="header__menu-subtitle">Best Score</div>
            </a>
          </li>
          <li class="header__menu-item">
            <a href="#settings" class="header__menu-link">
              <div class="header__menu-icon">
                <img src="./assets/public/icons/settings.svg" alt="settings">
              </div>
              <div class="header__menu-subtitle">Game Settings</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__col3">
      <div class="header__register-block" id="header-register-block">
        <a href="#" id="register-new-player">
          <button class="header__button">Register New Player</button>
        </a>
      </div>
      <div class="header__game-control-block hidden" id="header-game-control-block">
        <a href="#game" class="header__button-link" id="start-new-game">
          <button class="header__button">Start Game</button>
        </a>
        <a href="#home" class="header__button-link hidden" id="stop-game">
          <button class="header__button">Stop Game</button>
        </a>
        <div class="header__avatar">
          <img src="" alt="avatar">
        </div>
      </div>
    </div>`;

    this.gameControlBlock = this.element.querySelector('#header-game-control-block') as HTMLDivElement;
    this.registerBlock = this.element.querySelector('#header-register-block') as HTMLDivElement;
    this.buttonStartNewGame = this.element.querySelector('#start-new-game') as HTMLAnchorElement;
    this.buttonRegisterNewPlayer = this.element.querySelector('#register-new-player') as HTMLAnchorElement;
    this.buttonStopGame = this.element.querySelector('#stop-game') as HTMLAnchorElement;
    this.avatar = this.element.querySelector('.header__avatar img') as HTMLImageElement;

    this.setAttr();
    this.subscribeEvents();
  }

  setAttr(): void {
    this.avatar.setAttribute('src', avatarTemplate);
  }

  subscribeEvents(): void {
    this.configureRegisterNewPlayerButton();
    this.configureStartNewGameButton();
    this.configureStopGameButton();
    this.changeViewAfterRegistration();
    this.changeViewOnModalVictoryClose();
    this.changeViewOnLeaveGamePage();
  }

  configureRegisterNewPlayerButton(): void {
    this.buttonRegisterNewPlayer.addEventListener('click', () => {
      this.element.append(registration.element);
      registration.openModal();
    });
  }

  configureStartNewGameButton(): void {
    this.buttonStartNewGame.addEventListener('click', () => {
      this.showStopGameButton();
    });
  }

  configureStopGameButton(): void {
    this.buttonStopGame.addEventListener('click', () => {
      Header.stopGame();
      this.showStartGameButton();
      // смена хэша висит на линке кнопки
    });
  }

  showStartGameButton(): void {
    this.buttonStopGame.classList.add('hidden');
    this.buttonStartNewGame.classList.remove('hidden');
  }

  showStopGameButton(): void {
    this.buttonStartNewGame.classList.add('hidden');
    this.buttonStopGame.classList.remove('hidden');
  }

  changeViewAfterRegistration(): void {
    registration.form.addEventListener('submit', () => {
      if (registration.isFirstNameValid && registration.isLastNameValid && registration.isEmailValid) {
        this.showGameControlBlock();
        this.avatar.setAttribute('src', registration.data.avatar);
      }
    });
  }

  changeViewOnLeaveGamePage(): void {
    window.addEventListener('hashchange', () => {
      if (window.location.hash.slice(1) !== 'game') this.showStartGameButton();
    });
  }

  changeViewOnModalVictoryClose(): void {
    const okButton = modalVictory.element.querySelector('.modal__btn') as HTMLElement;
    modalVictory.element.addEventListener('click', (event) => {
      if (event.target === this.element || event.target === okButton) {
        this.showStartGameButton();
      }
    });
  }

  showGameControlBlock(): void {
    this.registerBlock.classList.add('hidden');
    this.gameControlBlock.classList.remove('hidden');
  }

  static stopGame(): void {
    game.clear();
  }
}

export const header = new Header({
  tag: 'header',
  classes: ['header'],
  id: 'header',
});
