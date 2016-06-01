import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';

const ChatOutput = React.createClass({
    propTypes: {
        messages: React.PropTypes.instanceOf(Immutable.List),
        joinRequestStatus: React.PropTypes.string
    },

    render() {
        const {joinRequestStatus, messages} = this.props;
        return (
            <div>
                <Loader loaded={joinRequestStatus != PENDING}/>
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.get('id')}>
                            <strong>{msg.get('sender').get('name')}</strong>
                            : {msg.body}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const chat = state.match.get('chat');
    return {
        messages: chat.get('messages'),
        joinRequestStatus: chat.get('joinRequestStatus')
    };
}

export default connect(mapStateToProps)(ChatOutput);
