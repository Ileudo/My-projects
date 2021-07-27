import { getCars } from '../pages/garage/garage-api';
import { getWinners } from '../pages/winners/winners-api';
import { store } from '../store/store';

function getCoordinates(element: HTMLElement) {
  // prettier-ignore
  const {
    top, left, width, height
  } = element.getBoundingClientRect();
  const coordinates = {
    x: left + width / 2,
    y: top + height / 2,
  };
  return coordinates;
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getCoordinates(a);
  const bPosition = getCoordinates(b);
  const distance = Math.abs(aPosition.x - bPosition.x);
  return distance;
}

export function animation(car: HTMLDivElement, distance: number, animationTime: number): void {
  let startTime = 0;
  const carID: number = +car.id.split('car-')[1];

  function loop(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const timeFromAnimationStart = timestamp - startTime;
    const distanceFromAnimationStart = Math.round(timeFromAnimationStart * (distance / animationTime));
    car.style.transform = `translateX(${distanceFromAnimationStart}px)`;

    if (distanceFromAnimationStart < distance) store.animation[carID] = window.requestAnimationFrame(loop);
  }

  store.animation[carID] = window.requestAnimationFrame(loop);
}

export function getBtnID(id: string): number {
  if (id.includes('start-engine-')) return Number(id.split('start-engine-')[1]);
  if (id.includes('stop-engine-')) return Number(id.split('stop-engine-')[1]);
  if (id.includes('select-car-')) return Number(id.split('select-car-')[1]);
  if (id.includes('remove-car-')) return Number(id.split('remove-car-')[1]);
  return -1;
}

export function getRandomName(): string {
  const name = {
    Kia: ['Seltos', 'Soul', 'Carnival'],
    Hyundai: ['Creta', 'Elantra', 'SantaFe'],
    Lada: ['Vesta', 'Largus', 'Xray'],
    Suzuki: ['Jimny', 'SX4', 'Vitara'],
    Honda: ['Civic', 'CR-V', 'Accord'],
    Toyota: ['Camry', 'RAV4', 'Corolla'],
    Ford: ['Fiesta', 'Focus', 'Kuga'],
  };
  const brand = Object.keys(name)[Math.floor(Math.random() * Object.keys(name).length)] as keyof typeof name;
  const model = name[brand][Math.floor(Math.random() * name[brand].length)];
  return `${brand} ${model}`;
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  const base = 16;
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * base)];
  }
  return color;
}

export const generateRandomCarInfo = (count = 100): { name: string; color: string }[] => {
  const array = new Array(count).fill(1);
  return array.map(() => ({ name: getRandomName(), color: getRandomColor() }));
};

export const refreshStore = async (): Promise<void> => {
  const { items: cars, count: carsCount } = await getCars(store.carsPage);
  store.cars = cars;
  store.carsCount = carsCount;
  const { items: winners, count: winnersCount } = await getWinners(store.winnersPage);
  store.winners = winners;
  store.winnersCount = winnersCount;
};
