import { Comment, News } from 'src/types/types';

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

export function filterByExistence(news: News[]): News[];
export function filterByExistence(comment: Comment[]): Comment[];
export function filterByExistence(
  entities: (News | Comment)[]
): (News | Comment)[] {
  return entities.filter((entity) => {
    if (entity.deleted) {
      return false;
    }
    if (entity.dead) {
      return false;
    }
    return true;
  });
}
