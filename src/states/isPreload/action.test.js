/**
 * testing secenario for asyncPreloadProcess thunk
 * should dispatch actions correctly when preload process succeeds
 * should dispatch actions correctly when preload process fails
 */
import {
  describe,
  beforeEach,
  afterEach,
  it,
  vi,
  expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncPreloadProcess,
  setIsPreloadActionCreator,
} from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUserResponse = { id: 1, username: 'testuser' };
const fakeErrorResponse = new Error('Error fetching data');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch actions correctly when preload process succeeds', async () => {
    // Arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    const dispatch = vi.fn();

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly when preload process fails', async () => {
    // Arrange
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
