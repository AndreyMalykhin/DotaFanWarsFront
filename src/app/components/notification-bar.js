import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {Alert} from 'react-bootstrap';
import {removeNotification} from 'app/actions/notification-actions';
import {ERROR, INFO} from 'app/utils/notification-type';

const notificationStyles = {
    [ERROR]: 'danger',
    [INFO]: 'info'
};

const NotificationBar = React.createClass({
    render() {
        const {notifications, onNotificationClose} = this.props;
        return (
                <div style={{position: 'fixed', zIndex: 1}}>
                {notifications.map((notification) =>
                    <Alert
                        key={notification.get('id')}
                        bsStyle={notificationStyles[notification.get('type')]}
                        onDismiss={onNotificationClose.bind(this, notification.get('id'))}>
                        {notification.get('body')}
                    </Alert>
                )}
            </div>
        );
    },

    propTypes: {
        notifications: React.PropTypes.instanceOf(Immutable.List).isRequired,
        onNotificationClose: React.PropTypes.func.isRequired
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
