import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'src/store';
import { addComments } from 'src/store/commentsSlice';
import CommentCard from './CommentCard/CommentCard';
import ButtonReload from 'src/components/Buttons/ButtonReload';
import { News } from 'src/types/types';
import { Statuses } from 'src/enums/enums';
import { Loader } from 'src/components/Loader';
import Error from './Error';
import { getComments, getNews } from 'src/api/api';
import { filterByExistence } from 'src/utils/utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const WrapperComments = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

type Props = {
  newsId: number;
  news: News;
};

const Comments = ({ newsId, news }: Props) => {
  const [status, setStatus] = useState(Statuses.Fulfilled);
  const [abortSignal, setAbortSignal] = useState<null | AbortController>(null);
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch();
  const newsComments = comments[newsId];
  const kids = news.kids;

  useEffect(() => {
    if (kids && !newsComments) {
      setStatus(Statuses.Pending);

      const controller = new AbortController();
      setAbortSignal(controller);

      const loadComments = async () => {
        try {
          const loadedComments = await getComments(kids, controller);
          dispatch(addComments({ id: newsId, comments: loadedComments }));
          setStatus(Statuses.Fulfilled);
        } catch {
          setStatus(Statuses.Rejected);
        }
      };

      loadComments();
    }

    return () => {
      if (abortSignal) {
        abortSignal.abort();
      }
    };
  }, []);

  const handleClick = async () => {
    try {
      setStatus(Statuses.Pending);

      const controller = new AbortController();
      setAbortSignal(controller);

      const news = await getNews(newsId, controller);
      if (news.kids) {
        const loadedComments = await getComments(news.kids, controller);
        dispatch(addComments({ id: newsId, comments: loadedComments }));
      }

      setStatus(Statuses.Fulfilled);
    } catch {
      setStatus(Statuses.Rejected);
    }
  };

  return (
    <>
      <Wrapper>
        <h3>Comments</h3>
        <ButtonReload
          action={handleClick}
          disabled={status === Statuses.Pending}
        />
      </Wrapper>
      <WrapperComments>
        {status === Statuses.Pending && <Loader />}
        {status === Statuses.Rejected && <Error />}
        {status === Statuses.Fulfilled &&
          newsComments &&
          filterByExistence(newsComments).map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        {status === Statuses.Fulfilled && !newsComments && (
          <p>Comments not found</p>
        )}
      </WrapperComments>
    </>
  );
};

export default Comments;
