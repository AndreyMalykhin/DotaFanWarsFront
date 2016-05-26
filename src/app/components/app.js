import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {Grid} from 'react-bootstrap';
import Immutable from 'immutable';
import LoginDlg from 'user/components/login-dlg';
import Toolbar from 'app/components/toolbar';
import Footer from 'app/components/footer';
import NotificationBar from 'app/components/notification-bar';

const App = React.createClass({
    render() {
        const {translations, locale, isLoggedIn, children} = this.props;

        // see https://github.com/yahoo/react-intl/issues/243
        // for <IntlProvider> 'key' prop

        return (
            <IntlProvider
                key={locale}
                locale={locale}
                messages={translations.toObject()}>
                <div>
                    <Toolbar/>
                    <Grid fluid>
                        <NotificationBar/>
                        <LoginDlg/>
                        {children}
                        <Footer/>
                    </Grid>
                </div>
            </IntlProvider>
        );
    },

    propTypes: {
        locale: React.PropTypes.string.isRequired,
        translations: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isLoggedIn: React.PropTypes.bool.isRequired
    }
});

function mapStateToProps(state, ownProps) {
    return {
        locale: state.locale.get('id'),
        translations: state.locale.get('translations'),
        isLoggedIn: state.auth.get('isLoggedIn')
    };
}

export default connect(mapStateToProps)(App);
