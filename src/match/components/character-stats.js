import styles from 'match/styles/character-stats.scss';
import MoneyIcon from 'match/images/money.svg';
import HealthIcon from 'match/images/health.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Col, Well} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import ValueChangeAnimator from 'common/components/value-change-animator';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import {MATCH} from 'common/utils/tutorial-id';
import {CHARACTER_STATS} from 'match/utils/tutorial-step-index';
import TutorialStep from 'common/components/tutorial-step';
import Icon from 'common/components/icon';


const CharacterStats = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        health: React.PropTypes.number.isRequired,
        money: React.PropTypes.number.isRequired,
        showTutorial: React.PropTypes.bool.isRequired
    },

    render() {
        const {health, money, showTutorial, onTutorialComplete} = this.props;
        let content;
        const iconSize = 32;
        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='bottom'>
                    <FormattedMessage id='characterStats.tutorial'/>
                </TutorialStep>
            );
        }

        return (
            <Well ref='wrapper' className={styles.wrapper} bsSize='small'>
                {tutorialStep}
                <ul className={styles.list}>
                    {this._renderStat(health, HealthIcon, styles.healthIcon)}
                    {this._renderStat(money, MoneyIcon, styles.moneyIcon)}
                </ul>
            </Well>
        );
    },

    _renderStat(value, icon, iconClass) {
        return (
            <li className={styles.listItem}>
                <Icon
                    className={iconClass}
                    glyph={icon}
                    width={32}
                    height={32}/>
                <ValueChangeAnimator
                    className={styles.valueChangeAnim}
                    value={value}>
                    <span className={styles.value}>{value}</span>
                </ValueChangeAnimator>
            </li>
        );
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.wrapper);
    }
});

function mapStateToProps(state, ownProps) {
    const {tutorials, match} = state;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        health: myCharacter.get('health'),
        money: myCharacter.get('money'),
        showTutorial: tutorials.get(MATCH).get('step') === CHARACTER_STATS
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onTutorialComplete() {
            dispatch(nextTutorialStep(MATCH));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats);
