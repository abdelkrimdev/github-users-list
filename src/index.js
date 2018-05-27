import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import { store } from './helpers/store';
import UsersList from './containers/UsersList';
import UserDetail from './containers/UserDetail';

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ UsersList } />
                <Route path='/user/:username' component={ UserDetail } />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
