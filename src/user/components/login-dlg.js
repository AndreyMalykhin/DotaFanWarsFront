import styles from 'user/styles/login-dlg.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Loader from 'common/components/loader';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {closeLoginDlg, loginViaProvider} from 'user/actions/auth-actions';
import Icon from 'common/components/icon';

const Header = Modal.Header;
const Body = Modal.Body;
const Title = Modal.Title;

const LoginDlg = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onProviderBtnClick: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        providers: React.PropTypes.instanceOf(Immutable.List).isRequired
    },

    render() {
        const {
            isOpen,
            isDisabled,
            isLoading,
            providers,
            onClose,
            onProviderBtnClick
        } = this.props;
        return (
            <Modal show={isOpen} onHide={onClose} className={styles.wrapper}>
                <Header closeButton>
                    <Title>
                        <FormattedMessage id='loginDlg.title'/>
                    </Title>
                </Header>
                <Body>
                    <Loader isLoaded={!isLoading}/>
                    {providers.map((provider) => (
                        <Button
                            className={styles.providerBtn}
                            disabled={isDisabled}
                            onClick={onProviderBtnClick.bind(this, provider.get('id'))}
                            key={provider.get('id')}
                            block>
                            <Icon
                                className={styles.providerImg}
                                glyph={provider.get('logo')}
                                width={24}
                                height={24}/>
                            <FormattedMessage
                                id={`loginDlg.${provider.get('id')}`}/>
                        </Button>
                    ))}
                </Body>
            </Modal>
        );
    }
});

function mapStateToProps(state, ownProps) {
    const {requestStatuses, auth} = state;
    const isLoading = requestStatuses.get('lobby.login') == PENDING;
    return {
        isOpen: auth.get('isLoginDlgOpened'),
        isLoading: isLoading,
        isDisabled: isLoading,
        providers: auth.get('providers')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(closeLoginDlg());
        },
        onProviderBtnClick(providerId) {
            dispatch(loginViaProvider(providerId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDlg);
