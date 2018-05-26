import { Reducer } from 'redux-testkit';

import { specificUser } from './specific-user.reducer';
import { userConstants } from '../constants/user.constants';

describe('specific user reducer', () => {
    it('should have initial state.', () => {
        const action = { type: 'NON_EXISTING' };
        expect(specificUser(undefined, action)).toEqual({});
    });

    it('should return the same state after receiving a non existing action.', () => {
        const state = { state: 'previous state' };
        const action = { type: 'NON_EXISTING' };
        Reducer(specificUser).withState(state).expect(action).toReturnState(state);
    });

    it('should handle GET USER RESQUEST action.', () => {
        const action = {
            type: userConstants.USER_SPECIFIC_REQUEST
        };
        const result = {
            requesting: true
        };
        Reducer(specificUser).expect(action).toReturnState(result);
    });

    it('should handle GET USER SUCCESS action.', () => {
        const action = {
            type: userConstants.USER_SPECIFIC_SUCCESS,
            user: {}
        };
        const result = {
            requesting: false,
            user: action.user
        };
        Reducer(specificUser).expect(action).toReturnState(result);
    });

    it('should handle GET USER FAILURE action.', () => {
        const action = {
            type: userConstants.USER_SPECIFIC_FAILURE,
            error: new Error()
        };
        const result = {
            requesting: false,
            error: action.error
        };
        Reducer(specificUser).expect(action).toReturnState(result);
    });
});
