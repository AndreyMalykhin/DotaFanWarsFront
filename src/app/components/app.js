import 'app/styles/app.scss';
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import Immutable from 'immutable';

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
                {children}
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
