/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadList({ threads, like }) {
  return (
    <div className="container-thread-list">
      {
         threads.map((thread) => (
           <ThreadItem key={thread.id} {...thread} like={like} />

         ))
      }
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
};

export default ThreadList;
