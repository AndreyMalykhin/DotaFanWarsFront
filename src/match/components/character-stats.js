import styles from 'match/styles/character-stats.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Col, Well} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import {MATCH} from 'common/utils/tutorial-id';
import {CHARACTER_STATS} from 'match/utils/tutorial-step-index';
import TutorialStep from 'common/components/tutorial-step';
import Icon from 'common/components/icon';
import MoneyIcon from 'match/images/money.svg';
import HealthIcon from 'match/images/health.svg';

const CharacterStats = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        health: React.PropTypes.number.isRequired,
        money: React.PropTypes.number.isRequired,
        showTutorial: React.PropTypes.bool.isRequired
    },

    render() {
        const {health, money, showTutorial, onTutorialComplete} = this.props;
        const isDead = health <= 0;
        let content;
        const iconSize = 32;

        if (isDead) {
            content = <p><FormattedMessage id='characterStats.dead'/></p>;
        } else {
            content = (
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Icon
                            className={styles.healthIcon}
                            glyph={HealthIcon}
                            width={iconSize}
                            height={iconSize}/>
                        {health}
                    </li>
                    <li className={styles.listItem}>
                        <Icon
                            className={styles.moneyIcon}
                            glyph={MoneyIcon}
                            width={iconSize}
                            height={iconSize}/>
                        {money}
                    </li>
                </ul>
            );
        }

        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='top'>
                    <FormattedMessage id='characterStats.tutorial'/>
                </TutorialStep>
            );
        }

        return (
            <Well ref='stats' className={styles.wrapper} bsSize='small'>
                {tutorialStep}{content}
            </Well>
        );
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.stats);
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
