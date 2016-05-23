import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {NavDropdown, MenuItem, Navbar, Nav, NavItem, Row, Col} from
    'react-bootstrap';
import {Link} from 'react-router';
import Immutable from 'immutable';
import MainMenu from 'app/components/main-menu';
import {PENDING} from 'common/utils/request-status';
import {setLocale} from 'app/actions/locale-actions';

const Toolbar = React.createClass({
    render() {
        const {
            locale,
            intl,
            isAuthed,
            localeRequestStatus,
            supportedLocales,
            onLocaleSelect
        } = this.props;
        const currentLocaleName = intl.formatMessage(
            {id: `localeSelector.${locale}`});

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to='/'>
                        <FormattedMessage id='toolbar.appTitle'/>
                    </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <MainMenu isAuthed={isAuthed}/>
                    <Nav pullRight>
                        <NavDropdown
                            disabled={localeRequestStatus == PENDING}
                            onSelect={onLocaleSelect}
                            title={currentLocaleName}
                            id=''>
                            {supportedLocales.map((supportedLocale) =>
                                <MenuItem
                                    key={supportedLocale}
                                    eventKey={supportedLocale}
                                    active={supportedLocale == locale}>
                                    <FormattedMessage id={`localeSelector.${supportedLocale}`}/>
                                </MenuItem>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    },

    propTypes: {
        locale: React.PropTypes.string.isRequired,
        supportedLocales:
            React.PropTypes.instanceOf(Immutable.List).isRequired,
        onLocaleSelect: React.PropTypes.func.isRequired,
        localeRequestStatus: React.PropTypes.string.isRequired,
        isAuthed: React.PropTypes.bool.isRequired
    }
});

function mapStateToProps(state, ownProps) {
    return {
        isAuthed: state.auth.get('isAuthed'),
        locale: state.locale.get('id'),
        supportedLocales: state.supportedLocales,
        localeRequestStatus: state.locale.get('requestStatus')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLocaleSelect(locale) {
            dispatch(setLocale(locale));
        }
    };
}

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(Toolbar));
