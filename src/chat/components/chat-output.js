import styles from 'chat/styles/chat-output.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Well} from 'react-bootstrap';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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
                        <CSSTransitionGroup
                            ref='list'
                            component='ul'
                            className={styles.list}
                            transitionName={{enter: styles.listItemEnterAnim}}
                            transitionEnterTimeout={1000}
                            transitionLeave={false}
                        >
                            {messageViews}
                        </CSSTransitionGroup>
                    </Well>
                </Col>
            </Row>
        );
    },

    componentDidUpdate() {
        const list = ReactDOM.findDOMNode(this.refs.list);
        list.scrollTop = list.scrollHeight;
    }
});

function mapStateToProps(state) {
    const {match, requestStatuses} = state;
    const chat = match.get('chat');
    return {
        messages: chat.get('messages'),
        users: chat.get('users'),
        isLoading: requestStatuses.get('match.joinChat') == PENDING
    };
}

export default connect(mapStateToProps)(ChatOutput);
