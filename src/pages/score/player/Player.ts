import './player.scss';
import { BaseComponent } from '../../../common/base-components';
import { Config } from '../../../utils/interfaces';

export class Player extends BaseComponent {
  constructor(config: Config, fullName: string, email: string, avatar: string, score: number) {
    super(config);
    this.element.innerHTML = `
    <div class="player__avatar">
      <img src="" alt="avatar">
    </div>
    <div class="player__info">
      <div class="player__name">Nicci Troiani</div>
      <div class="player__email">nicci@gmail.com</div>
    </div>
    <div class="player__result">
      <span class="player__result-title">Score:</span><span class="player__result-points">458</span>
    </div>
    `;
    this.seAttr(fullName, email, avatar, score);
  }

  seAttr(fullName: string, email: string, avatar: string, score: number): void {
    const playerName = this.element.querySelector('.player__name') as HTMLDivElement;
    const playerEmail = this.element.querySelector('.player__email') as HTMLDivElement;
    const playerPoints = this.element.querySelector('.player__result-points') as HTMLSpanElement;
    const playerAvatar = this.element.querySelector('.player__avatar img') as HTMLImageElement;

    playerName.textContent = fullName;
    playerEmail.textContent = email;
    playerPoints.textContent = `${score}`;
    playerAvatar.setAttribute('src', avatar);
  }
}
