import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadList from '../components/ThreadList';
import asyncPopulateUsersAndThreads from '../states/shared/action';

function HomePage() {
  const { users = [], authUser } = useSelector((state) => state);
  const threads = useSelector((state) => state.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: thread.ownerId && users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <ThreadList threads={threadList} />
    </section>
  );
}

export default HomePage;
