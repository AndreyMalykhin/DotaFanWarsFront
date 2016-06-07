import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {ProgressBar, Glyphicon} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import {MATCH} from 'common/utils/tutorial-id';
import {CHARACTER_STATS} from 'match/utils/tutorial-step-index';
import TutorialStep from 'common/components/tutorial-step';

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
        const deathMsg = isDead ?
            <p><FormattedMessage id='characterStats.dead'/></p> : null;
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
            <div ref='stats'>
                {tutorialStep}
                {deathMsg}
                {!isDead && <ProgressBar now={health}/>}
                {!isDead && <p>{money} <Glyphicon glyph='usd'/></p>}
            </div>
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
