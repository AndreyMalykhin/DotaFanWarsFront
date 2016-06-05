import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Form, FormControl, Button} from 'react-bootstrap';
import {sendMsg, setChatInputMsg} from 'chat/actions/chat-actions';
import {PENDING} from 'common/utils/request-status';

const ChatInput = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        msg: React.PropTypes.string
    },

    render() {
        const {intl, msg, isDisabled, onSubmit, onChange} = this.props;
        const placeholder = intl.formatMessage({id: 'chatInput.placeholder'});
        return (
            <Form onSubmit={onSubmit} inline>
                <FormControl
                    placeholder={placeholder}
                    value={msg}
                    onChange={onChange}
                    type='text'/>
                <Button disabled={isDisabled} type='submit'>
                    <FormattedMessage id='chatInput.send'/>
                </Button>
            </Form>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const {match, requestStatuses} = state;
    const inputMsg = match.get('chat').get('inputMsg');
    const iDead = match.get('characters').get(match.get('myCharacterId'))
        .get('health') <= 0;
    const isDisabled =
        requestStatuses.get('match.sendMsg') == PENDING
        || !inputMsg
        || iDead;
    return {
        msg: inputMsg,
        isDisabled: isDisabled
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit(event) {
            event.preventDefault();
            dispatch(sendMsg());
        },
        onChange(event) {
            dispatch(setChatInputMsg(event.target.value));
        }
    };
}

export default
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChatInput));
