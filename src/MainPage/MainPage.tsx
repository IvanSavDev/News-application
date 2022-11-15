import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NewsCard from './NewsCard';
import { RootState } from '../store';
import { addNews } from '../store/newsSlice';
import { News } from '../types';
import { Box } from '@mui/material';

const MainPage = () => {
  const [numbersHistory, setNumbersHistory] = useState<Number[] | []>([]);
  const news = useSelector((state: RootState) => state.news.news);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListNews = async () => {
      // const response = await axios.get(
      //   'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
      // );
      setNumbersHistory([1, 2]);
    };
    getListNews();
  }, []);

  useEffect(() => {
    if (numbersHistory.length !== 0) {
      const loadNews = async () => {
        // const responses = [];
        // for (let i = 0; i < 2; i += 1) {
        //   responses.push(
        //     axios.get(
        //       `https://hacker-news.firebaseio.com/v0/item/${numbersHistory[i]}.json?print=pretty`
        //     )
        //   );
        // }
        // const result = await Promise.allSettled(responses);

        // const successResponses = result.filter(
        //   ({ status }) => status === 'fulfilled'
        // );
        // const listNews = successResponses.map(
        //   (res) => (res as PromiseFulfilledResult<{ data: News }>).value.data
        // );

        dispatch(
          addNews([
            {
              by: 'dhouston',
              descendants: 71,
              id: 8863,
              kids: [
                8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671,
                8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403,
                8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870,
                8980, 8934, 8876,
              ],
              score: 111,
              time: 1175714200,
              title: 'My YC app: Dropbox - Throw away your USB drive',
              type: 'story',
              url: 'http://www.getdropbox.com/u/2/screencast.html',
            },
          ])
        );
      };
      loadNews();
    }
  }, [numbersHistory]);

  return (
    <>
      <Box component="h1" sx={{ textAlign: 'center' }}>
        News
      </Box>
      {news.map(({ title, score, by, time }) => (
        <NewsCard
          key={title}
          title={title}
          score={score}
          author={by}
          time={time}
        />
      ))}
    </>
  );
};

export default MainPage;
