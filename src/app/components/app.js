import styles from 'app/styles/app.scss';
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import Immutable from 'immutable';
import ValueChangeAnimator from 'common/components/value-change-animator';

const App = React.createClass({
    propTypes: {
        locale: React.PropTypes.string.isRequired,
        translations: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isLoggedIn: React.PropTypes.bool.isRequired
    },

    render() {
        const {translations, locale, isLoggedIn, children, location} =
            this.props;

        // see https://github.com/yahoo/react-intl/issues/243
        // for <IntlProvider> 'key' prop
        return (
            <IntlProvider
                key={locale}
                locale={locale}
                messages={translations.toObject()}>
                <ValueChangeAnimator
                    className={styles.contentChangeAnim}
                    value={location.pathname}>
                    {children}
                </ValueChangeAnimator>
            </IntlProvider>
        );
    }
});

function mapStateToProps(state, ownProps) {
    const {locale, auth} = state;
    return {
        locale: locale.get('id'),
        translations: locale.get('translations'),
        isLoggedIn: auth.get('isLoggedIn')
    };
}

export default connect(mapStateToProps)(App);
