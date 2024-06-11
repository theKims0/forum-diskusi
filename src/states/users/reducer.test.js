import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  it('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];
    const action = {};

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state).toBe(initialState);
  });

  it('should return the users when receiving RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    const action = { type: ActionType.RECEIVE_USERS, payload: { users } };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state).toBe(users);
  });

  it('should return current state when action type is unknown', () => {
    // Arrange
    const initialState = [{ id: 1, name: 'John Doe' }];
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const state = usersReducer(initialState, action);

    // Assert
    expect(state).toBe(initialState);
  });
});
