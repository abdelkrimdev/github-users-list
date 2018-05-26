import { Reducer } from 'redux-testkit';

import { allUsers } from './all-users.reducer';
import { userConstants } from '../constants/user.constants';

describe('all users reducer', () => {
    it('should have initial state.', () => {
        const action = { type: 'NON_EXISTING' };
        expect(allUsers(undefined, action)).toEqual({});
    });

    it('should return the same state after receiving a non existing action.', () => {
        const state = { state: 'previous state' };
        const action = { type: 'NON_EXISTING' };
        Reducer(allUsers).withState(state).expect(action).toReturnState(state);
    });

    it('should handle GET ALL USERS RESQUEST action.', () => {
        const action = {
            type: userConstants.USER_ALL_REQUEST
        };
        const result = {
            requesting: true
        };
        Reducer(allUsers).expect(action).toReturnState(result);
    });

    it('should handle GET ALL USERS SUCCESS action.', () => {
        const action = {
            type: userConstants.USER_ALL_SUCCESS,
            users: []
        };
        const result = {
            requesting: false,
            users: action.users
        };
        Reducer(allUsers).expect(action).toReturnState(result);
    });

    it('should handle GET ALL USERS FAILURE action.', () => {
        const action = {
            type: userConstants.USER_ALL_FAILURE,
            error: new Error()
        };
        const result = {
            requesting: false,
            error: action.error
        };
        Reducer(allUsers).expect(action).toReturnState(result);
    });
});
