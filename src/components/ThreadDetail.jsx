/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import postedAt from '../utils';

function ThreadDetail({
  title = '',
  body = '',
  createdAt = '',
  upVotesBy = [],
  owner = {},
  authUser = '',
}) {
  const isTalkLiked = upVotesBy.includes(authUser);

  return (
    <section className="thread-detail">

      <header className="footer-note">
        <img className="img-round" src={owner.avatar} alt={owner} />
        <div className="user-info">
          <p>
            @
            {owner.id}
          </p>
          <span>
            {owner.name}
          </span>
          <h3>{title}</h3>
        </div>
      </header>
      <article>
        <p>{body}</p>
      </article>
      <footer className="footer-note">
        <div>
          <button type="button" aria-label="like">
            { isTalkLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
          </button>
          <span>
            {upVotesBy.length}
            {' '}
            Likes
          </span>
        </div>
      </footer>
      <p>{postedAt(createdAt)}</p>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default ThreadDetail;
