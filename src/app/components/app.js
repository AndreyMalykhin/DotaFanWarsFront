import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {Grid} from 'react-bootstrap';
import Immutable from 'immutable';
import LoginDlg from 'user/components/login-dlg';
import Toolbar from 'app/components/toolbar';
import Footer from 'app/components/footer';

const App = React.createClass({
    render() {
        const {translations, locale, isAuthed} = this.props;

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
                        {isAuthed ? null : <LoginDlg/>}
                        {this.props.children}
                        <Footer/>
                    </Grid>
                </div>
            </IntlProvider>
        );
    },

    propTypes: {
        locale: React.PropTypes.string.isRequired,
        translations: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isAuthed: React.PropTypes.bool.isRequired
    }
});

function mapStateToProps(state, ownProps) {
    return {
        locale: state.locale.get('id'),
        translations: state.locale.get('translations'),
        isAuthed: state.auth.get('isAuthed')
    };
}

export default connect(mapStateToProps)(App);
