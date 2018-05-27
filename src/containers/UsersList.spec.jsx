import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallow } from 'enzyme';

import UsersList from './UsersList';
import { userActions } from '../actions/user.actions';

describe('Users List Component.', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = createMockStore({
            allUsers: {}
        });
        wrapper = shallow(<UsersList store={ store } />).dive();
    });

    it('should be defined.', () => {
        expect(UsersList).toBeDefined();
    });

    it('should render correctly.', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch load users action on user opens the page.', () => {
        const expectedActions = [
            userActions.getAll()
        ];
        expect(store.isActionDispatched(userActions.getAll())).toBeTruthy();
    });

    it('should render a title for the page.', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
    });

    it('should render the BackTop component.', () => {
        expect(wrapper.find('BackTop')).toHaveLength(1);
    });

    it('should render a List component.', () => {
        expect(wrapper.find('List')).toHaveLength(1);
    });

    it('should unload users on user leaves the page.', () => {
        const expectedActions = [
            userActions.unloadAll()
        ];
        wrapper.unmount();
        expect(store.getActions()).toEqual(jasmine.arrayContaining(expectedActions));
    });
});
