import { store } from '../../store/store';
import { IWinnerFullStats } from '../../utils/interfaces/IWinnerFullStats';
import { IWinnerStats } from '../../utils/interfaces/IWinnerStats';
import { getCar } from '../garage/garage-api';

const baseURL = 'http://localhost:3000';
const winnersURL = `${baseURL}/winners`;

export const getWinners = async (
  page = 1,
  limit = 10,
  sort = 'wins',
  order = 'desc'
): Promise<{ items: IWinnerFullStats[]; count: number }> => {
  const responce = await fetch(`${winnersURL}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const items = await responce.json();
  const result: { items: IWinnerFullStats[]; count: number } = {
    items: await Promise.all(
      items.map(
        async (winner: IWinnerStats): Promise<IWinnerFullStats> => ({ ...winner, car: await getCar(winner.id) })
      )
    ),
    count: Number(responce.headers.get('X-Total-Count')),
  };
  return result;
};

export const getWinner = async (id: number): Promise<IWinnerStats> => {
  const responce = await fetch(`${winnersURL}/${id}`);
  const result = await responce.json();
  return result;
};

export const getWinnerStatus = async (id: number): Promise<number> => {
  let responce;
  try {
    responce = await fetch(`${winnersURL}/${id}`);
  } catch {
    (() => {
      throw new Error('Catched');
    })();
  }
  return responce.status;
};

export const createWinner = async (body: IWinnerStats): Promise<IWinnerStats> => {
  const responce = await fetch(`${winnersURL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await responce.json();
  return result;
};

export const deleteWinner = async (id: number): Promise<{ [k: string]: never }> => {
  const responce = await fetch(`${winnersURL}/${id}`, {
    method: 'DELETE',
  });
  const result = await responce.json();
  return result;
};

export const updateWinner = async (id: number, body: IWinnerStats): Promise<IWinnerStats> => {
  const responce = await fetch(`${winnersURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await responce.json();
  return result;
};

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const isInWinnersTable = (await getWinnerStatus(id)) === 200;

  if (isInWinnersTable) {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  } else {
    await createWinner({ id, wins: 1, time });
  }
};

export const updateStateWinners = async (): Promise<void> => {
  const { items, count } = await getWinners(store.winnersPage, store.winnersPerPage, store.sortBy, store.sortOrder);
  store.winners = items;
  store.winnersCount = count;
};
