import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Divider, Row, Spin } from 'antd';

import { userActions } from '../actions/user.actions';

export class UserDetail extends Component {
    static propTypes = {
        requesting: PropTypes.bool,
        user: PropTypes.object,
        error: PropTypes.object,
        getUser: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getUser(params.username);
    }

    render() {
        const { requesting, user, error } = this.props;

        return (
            <div id="user-detail">
                { error && <Alert message="Error" description={ error.message } type="error" showIcon closable /> }
                <Row>
                    <Col span={8} offset={8}>
                        { requesting && <Spin /> }
                        { user &&
                            <Card cover={ <img alt={ user.login } src={ user.avatar_url } /> }>
                                <Card.Meta
                                    title={ <span><a href={ user.html_url }>{ user.login }</a><small>{ `#${user.id}` }</small></span> }
                                    description={ user.html_url }
                                />
                            </Card> }
                        <Divider />
                        <Link className="ant-btn" to="/">Show All</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { requesting, user, error } = state.specificUser;
    return {
        requesting,
        user,
        error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (username) => dispatch(userActions.getByUsername(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
