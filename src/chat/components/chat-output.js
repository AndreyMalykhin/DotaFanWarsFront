import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
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
            <div>
                <Loader loaded={!isLoading}/>
                <ul style={{height: 128, overflowY: 'auto'}}>{messageViews}</ul>
            </div>
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
