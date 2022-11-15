import { Box, Card, CardActionArea, Link } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  score: number;
  author: string;
  time: number;
};

const NewsCard = ({ title, score, author, time }: Props) => (
  <Card sx={{ backgroundColor: '#16181c', color: 'white', padding: '15px' }}>
    <h2>{title}</h2>
    <ul>
      <li>{`Рейтинг: ${score}`}</li>
      <li>{`Автор: ${author}`}</li>
      <li>{`Дата публикации: ${new Date(time)}`}</li>
    </ul>
  </Card>
);

export default NewsCard;
