import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function addthread() {
    if (body.trim()) {
      addThread(title, body, category);
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  function handleTitleChange({ target }) {
    setTitle(target.value);
  }
  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }
  function handleCategoryChange({ target }) {
    setCategory(target.value);
  }

  return (
    <div className="thread-input">
      <input type="text" className="form-input" placeholder="your title" value={title} onChange={handleTitleChange} required />
      <input type="text" className="form-input" placeholder="your category" value={category} onChange={handleCategoryChange} />
      <textarea type="text" className="form-input" placeholder="What are you thinking?" value={body} onChange={handleTextChange} required />
      <p className="talk-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="submit" className="button-primary" onClick={addthread}>Thread</button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
