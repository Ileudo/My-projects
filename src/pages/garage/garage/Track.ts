import { BaseComponent } from '../../../core/BaseComponent';
import imageFlag from '../../../assets/flag.svg';
import { ITrack } from '../../../utils/interfaces/ITrack';
import { Car } from './Car';
import { IRenderTrackParams } from '../../../utils/interfaces/IRenderTrackParams';

export class Track extends BaseComponent implements ITrack {
  render({ id, name, color }: IRenderTrackParams): HTMLElement {
    this.element.innerHTML = `
    <div class="track__buttons">
      <button class="track__select-btn btn btn-lightgreen btn-sm" id="select-car-${id}">Select</button>
      <button class="track__remove-btn btn btn-lightred btn-sm" id="remove-car-${id}">Remove</button>
      <span class="track__car-model-name">${name}</span>
    </div>
    <div class="track__content">
      <div class="track__drive-buttons">
        <button class="track__start-btn btn" id="start-engine-${id}">A</button>
        <button class="track__stop-btn btn" id="stop-engine-${id}" disabled>B</button>
      </div>
      <div class="track__car"></div>
      <div class="track__flag" id="flag-${id}"><img src="${imageFlag}" alt="flag"></div>
    </div>
    <hr />
    `;
    this.renderCar(id, color);
    return this.element;
  }

  renderCar(id: number, color: string): void {
    const carWrapper = this.element.querySelector('.track__car') as HTMLDivElement;
    carWrapper.append(new Car({ tag: 'div', class: 'track__car-image', id: `car-${id}` }).render(color));
  }
}
