import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallow } from 'enzyme';

import UserDetail from './UserDetail';
import { userActions } from '../actions/user.actions';

describe('User Detail Component.', () => {
    let store;
    let wrapper;
    const username = 'someone';
    const match = { params: { username } };

    beforeEach(() => {
        store = createMockStore({
            specificUser: {}
        });
        wrapper = shallow(<UserDetail store={ store } match={ match } />).dive();
    });

    it('should be defined.', () => {
        expect(UserDetail).toBeDefined();
    });

    it('should render correctly.', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch get user action on user load the page.', () => {
        const expectedActions = [
            userActions.getByUsername(username)
        ];
        expect(store.isActionDispatched(userActions.getByUsername(username))).toBeTruthy();
    });

    it('should render a ​loading​ ​spinner on fetching the user data.', () => {
        store = createMockStore({
            specificUser: { requesting: true }
        });
        wrapper = shallow(<UserDetail store={ store } match={ match } />).dive();
        expect(wrapper.find('Spin')).toHaveLength(1);
    });

    it('should render a ​Card displaying the user data.', () => {
        store = createMockStore({
            specificUser: {
                user: { "id": 0, "login": username, "avatar_url": "", "html_url": "" }
            }
        });
        wrapper = shallow(<UserDetail store={ store } match={ match } />).dive();
        expect(wrapper.find('Card')).toHaveLength(1);
    });

    it('should render a Link to​ ​go​ ​back​ ​to​ ​the​ ​initial​ ​list.', () => {
        expect(wrapper.find('Link')).toHaveLength(1);
    });
});
