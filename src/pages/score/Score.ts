import './score.scss';
import { BaseComponent } from '../../common/base-components';
import { Config, DataDB } from '../../utils/interfaces';
import { Player } from './player/Player';

export class Score extends BaseComponent {
  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="score__content">
      <h2 class="score__title">Best players</h2>
      <ul class="score__players-list">
      </ul>
    </div>`;
  }

  getDataFromDB(): Promise<void> {
    const openRequest = indexedDB.open('ileudo', 1);
    let db;
    return new Promise((resolve) => {
      openRequest.onsuccess = function x() {
        db = this.result;

        const objectStore = db.transaction('Score').objectStore('Score');

        objectStore.getAll().onsuccess = function y() {
          resolve(this.result);
        };
      };
    }).then((res) => this.handleData(res as DataDB[]));
  }

  handleData(dataArr: DataDB[]): void {
    const ul = this.element.querySelector('ul') as HTMLUListElement;
    ul.innerHTML = '';
    dataArr.sort((a, b) => b.points - a.points).splice(9);
    dataArr.forEach((playerInfo) => {
      // prettier-ignore
      const {
        firstName, lastName, email, avatar,
      } = playerInfo.player;
      const fullName = `${firstName} ${lastName}`;
      const score = playerInfo.points;
      const player = new Player({ tag: 'li', classes: ['player'], id: '' }, fullName, email, avatar, score);
      ul.append(player.element);
    });
  }
}

export const score = new Score({ tag: 'section', classes: ['score'], id: 'score' });
