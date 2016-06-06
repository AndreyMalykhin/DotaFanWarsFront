import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {NavDropdown, MenuItem, Navbar, Nav, NavItem, Row, Col} from
    'react-bootstrap';
import {Link} from 'react-router';
import Immutable from 'immutable';
import MainMenu from 'app/components/main-menu';
import {PENDING} from 'common/utils/request-status';
import {setLocale} from 'common/actions/locale-actions';
import {toggleToolbar} from 'app/actions/toolbar-actions';

const Toolbar = React.createClass({
    render() {
        const {
            locale,
            intl,
            isLoggedIn,
            isExpanded,
            localeRequestStatus,
            supportedLocales,
            onLocaleSelect,
            onMainMenuItemSelect,
            onToggle
        } = this.props;
        const currentLocaleName = intl.formatMessage(
            {id: `locale.${locale}`});

        return (
            <Navbar expanded={isExpanded} onToggle={onToggle}>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to='/'>
                        <FormattedMessage id='toolbar.appTitle'/>
                    </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <MainMenu
                        isLoggedIn={isLoggedIn}
                        onItemSelect={onMainMenuItemSelect}/>
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
                                    <FormattedMessage id={`locale.${supportedLocale}`}/>
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
        onMainMenuItemSelect: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        isLoggedIn: React.PropTypes.bool.isRequired,
        isExpanded: React.PropTypes.bool.isRequired,
        localeRequestStatus: React.PropTypes.string
    }
});

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.auth.get('isLoggedIn'),
        supportedLocales: state.supportedLocales,
        locale: state.locale.get('id'),
        localeRequestStatus: state.locale.get('requestStatus'),
        isExpanded: state.toolbar.get('isExpanded')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLocaleSelect(locale) {
            dispatch(setLocale(locale));
        },
        onMainMenuItemSelect() {
            dispatch(toggleToolbar(false));
        },
        onToggle(isExpanded) {
            dispatch(toggleToolbar(isExpanded));
        }
    };
}

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(Toolbar));
