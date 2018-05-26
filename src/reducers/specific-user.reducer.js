import { userConstants } from '../constants/user.constants';

export const specificUser = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_SPECIFIC_REQUEST:
            return {
                requesting: true
            };
        case userConstants.USER_SPECIFIC_SUCCESS:
            return {
                requesting: false,
                user: action.user
            };
        case userConstants.USER_SPECIFIC_FAILURE:
            return {
                requesting: false,
                error: action.error
            };
        default:
            return state;
    }
};
