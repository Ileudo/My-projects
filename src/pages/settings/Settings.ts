import './settings.scss';
import { BaseComponent } from '../../common/base-components';
import { Config } from '../../utils/interfaces';

export class Settings extends BaseComponent {
  currentSettings: { theme: string; difficulty: string };

  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="settings__options">
      <div class="settings__option">
        <label for="theme" class="settings__label">Game Cards</label>
        <select name="theme" id="theme" class="settings__select">
          <option value="">select game cards type</option>
          <option value="animal">Animal</option>
          <option value="birds">Birds</option>
          <option value="sport">Sport</option>
        </select>
      </div>
      <div class="settings__option">
        <label for="difficulty" class="settings__label">Difficulty</label>
        <select name="difficulty" id="difficulty" class="settings__select">
          <option value="">select game type</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>`;
    this.currentSettings = { theme: 'birds', difficulty: 'easy' };
    this.changeSettingsListener();
  }

  changeSettingsListener(): void {
    const theme = this.element.querySelector('#theme') as HTMLInputElement;
    const difficulty = this.element.querySelector('#difficulty') as HTMLInputElement;
    theme.addEventListener('change', () => {
      this.currentSettings.theme = theme.value;
    });
    difficulty.addEventListener('change', () => {
      this.currentSettings.difficulty = difficulty.value;
    });
  }
}

export const settings = new Settings({ tag: 'section', classes: ['settings'], id: 'settings' });
