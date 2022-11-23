import axios from 'axios';
import { News } from './types';
import { Comment } from './types';

const apiBasePath = 'https://hacker-news.firebaseio.com';

export const getTopNewsIds = async () => {
  const response = await axios.get(
    `${apiBasePath}/v0/topstories.json?print=pretty`
  );
  const oneHundredFirstNews: number[] = await response.data.slice(0, 100);
  return oneHundredFirstNews;
};

export const getTopNewsData = async (newsIds: number[]) => {
  const responses = newsIds.map((newsId) =>
    axios.get(`${apiBasePath}/v0/item/${newsId}.json?print=pretty`)
  );
  const resultResponses = await Promise.allSettled(responses);
  const successfulResponses = resultResponses.filter(
    ({ status }) => status === 'fulfilled'
  );
  const news = successfulResponses.map(
    (res) => (res as PromiseFulfilledResult<{ data: News }>).value.data
  );
  return news;
};

export const getComments = async (
  idsComments: Number[],
  controller?: AbortController
): Promise<Comment[]> => {
  const requestes = idsComments.map((idComment) => {
    const signal = controller ? { signal: controller.signal } : {};
    return axios.get(
      `${apiBasePath}/v0/item/${idComment}.json?print=pretty`,
      signal
    );
  });

  const responses = await Promise.allSettled(requestes);
  const successfulResponses = responses.filter(
    ({ status }) => status === 'fulfilled'
  );

  const comments = successfulResponses.map(
    (res) => (res as PromiseFulfilledResult<{ data: Comment }>).value.data
  );

  return comments;
};
