import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import postedAt from '../utils';

function ThreadItem({
  id = '',
  title = '',
  body = '',
  category = '',
  createdAt = '',
  totalComments = '',
  user = '',
}) {
  const navigate = useNavigate();

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
  authUser: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };

export default ThreadItem;
