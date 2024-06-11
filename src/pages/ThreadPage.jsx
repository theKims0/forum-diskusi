import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import { asyncAddThread } from '../states/thread/action';

function ThreadPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default ThreadPage;
