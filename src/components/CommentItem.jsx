import React from 'react';
import PropTypes from 'prop-types';
import postedAt from '../utils';

function CommentItem({
  content = '',
  createdAt = '',
  owner = {},
}) {
  return (
    <section className="thread-reply">

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
        </div>
      </header>
      <article>
        <p>{content}</p>
      </article>
      <footer className="footer-note" />
      <p>{postedAt(createdAt)}</p>
    </section>

  );
}

const userShapeComment = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShapeComment).isRequired,
};

export { userShapeComment };

export default CommentItem;
