import styles from 'chat/styles/chat-output.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Well} from 'react-bootstrap';
import Loader from 'common/components/loader';
import {FormattedTime} from 'react-intl';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';

const ChatOutput = React.createClass({
    propTypes: {
        messages: React.PropTypes.instanceOf(Immutable.List).isRequired,
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isLoading: React.PropTypes.bool.isRequired
    },

    render() {
        const {isLoading, messages, users} = this.props;
        const messageViews = [];

        for (let msg of messages) {
            const senderId = msg.get('senderId');
            const senderName = senderId &&
                <strong>{users.get(senderId).get('nickname')}:&nbsp;</strong>;
            messageViews.push(
                <li key={msg.get('id')}>
                    [<FormattedTime value={new Date(msg.get('date'))}/>]&nbsp;
                    {senderName}
                    {msg.get('body')}
                </li>
            );
        }

        return (
            <Row>
                <Col xs={12}>
                    <Well bsSize='small' className={styles.well}>
                        <Loader isLoaded={!isLoading}/>
                        <ul className={styles.list}>{messageViews}</ul>
                    </Well>
                </Col>
            </Row>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const {match, requestStatuses} = state;
    const chat = match.get('chat');
    return {
        messages: chat.get('messages'),
        users: chat.get('users'),
        isLoading: requestStatuses.get('match.joinChat') == PENDING
    };
}

export default connect(mapStateToProps)(ChatOutput);
