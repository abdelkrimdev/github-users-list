import { userConstants } from '../constants/user.constants';
import { getAllUsers, getSingleUser } from '../services/github';

export const userActions = {
    getAll: (since = 0) => {
        return async (dispatch) => {
            try {
                dispatch(request());
                
                const payload = await getAllUsers(since);
                
                dispatch(success(payload));
            } catch (error) {
                dispatch(failure(error));
            }
        };

        function request() {
            return { type: userConstants.USER_ALL_REQUEST };
        }
        function success(users) {
            return { type: userConstants.USER_ALL_SUCCESS, users };
        }
        function failure(error) {
            return { type: userConstants.USER_ALL_FAILURE, error };
        }
    },
    getByUsername: (username) => {
        return async (dispatch) => {
            try {
                dispatch(request());
    
                const payload = await getSingleUser(username);
                
                dispatch(success(payload));
            } catch (error) {
                dispatch(failure(error));
            }
        };

        function request() {
            return { type: userConstants.USER_SPECIFIC_REQUEST };
        }
        function success(user) {
            return { type: userConstants.USER_SPECIFIC_SUCCESS, user };
        }
        function failure(error) {
            return { type: userConstants.USER_SPECIFIC_FAILURE, error };
        }
    }
};
