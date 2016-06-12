import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Row, Col, Form, FormControl, Button, InputGroup} from 'react-bootstrap';
import {sendMsg, setChatInputMsg} from 'chat/actions/chat-actions';
import {PENDING, SUCCESS} from 'common/utils/request-status';

const ChatInput = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        isInputDisabled: React.PropTypes.bool.isRequired,
        isSendDisabled: React.PropTypes.bool.isRequired,
        msg: React.PropTypes.string
    },

    render() {
        const {intl, msg, isInputDisabled, isSendDisabled, onSubmit, onChange} =
            this.props;
        const placeholder = intl.formatMessage({id: 'chatInput.placeholder'});
        return (
            <Row>
                <Col xs={12}>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <FormControl
                                placeholder={placeholder}
                                value={msg}
                                onChange={onChange}
                                disabled={isInputDisabled}
                                type='text'/>
                            <InputGroup.Button>
                                <Button
                                    disabled={isSendDisabled}
                                    type='submit'>
                                    <FormattedMessage id='chatInput.send'/>
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const {match, requestStatuses} = state;
    const inputMsg = match.get('chat').get('inputMsg');
    const iDead = match.get('characters').get(match.get('myCharacterId'))
        .get('health') <= 0;
    const isInputDisabled =
        requestStatuses.get('match.sendMsg') == PENDING
        || requestStatuses.get('match.joinChat') != SUCCESS
        || iDead;
    return {
        msg: inputMsg,
        isInputDisabled: isInputDisabled,
        isSendDisabled: isInputDisabled || !inputMsg
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
