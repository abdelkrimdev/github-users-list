import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
    combineReducers({

    }),
    applyMiddleware(thunkMiddleware)
);
