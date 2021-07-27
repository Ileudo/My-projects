import { ICloseIcon, IHeader, IOffcanvas, IToggler } from '../../utils/interfaces';
import { Offcanvas } from './Offcanvas';
import { CloseIcon } from './CloseIcon';
import { Toggler } from './Toggler';

export class Header {
  element: HTMLElement;

  headerRow: HTMLDivElement;

  offcanvas: IOffcanvas;

  closeIcon: ICloseIcon;

  toggler: IToggler;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.element.innerHTML = `
    <div class="container-xxl">
      <div class="header__row">
      </div>
    </div>`;

    this.headerRow = this.element.querySelector('.header__row') as HTMLDivElement;
    this.offcanvas = new Offcanvas();
    this.closeIcon = new CloseIcon('#offcanvas', 'show', 'body');
    this.toggler = new Toggler('html', 'play');
  }

  init(): IHeader {
    this.headerRow.append(this.offcanvas.element);
    this.offcanvas.init();
    this.headerRow.append(this.closeIcon.element);
    this.closeIcon.init();
    this.headerRow.append(this.toggler.element);
    this.toggler.init();
    return this;
  }
}
