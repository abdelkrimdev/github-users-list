import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Avatar, BackTop, Button, List, Spin } from 'antd';

import { userActions } from '../actions/user.actions';

export class UsersList extends Component {
    static propTypes = {
        requesting: PropTypes.bool,
        users: PropTypes.array,
        error: PropTypes.object,
        loadUsers: PropTypes.func.isRequired,
        unloadUsers: PropTypes.func.isRequired
    }

    state = {
      loadingMore: false,
      showLoadingMore: true
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    onLoadMore = () => {
        const latestUser = this.props.users.slice(-1)[0];
        this.props.loadUsers(latestUser.id);
    }

    componentWillUnmount() {
        this.props.unloadUsers();
    }

    render() {
        const { requesting, users, error } = this.props;
        const { loadingMore, showLoadingMore } = this.state;

        return (
            <div id="users-list">
                { error && <Alert message="Error" description={ error.message } type="error" showIcon closable /> }
                <div className="title-bar">
                    <h1>GitHub's Users List</h1>
                </div>
                <BackTop />
                <List
                    loading={ requesting }
                    size="large"
                    itemLayout="horizontal"
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                    loadMore={ 
                        showLoadingMore ? (
                            <div className="show-more">
                                { loadingMore && <Spin /> }
                                { !loadingMore && <Button onClick={ this.onLoadMore }>loading more</Button> }
                            </div>
                        ) : null
                    }
                    dataSource={ users }
                    renderItem={ user => (
                        <List.Item actions={ [ <Link className="ant-btn" to={ `/user/${user.login}` }>details</Link> ] }>
                            <List.Item.Meta
                                avatar={ <Avatar size="large" src={ user.avatar_url } /> }
                                title={ user.login }
                                description={ user.type }
                            />
                        </List.Item>
                    ) }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { requesting, users, error } = state.allUsers;
    return {
        requesting,
        users,
        error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: (since = 0) => dispatch(userActions.getAll(since)),
        unloadUsers: () => dispatch(userActions.unloadAll())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
