import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers/store'

ReactDOM.render(
    <Provider store={ store }>
        <div>Hello Advanon!</div>
    </Provider>,
    document.getElementById('root')
);
