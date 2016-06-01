import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Form, FormControl, Button} from 'react-bootstrap';
import {sendMsg, setChatInputMsg} from 'chat/actions/chat-actions';

const ChatInput = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        msg: React.PropTypes.string
    },

    render() {
        const {intl, msg, onSubmit, onChange} = this.props;
        const placeholder = intl.formatMessage({id: 'chatInput.placeholder'});
        return (
            <Form onSubmit={onSubmit} inline>
                <FormControl
                    placeholder={placeholder}
                    value={msg}
                    onChange={onChange}
                    type='text'/>
                <Button type='submit'>
                    <FormattedMessage id='chatInput.send'/>
                </Button>
            </Form>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    return {
        msg: state.match.get('chat').get('inputMsg')
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
