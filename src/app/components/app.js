import styles from 'app/styles/app.scss';
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Immutable from 'immutable';

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
                <CSSTransitionGroup
                    className={styles.wrapper}
                    component='div'
                    transitionName={{enter: styles.contentEnterAnim}}
                    transitionEnterTimeout={1000}
                    transitionLeave={false}>
                    {React.cloneElement(children, {key: location.pathname})}
                </CSSTransitionGroup>
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
