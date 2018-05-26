import { userConstants } from '../constants/user.constants';

export const allUsers = (state = { users: [] }, action) => {
    switch (action.type) {
        case userConstants.USER_ALL_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case userConstants.USER_ALL_SUCCESS:
            return {
                requesting: false,
                users: state.users.concat(action.users)
            };
        case userConstants.USER_ALL_FAILURE:
            return {
                requesting: false,
                error: action.error
            };
        case userConstants.USERS_CLEAR:
            return { users: [] };
        default:
            return state;
    }
};
