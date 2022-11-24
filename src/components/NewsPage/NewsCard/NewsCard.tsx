import styled from 'styled-components';
import { News } from 'src/types/types';
import { getFullDate } from 'src/utils/utils';
import ButtonBack from 'src/components/Buttons/ButttonBack';

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

const URL = styled.a`
  word-break: break-all;
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
          <URL target={'_blank'} href={url}>
            {url}
          </URL>
        </li>
        <li>{`Comments count: ${descendants}`}</li>
      </List>
    </WrapperNews>
  );
};

export default NewsCard;
