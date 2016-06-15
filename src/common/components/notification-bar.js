import styles from 'common/styles/notification-bar.scss';
import React from 'react';
import {connect} from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Immutable from 'immutable';
import {Alert} from 'react-bootstrap';
import {removeNotification} from 'common/actions/notification-actions';
import {ERROR, INFO} from 'common/utils/notification-type';

const notificationStyles = {[ERROR]: 'danger', [INFO]: 'info'};

const NotificationBar = React.createClass({
    propTypes: {
        notifications: React.PropTypes.instanceOf(Immutable.List).isRequired,
        onNotificationClose: React.PropTypes.func.isRequired
    },

    render() {
        const {notifications, onNotificationClose} = this.props;
        const transitionName = {
            enter: styles.listItemEnterAnim,
            leave: styles.listItemLeaveAnim
        };
        return (
            <CSSTransitionGroup
                className={styles.list}
                component='ul'
                transitionName={transitionName}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {notifications.map((notification) => (
                    <li key={notification.get('id')}>
                        <Alert
                            className={styles.listItem}
                            bsStyle={notificationStyles[notification.get('type')]}
                            onDismiss={onNotificationClose.bind(this, notification.get('id'))}>
                            {notification.get('body')}
                        </Alert>
                    </li>
                ))}
            </CSSTransitionGroup>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {notifications: state.notifications};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onNotificationClose(id) {
            dispatch(removeNotification(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
