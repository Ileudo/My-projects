import './home.scss';
import { BaseComponent } from '../../common/base-components';
import { Config } from '../../utils/interfaces';
import imageRegister from '../../assets/images/home/register.png';
import imageSettings from '../../assets/images/home/settings.png';
import imageGame from '../../assets/images/home/game.png';

export class Home extends BaseComponent {
  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="home__wrapper">
    <h2 class="home__title">How to play?</h2>
    <div class="home__grid">
      <div class="home__stage home__stage--1">
        <div class="home__stage-icon"><span>1</span></div>
        <div class="home__stage-text">Register new player in game</div>
      </div>
      <div class="home__stage-image home__stage-image--1">
        <img src="" alt="">
      </div>
      <div class="home__stage home__stage--2">
        <div class="home__stage-icon"><span>2</span></div>
        <div class="home__stage-text">Configure your game settings</div>
      </div>
      <div class="home__stage-image home__stage-image--2">
        <img src="" alt="">
      </div>
      <div class="home__stage home__stage--3">
        <div class="home__stage-icon"><span>3</span></div>
        <div class="home__stage-text">Start you new game! Remember card positions and match it before times up.</div>
      </div>
      <div class="home__stage-image home__stage-image--3">
        <img src="" alt="">
      </div>
    </div>
  </div>`;
    this.setAttr();
  }

  setAttr(): void {
    const imageStage1 = this.element.querySelector('.home__stage-image--1 img') as HTMLImageElement;
    imageStage1.setAttribute('src', imageRegister);
    imageStage1.setAttribute('alt', 'About registration');
    const imageStage2 = this.element.querySelector('.home__stage-image--2 img') as HTMLImageElement;
    imageStage2.setAttribute('src', imageSettings);
    imageStage2.setAttribute('alt', 'About settings');
    const imageStage3 = this.element.querySelector('.home__stage-image--3 img') as HTMLImageElement;
    imageStage3.setAttribute('src', imageGame);
    imageStage3.setAttribute('alt', 'About game');
  }
}

export const home = new Home({
  tag: 'section',
  classes: ['home'],
  id: 'home',
});
