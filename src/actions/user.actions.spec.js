import { Thunk } from 'redux-testkit';

import { getAllUsers, getSingleUser } from '../services/github';
import { userActions } from './user.actions';
import { userConstants } from '../constants/user.constants';

jest.mock('../services/github');

describe('user actions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch users from the server.', async () => {
        const users = [
            {
                "login": "mojombo",
                "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4"
            },
            {
                "login": "defunkt",
                "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4"
            }
        ];

        getAllUsers.mockReturnValue(users);
        
        const dispatches = await Thunk(userActions.getAll).execute();

        expect(dispatches.length).toBe(2);
        expect(getAllUsers.mock.calls.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual({ type: userConstants.USER_ALL_REQUEST });
        expect(dispatches[1].getAction()).toEqual({ type: userConstants.USER_ALL_SUCCESS, users });
        
    });

    it('should fetch a single user from the server.', async () => {
        const user = {
            "login": "mojombo",
            "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4"
        };

        getSingleUser.mockReturnValue(user);
        
        const dispatches = await Thunk(userActions.getByUsername).execute({ 
            username: user.login
        });

        expect(dispatches.length).toBe(2);
        expect(getSingleUser.mock.calls.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual({ type: userConstants.USER_SPECIFIC_REQUEST });
        expect(dispatches[1].getAction()).toEqual({ type: userConstants.USER_SPECIFIC_SUCCESS, user });
        
    });
});
