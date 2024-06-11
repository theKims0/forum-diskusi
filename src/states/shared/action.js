import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveThreadActionCreator } from '../thread/action';
import { receiveUsersActionCreator } from '../users/action';
import { showErrorAlert } from '../../utils/alert';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadActionCreator(threads));
    } catch (error) {
      showErrorAlert(error.message);
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;