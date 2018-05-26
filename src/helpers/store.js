import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { allUsers } from '../reducers/all-users.reducer';
import { specificUser } from '../reducers/specific-user.reducer';

export const store = createStore(
    combineReducers({
        allUsers,
        specificUser
    }),
    applyMiddleware(thunkMiddleware)
);
