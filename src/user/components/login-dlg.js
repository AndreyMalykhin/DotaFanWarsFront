import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Loader from 'react-loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {closeLoginDlg, loginViaProvider} from 'user/actions/auth-actions';

const LoginDlg = React.createClass({
    render() {
        const {
            isOpen,
            loginRequestStatus,
            providers,
            onClose,
            onProviderBtnClick
        } = this.props;
        const isRequestPending = loginRequestStatus == PENDING;
        const isDisabled = isRequestPending;

        return (
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id='loginDlg.title'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Loader loaded={!isRequestPending}/>
                    {providers.map((provider) =>
                        <Button
                            disabled={isDisabled}
                            onClick={onProviderBtnClick.bind(this, provider)}
                            key={provider}>
                            <FormattedMessage id={`loginDlg.${provider}`}/>
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        );
    },

    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onProviderBtnClick: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        loginRequestStatus: React.PropTypes.string,
        providers: React.PropTypes.instanceOf(Immutable.List)
    }
});

function mapStateToProps(state, ownProps) {
    return {
        isOpen: state.auth.get('isLoginDlgOpened'),
        loginRequestStatus: state.auth.get('loginRequestStatus'),
        providers: state.auth.get('providers')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(closeLoginDlg());
        },
        onProviderBtnClick(provider) {
            dispatch(loginViaProvider(provider));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDlg);
