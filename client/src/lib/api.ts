import { Card, InitialBoard, Board } from '../types';
import config from './config';

const DB_ENDPOINT = config.databaseURL + '/' + config.stage;

export const createBoard = async (
  body: Board
): Promise<{
  Item: InitialBoard;
}> => {
  const response = await fetch(DB_ENDPOINT, {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const res = await response.json();

  return res;
};

export const readBoard = async (
  id: string
): Promise<{ Item: InitialBoard }> => {
  const response = await fetch(`${DB_ENDPOINT}/board/${id}`, {
    method: 'GET',
  });

  const res = await response.json();

  return res;
};

export const deleteBoard = async (id: string) => {
  const response = await fetch(`${DB_ENDPOINT}/board/${id}`, {
    method: 'DELETE',
  });

  const res = await response.json();

  return res;
};

export const updateBoard = async (id: string, body: Board) => {
  const response = await fetch(`${DB_ENDPOINT}/board/${id}`, {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const res = await response.json();

  return res;
};

export const scrapUrl = async (
  id: string,
  url: string
): Promise<Card['data']> => {
  const response = await fetch(`${DB_ENDPOINT}/board/${id}/scrap`, {
    body: JSON.stringify(url),
    method: 'POST',
  });

  const res = await response.json();

  return res;
};