/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import ThreadItem from '../components/ThreadItem';
import ThreadReplyInput from '../components/ThreadReplyInput';
import { asyncReceiveThreadDetail, asyncToogleLikeThreadDetail, asyncReplyThread } from '../states/threadDetail/action';
import CommentsList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail,
    authUser,
    users,
  } = useSelector((state) => state); // assuming your state structure is correct
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onLikeTalk = () => {
    dispatch(asyncToogleLikeThreadDetail(threadDetail.id)); // assuming threadDetail has an id
  };

  const onReplyTalk = (content) => {
    dispatch(asyncReplyThread({ content, id }));
  };

  if (!threadDetail) {
    return null;
  }

  const { comments } = threadDetail; // assuming threadDetail structure is correct

  const commentList = comments.map((comment) => ({
    ...comment,
    user: users.find((user) => user.id === comment.owner.id),
    authUser: authUser.id,
  }));

  return (
    <section className="detail-page">
      {
        threadDetail.parent && (
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ThreadItem {...threadDetail.parent} authUser={authUser.id} />
          </div>
        )
      }
      <ThreadDetail {...threadDetail} authUser={authUser.id} likeTalk={onLikeTalk} />
      <ThreadReplyInput replyTalk={onReplyTalk} />
      <CommentsList comments={commentList} />
    </section>
  );
}

export default DetailPage;
