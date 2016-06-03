import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';

const ChatOutput = React.createClass({
    propTypes: {
        messages: React.PropTypes.instanceOf(Immutable.List).isRequired,
        joinRequestStatus: React.PropTypes.string
    },

    render() {
        const {joinRequestStatus, messages} = this.props;
        return (
            <div>
                <Loader loaded={joinRequestStatus != PENDING}/>
                <ul style={{height: 128}}>
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
    const {match, requestStatuses} = state;
    return {
        messages: match.get('chat').get('messages'),
        joinRequestStatus: requestStatuses.get('match.joinChat')
    };
}

export default connect(mapStateToProps)(ChatOutput);
