import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatingDate } from '../utils/utils';

type Props = {
  id: number;
  title: string;
  score: number;
  author: string;
  time: number;
};

const Article = styled(Link)`
  max-width: 760px;
  padding: 15px;
  background-color: #16181c;
  color: 'white';
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

const NewsCard = ({ id, title, score, author, time }: Props) => (
  <Article to={`/news/${id}`}>
    <h2>{title}</h2>
    <ul>
      <li>{`Рейтинг: ${score}`}</li>
      <li>{`Автор: ${author}`}</li>
      <li>{`Дата публикации: ${formatingDate(time)}`}</li>
    </ul>
  </Article>
);

export default NewsCard;
