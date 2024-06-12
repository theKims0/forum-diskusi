import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREADS',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREADS',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
};

function receiveThreadActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREAD,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, ownerId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      ownerId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({
        title, body, category,
      });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator({ threadId, ownerId: authUser }));
    try {
      await api.toggleLikeThread(threadId, authUser);
    } catch (error) {
      alert(error.message);
      // Revert the like/dislike action in case of an error
      dispatch(toggleLikeThreadActionCreator({ threadId, ownerId: authUser }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  asyncAddThread,
  asyncToggleLikeThread,
};
