import axios from 'axios';
import { NEWS_COUNT_ON_PAGE } from 'src/constants/constants';
import { News } from '../types/types';
import { Comment } from '../types/types';

const apiBasePath = 'https://hacker-news.firebaseio.com';

export const getTopNewsIds = async () => {
  const response = await axios.get(
    `${apiBasePath}/v0/topstories.json?print=pretty`
  );
  const oneHundredFirstNews: number[] = await response.data.slice(
    0,
    NEWS_COUNT_ON_PAGE
  );
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

export const getNews = async (
  idNews: Number,
  controller?: AbortController
): Promise<News> => {
  const signal = controller ? { signal: controller.signal } : {};
  const request = await axios.get(
    `${apiBasePath}/v0/item/${idNews}.json?print=pretty`,
    signal
  );
  const news = request.data;

  return news;
};
