/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { userShapeComment } from './CommentItem';

function CommentsList({ comments }) {
  return (
    <div className="talks-list">
      {
         comments.map((comment) => (
           <CommentItem key={comment.id} {...comment} />

         ))
      }
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(userShapeComment).isRequired,
};

export default CommentsList;
