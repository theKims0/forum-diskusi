import { ActionType } from './action';

// Reducer untuk mengelola thread
function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const upVoteBy = Array.isArray(thread.upVoteBy) ? thread.upVoteBy : [];

          return {
            ...thread,
            upVoteBy: upVoteBy.includes(action.payload.ownerId)
              ? upVoteBy.filter((id) => id !== action.payload.ownerId)
              : upVoteBy.concat([action.payload.ownerId]),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
