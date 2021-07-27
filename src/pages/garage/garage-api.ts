import { store } from '../../store/store';
import { ICarInfo } from '../../utils/interfaces/ICarInfo';
import { IEngineProps } from '../../utils/interfaces/IEngineProps';

const baseURL = 'http://localhost:3000';
const garageURL = `${baseURL}/garage`;
const engineURL = `${baseURL}/engine`;

export const getCars = async (page: number, limit = 7): Promise<{ items: ICarInfo[]; count: number }> => {
  const responce = await fetch(`${garageURL}?_page=${page}&_limit=${limit}`);
  const result = {
    items: await responce.json(),
    count: Number(responce.headers.get('X-Total-Count')),
  };
  return result;
};

export const getCar = async (id: number): Promise<ICarInfo> => {
  const responce = await fetch(`${garageURL}/${id}`);
  const result = await responce.json();
  return result;
};

export const createCar = async (body: { name: string; color: string }): Promise<ICarInfo> => {
  const responce = await fetch(`${garageURL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result: ICarInfo = await responce.json();
  return result;
};

export const deleteCar = async (id: number): Promise<unknown> => {
  const responce = await fetch(`${garageURL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await responce.json();
  return result;
};

export const updateCar = async (id: number, body: { name: string; color: string }): Promise<ICarInfo> => {
  const responce = await fetch(`${garageURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await responce.json();
  return result;
};

export const startEngine = async (id: number): Promise<IEngineProps> => {
  const responce = await fetch(`${engineURL}?id=${id}&status=started`);
  const result = await responce.json();
  return result;
};

export const stopEngine = async (id: number): Promise<IEngineProps> => {
  const responce = await fetch(`${engineURL}?id=${id}&status=stopped`);
  const result = await responce.json();
  return result;
};

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const responce = await fetch(`${engineURL}?id=${id}&status=drive`);
  if (responce.status !== 200) return { success: false };
  const result = await responce.json();
  return result;
};

export const updateStateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
};
