import React from 'react';
import styled from 'styled-components';
import { News } from '../../types';
import { getFullDate } from '../../utils/utils';
import ButtonBack from '../Buttons/ButttonBack';

const Header = styled.h2`
  grid-area: title;
  display: inline-block;
  align-self: start;
`;

const List = styled.ul`
  grid-area: list;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
`;

const WrapperNews = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'button title'
    '. list';
  gap: 10px;
  margin-bottom: 15px;
`;

type Props = {
  news: News;
};

const NewsCard = ({ news }: Props) => {
  const { by, title, time, url, descendants } = news;
  return (
    <WrapperNews>
      <ButtonBack route={'/'} />
      <Header>{title}</Header>
      <List>
        <li>{`Author: ${by}`}</li>
        <li>{`Publication date: ${getFullDate(time)}`}</li>
        <li>
          {'URL: '}
          <a href={url}>{url}</a>
        </li>
        <li>{`Comments count: ${descendants}`}</li>
      </List>
    </WrapperNews>
  );
};

export default NewsCard;
