import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadReplyInput({ replyTalk }) {
  const [content, setContent] = useState('');

  function replyTalkHandler() {
    if (content.trim()) {
      replyTalk(content);
      setContent('');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  }

  return (
    <div className="thread-detail">
      <textarea type="text" className="form-input" placeholder="Thread your reply" value={content} onChange={handleTextChange} />
      <p>
        <strong>{content.length}</strong>
        /320
      </p>
      <button type="submit" className="button-primary" onClick={replyTalkHandler}>Reply</button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyTalk: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
