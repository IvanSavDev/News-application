import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'src/store';
import { addComments, deleteComments } from 'src/store/commentsSlice';
import { testObj2 } from 'src/testObj';
import CommentCard from './CommentCard';
import ButtonReload from '../../Buttons/ButtonReload';
import { News } from 'src/types';
import { Statuses } from 'src/Enums/Enums';
import { Loader, WrapperLoader } from 'src/Loader';
import Error from './Error';
import { getComments } from 'src/api';
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
`;

type Props = {
  newsId: number;
  news: News;
};

const Comments = ({ newsId, news }: Props) => {
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.fulfilled);
  const newsComments = comments[newsId];

  useEffect(() => {
    // let timerId: number;
    // console.log(timerId);
    const controller = new AbortController();
    const kids = news.kids;
    console.log('use effect');
    if (kids && !newsComments) {
      setStatus(Statuses.pending);
      const loadComments = async () => {
        try {
          const loadedComments = await getComments(kids, controller);
          dispatch(addComments({ id: newsId, comments: loadedComments }));
          setStatus(Statuses.fulfilled);
        } catch {
          setStatus(Statuses.rejected);
        }
      };

      loadComments();

      // timerId = window.setTimeout(() => {
      //   console.log('timer');
      //   try {
      //     // throw new Error();
      //     dispatch(addComments({ id: newsId, comments: [] }));
      //     setStatus(Statuses.fulfilled);
      //   } catch {
      //     setStatus(Statuses.rejected);
      //   }
      // }, 2000);
    }

    return () => {
      // if (timerId !== undefined) {
      //   clearTimeout(timerId);
      // }
      controller.abort();
      console.log('unmount');
    };
  }, []);

  const handleClick = () => {
    try {
      setStatus(Statuses.pending);
      dispatch(deleteComments());
      setTimeout(() => {
        dispatch(addComments({ id: newsId, comments: testObj2 }));
        setStatus(Statuses.fulfilled);
      }, 2000);
    } catch {
      setStatus(Statuses.rejected);
    }
  };
  console.log(newsComments);
  return (
    <>
      <Wrapper>
        <h3>Comments</h3>
        <ButtonReload action={handleClick} disabled={status === 'pending'} />
      </Wrapper>
      <WrapperComments>
        {status === Statuses.pending && (
          <WrapperLoader>
            <Loader />
          </WrapperLoader>
        )}
        {status === Statuses.rejected && <Error />}
        {status === Statuses.fulfilled &&
          newsComments &&
          filterByExistence(newsComments).map((comment) => (
            <CommentCard key={comment.id} comment={comment} padding={0} />
          ))}
        {status === Statuses.fulfilled && !newsComments && (
          <p>Comments not found</p>
        )}
      </WrapperComments>
    </>
  );
};

export default Comments;
