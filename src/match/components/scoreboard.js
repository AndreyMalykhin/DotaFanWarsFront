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
        showTutorial: React.PropTypes.bool.isRequired
    },

    render() {
        const {teams, showTutorial, onTutorialComplete} = this.props;
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
        return (
            <Row className={styles.wrapper} ref='scoreboard'>
                {tutorialStep}
                <Col xs={12}>
                    <Well bsSize='small'>
                        <Image
                            src={team1.get('logoUrl')}
                            width={32}
                            height={32}
                            rounded/>
                        <Badge className={styles.teamScore}>
                            {team1.get('score')}
                        </Badge>
                        :
                        <Badge className={styles.teamScore}>
                            {team2.get('score')}
                        </Badge>
                        <Image
                            src={team2.get('logoUrl')}
                            width={32}
                            height={32}
                            rounded/>
                    </Well>
                </Col>
            </Row>
        );
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.scoreboard);
    }
});

function mapStateToProps(state, ownProps) {
    const {tutorials, match} = state;
    return {
        teams: match.get('teams'),
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
