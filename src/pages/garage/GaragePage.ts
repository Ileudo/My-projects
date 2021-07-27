import { BaseComponent } from '../../core/BaseComponent';
import { IConfig } from '../../utils/interfaces/IConfig';
import { IGarage } from '../../utils/interfaces/IGarage';
import { IGaragePage } from '../../utils/interfaces/IGaragePage';
import { IMenu } from '../../utils/interfaces/IMenu';
import {
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  drive,
  updateStateGarage,
} from './garage-api';
import { deleteWinner, saveWinner } from '../winners/winners-api';
import { Garage } from './garage/Garage';
import { Menu } from './menu/Menu';
import { ICarInfo } from '../../utils/interfaces/ICarInfo';
// prettier-ignore
import {
  animation, generateRandomCarInfo, getBtnID, getDistanceBetweenElements
} from '../../utils/utils';
import { store } from '../../store/store';
import { IWinnerResult } from '../../utils/interfaces/IWinnerResult';

export class GaragePage extends BaseComponent implements IGaragePage {
  menu: IMenu;

  garage: IGarage;

  selectedCar: ICarInfo | null;

  constructor(config: IConfig) {
    super(config);
    this.menu = new Menu({ tag: 'section', class: 'menu', id: 'menu' });
    this.garage = new Garage({ tag: 'section', class: 'garage', id: 'garage' });
    this.selectedCar = null;
  }

  render(): HTMLElement {
    this.element.append(this.menu.render());
    this.element.append(this.garage.render());
    return this.element;
  }

  subscribe(): void {
    document.body.addEventListener('click', async (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.id === 'create-car-btn') {
          e.preventDefault();
          this.createCarListener();
        }

        if (e.target.id.includes('select-car-')) {
          this.selectCarListener(getBtnID(e.target.id));
        }

        if (e.target.id === 'update-car-btn') {
          e.preventDefault();
          this.updateCarListener();
        }

        if (e.target.id.includes('remove-car-')) {
          this.removeCarListener(getBtnID(e.target.id));
        }

        if (e.target.id.includes('start-engine-')) {
          this.startDriving(getBtnID(e.target.id));
        }

        if (e.target.id.includes('stop-engine-')) {
          this.stopDriving(getBtnID(e.target.id));
        }

        if (e.target.id === 'race') {
          (e.target as HTMLButtonElement).disabled = true;
          await this.raceHandler();
        }

        if (e.target.id === 'reset') {
          (e.target as HTMLButtonElement).disabled = true;
          await this.resetRaceHandler();
        }

        if (e.target.id === 'generate') {
          (e.target as HTMLButtonElement).disabled = true;
          await this.generatorHandler();
          (e.target as HTMLButtonElement).disabled = false;
        }
      }
    });
  }

  async generatorHandler(): Promise<void> {
    const cars = generateRandomCarInfo();
    await Promise.all(cars.map((carInfo: { name: string; color: string }) => createCar(carInfo)));
    await updateStateGarage();
    this.garage.render();
  }

  async resetRaceHandler(): Promise<void> {
    await Promise.all((store.cars as ICarInfo[]).map(({ id }) => this.stopDriving(id)));
    this.garage.modal.element.classList.remove('show');
    const raceBtn = document.getElementById('race') as HTMLButtonElement;
    raceBtn.disabled = false;
  }

  async raceHandler(): Promise<void> {
    const winner = await this.racing(this.startDriving.bind(this));
    this.garage.modal.render(winner.car.name, winner.time);
    this.garage.modal.element.classList.add('show');
    await saveWinner(winner.car.id, winner.time);
    const resetBtn = document.getElementById('reset') as HTMLButtonElement;
    resetBtn.disabled = false;
  }

  async raceAll(promises: Promise<IWinnerResult>[], ids: number[]): Promise<{ car: ICarInfo; time: number }> {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedCarIndex = ids.findIndex((index: number) => index === id);
      const restPromises = [
        ...promises.slice(0, failedCarIndex),
        ...promises.slice(failedCarIndex + 1, promises.length),
      ];
      const restIDs = [...ids.slice(0, failedCarIndex), ...ids.slice(failedCarIndex + 1, promises.length)];
      return this.raceAll(restPromises, restIDs);
    }

    return {
      car: (store.cars as ICarInfo[]).find((car) => car.id === id) as ICarInfo,
      time: +(time / 1000).toFixed(2),
    };
  }

  async racing(action: (id: number) => Promise<IWinnerResult>): Promise<{ car: ICarInfo; time: number }> {
    const promises = (store.cars as ICarInfo[]).map(({ id }) => action(id));
    const ids = (store.cars as ICarInfo[]).map((car) => car.id);
    const winner = await this.raceAll(promises, ids);
    return winner;
  }

  async startDriving(id: number): Promise<IWinnerResult> {
    const startEngineBtn = this.element.querySelector(`#start-engine-${id}`) as HTMLButtonElement;
    const stopEngineBtn = this.element.querySelector(`#stop-engine-${id}`) as HTMLButtonElement;

    startEngineBtn.disabled = true;
    startEngineBtn.classList.add('ignition');

    const { distance, velocity } = await startEngine(id);
    startEngineBtn.classList.remove('ignition');
    stopEngineBtn.disabled = false;

    const time = Math.round(distance / velocity);
    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
    const htmlDistance = getDistanceBetweenElements(car, flag) + 80;

    animation(car, htmlDistance, time);
    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(store.animation[id]);

    return { success, id, time };
  }

  async stopDriving(id: number): Promise<void> {
    const stopEngineBtn = this.element.querySelector(`#stop-engine-${id}`) as HTMLButtonElement;
    const startEngineBtn = this.element.querySelector(`#start-engine-${id}`) as HTMLButtonElement;

    stopEngineBtn.disabled = true;
    stopEngineBtn.classList.add('braking');
    await stopEngine(id);
    stopEngineBtn.classList.remove('braking');
    startEngineBtn.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    car.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(store.animation[id]);
  }

  async createCarListener(): Promise<void> {
    const createCarNameInput = this.element.querySelector('#create-car-name') as HTMLInputElement;
    const createCarColorInput = this.element.querySelector('#create-car-color') as HTMLInputElement;

    if (!createCarNameInput.value) return;

    const car = {
      name: createCarNameInput.value,
      color: createCarColorInput.value,
    };

    await createCar(car);

    await updateStateGarage();
    this.garage.render();
    createCarNameInput.value = '';
  }

  async selectCarListener(id: number): Promise<void> {
    this.selectedCar = await getCar(id);

    const updateNameInput = document.getElementById('update-car-name') as HTMLInputElement;
    updateNameInput.value = this.selectedCar.name;
    updateNameInput.disabled = false;

    const updateColorInput = document.getElementById('update-car-color') as HTMLInputElement;
    updateColorInput.value = this.selectedCar.color;
    updateColorInput.disabled = false;

    const updateCarBtn = document.getElementById('update-car-btn') as HTMLButtonElement;
    updateCarBtn.disabled = false;
  }

  async updateCarListener(): Promise<void> {
    const updateBtn = document.getElementById('update-car-btn') as HTMLButtonElement;
    const updateNameInput = document.getElementById('update-car-name') as HTMLInputElement;
    const updateColorInput = document.getElementById('update-car-color') as HTMLInputElement;

    const carUpdatedInfo = {
      name: updateNameInput.value,
      color: updateColorInput.value,
    };

    if (this.selectedCar) {
      await updateCar(this.selectedCar.id, carUpdatedInfo);

      await updateStateGarage();
      this.garage.render();
      updateNameInput.value = '';
      updateNameInput.disabled = true;
      updateColorInput.disabled = true;
      updateBtn.disabled = true;
    }
  }

  async removeCarListener(id: number): Promise<void> {
    await deleteCar(id);
    await deleteWinner(id);

    await updateStateGarage();
    this.garage.render();
  }
}
