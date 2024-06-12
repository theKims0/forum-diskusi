/**
 * testing secenario for authUserReducer
 * should return the initial state when state is undefined
 * should return the authUser when action type is SET_AUTH_USER
 * should return null when action type is UNSET_AUTH_USER
 * should return the current state when action type is unknown
 */
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state when state is undefined', () => {
    const state = undefined;
    const action = {};
    const nextState = authUserReducer(state, action);
    expect(nextState).toBe(null);
  });

  it('should return the authUser when action type is SET_AUTH_USER', () => {
    const state = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: { id: 1, name: 'John Doe' },
      },
    };
    const nextState = authUserReducer(state, action);
    expect(nextState).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should return null when action type is UNSET_AUTH_USER', () => {
    const state = { id: 1, name: 'John Doe' };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };
    const nextState = authUserReducer(state, action);
    expect(nextState).toBe(null);
  });

  it('should return the current state when action type is unknown', () => {
    const state = { id: 1, name: 'John Doe' };
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const nextState = authUserReducer(state, action);
    expect(nextState).toBe(state);
  });
});
