import styles from 'user/styles/user-leaderboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Table, Image} from 'react-bootstrap';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import Loader from 'common/components/loader';
import {getUserLeaderboard} from 'user/actions/user-leaderboard-actions';

const UserLeaderboard = React.createClass({
    propTypes: {
        onLoad: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        users: React.PropTypes.instanceOf(Immutable.List)
    },

    render() {
        const {users, isLoading} = this.props;
        let itemsView;

        if (users) {
            itemsView = (
                <Table bordered>
                    <thead>
                        <tr>
                            <th>
                                <FormattedMessage id='userLeaderboard.rank'/>
                            </th>
                            <th>
                                <FormattedMessage id='userLeaderboard.player'/>
                            </th>
                            <th>
                                <FormattedMessage id='userLeaderboard.rating'/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, rank) => (
                            <tr key={user.get('id')}>
                                <td>{rank + 1}</td>
                                <td>
                                    <Image
                                        src={user.get('country').get('flagUrl')}
                                        width={16}
                                        height={16}/>
                                    &nbsp;{user.get('nickname')}
                                </td>
                                <td>{user.get('rating')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        }

        return (
            <Row>
                <Col xs={12}>
                    <Loader isLoaded={!isLoading}/>
                    {itemsView}
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        this.props.onLoad();
    }
});

function mapStateToProps(state, ownProps) {
    const {userLeaderboard, requestStatuses} = state;
    return {
        users: userLeaderboard.get('items'),
        isLoading: requestStatuses.get('lobby.getUserLeaderboard') == PENDING
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLoad() {
            dispatch(getUserLeaderboard());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLeaderboard);
