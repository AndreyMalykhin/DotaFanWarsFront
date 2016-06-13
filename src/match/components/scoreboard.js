import styles from 'match/styles/scoreboard.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Image, Badge, Well} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import {MATCH} from 'common/utils/tutorial-id';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import {SCOREBOARD} from 'match/utils/tutorial-step-index';
import TutorialStep from 'common/components/tutorial-step';

const Scoreboard = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        teams: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
        showTutorial: React.PropTypes.bool.isRequired,
        myTeamId: React.PropTypes.string.isRequired
    },

    render() {
        const {myTeamId, teams, showTutorial, onTutorialComplete} = this.props;
        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='bottom'>
                    <FormattedMessage id='scoreboard.tutorial'/>
                </TutorialStep>
            );
        }

        const team1 = teams.first();
        const team2 = teams.last();
        let team1Class;
        let team2Class;

        if (team1.get('id') != myTeamId) {
            team1Class = styles.enemy;
        } else {
            team2Class = styles.enemy;
        }

        return (
            <Col
                xs={12}
                sm={6}
                className={styles.wrapper}>
                {tutorialStep}
                <Well bsSize='small' className={styles.well} ref='well'>
                    <span className={team1Class}>
                        <Image
                            src={team1.get('logoUrl')}
                            width={32}
                            height={32}
                            rounded/>
                        <Badge className={styles.teamScore}>
                            {team1.get('score')}
                        </Badge>
                    </span>
                    :
                    <span className={team2Class}>
                        <Badge className={styles.teamScore}>
                            {team2.get('score')}
                        </Badge>
                        <Image
                            src={team2.get('logoUrl')}
                            width={32}
                            height={32}
                            rounded/>
                    </span>
                </Well>
            </Col>
        );
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.well);
    }
});

function mapStateToProps(state, ownProps) {
    const {tutorials, match} = state;
    const myTeamId = match.get('characters').get(match.get('myCharacterId'))
        .get('teamId');
    return {
        teams: match.get('teams'),
        myTeamId: myTeamId,
        showTutorial: tutorials.get(MATCH).get('step') === SCOREBOARD
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onTutorialComplete() {
            dispatch(nextTutorialStep(MATCH));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
