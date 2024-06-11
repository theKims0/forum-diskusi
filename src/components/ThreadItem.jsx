import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  BiLike, BiSolidLike, BiDislike, BiSolidDislike,
} from 'react-icons/bi';
import postedAt from '../utils';

function ThreadItem({
  id = '',
  title = '',
  body = '',
  category = '',
  createdAt = '',
  upVotesBy = [],
  downVotesBy = [],
  authUser = '',
  totalComments = '',
  like = null,
  dislike = null,
  user = '',
}) {
  const navigate = useNavigate();
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onTalkClick = () => {
    navigate(`/thread/${id}`);
  };

  const onTalkPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/thread/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="container-thread" onClick={onTalkClick} onKeyDown={onTalkPress}>
      <div className="head-app">
        <div className="user-info">
          <p className="link">
            {user.name}
          </p>
          {postedAt(createdAt)}
        </div>
        <div className="user-details">
          <img className="img-round" src={user.avatar} alt={user.name} />
        </div>
      </div>
      <p className="category-button">{category}</p>

      <div>
        <h3>
          <b>
            {title}
            {' '}
          </b>
        </h3>
        <p>{body}</p>
      </div>
      <div className="footer-note">
        {
              like && (
                <>
                  <button type="button" aria-label="like" onClick={onLikeClick}>
                    { isThreadLiked ? <BiSolidLike /> : <BiLike /> }
                  </button>
                  {' '}
                  {upVotesBy.length}
                </>
              )
            }
        {
            dislike && (
              <>
                <button type="button" aria-label="like" onClick={onLikeClick}>
                  { isThreadDisliked ? <BiSolidDislike /> : <BiDislike /> }
                </button>
                {' '}
                {downVotesBy.length}
              </>
            )
          }
      </div>
      <div>
        <p>
          <b>
            Comments (
            { totalComments}
            )
          </b>
        </p>
      </div>
    </div>
  );
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };

export default ThreadItem;
