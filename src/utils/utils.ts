import axios from 'axios';
import { Comment } from '../types';

export const getFullDate = (seconds: number) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const [dayOfWeek, month, day, year, time] = String(date).split(' ');
  const fullDate = `${dayOfWeek} ${month} ${day} ${year} ${time}`;
  return fullDate;
};

export const getShortDate = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.round(minutes)} minutes ago`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.round(hours)} hours ago`;
  }

  const days = hours / 24;
  if (days <= 31) {
    return `${Math.round(days)} days ago`;
  }

  const month = days / 31;
  if (month < 12) {
    return `${Math.round(month)} month ago`;
  }

  const years = month / 12;
  return `${Math.round(years)} years ago`;
};

export const getComments = async (
  idsComments: Number[]
): Promise<Comment[]> => {
  const requestes = idsComments.map((idComment) =>
    axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${idComment}.json?print=pretty`
    )
  );

  const responses = await Promise.allSettled(requestes);
  const successfulResponses = responses.filter(
    ({ status }) => status === 'fulfilled'
  );

  const comments = successfulResponses.map(
    (res) => (res as PromiseFulfilledResult<{ data: Comment }>).value.data
  );

  return comments;
};
