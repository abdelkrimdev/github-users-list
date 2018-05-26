import { userConstants } from '../constants/user.constants';

export const allUsers = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_ALL_REQUEST:
            return {
                requesting: true
            };
        case userConstants.USER_ALL_SUCCESS:
            return {
                requesting: false,
                users: action.users
            };
        case userConstants.USER_ALL_FAILURE:
            return {
                requesting: false,
                error: action.error
            };
        default:
            return state;
    }
};
