import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFullDate } from '../utils/utils';

type Props = {
  id: number;
  title: string;
  score: number;
  author: string;
  time: number;
};

const Article = styled(Link)`
  display: flex;
  flex-direction: column;
  max-width: 760px;
  padding: 15px;
  background-color: #16181c;
  color: 'white';
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    box-shadow: 0px 0px 6px 3px white;
  }
`;

const Header = styled.h2`
  margin-bottom: 10px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NewsCard = ({ id, title, score, author, time }: Props) => (
  <Article to={`/news/${id}`}>
    <Header>{title}</Header>
    <List>
      <li>{`Author: ${author}`}</li>
      <li>{`Score: ${score}`}</li>
      <li>{`Publication date: ${getFullDate(time)}`}</li>
    </List>
  </Article>
);

export default NewsCard;
