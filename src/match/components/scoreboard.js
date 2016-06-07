import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Image, Badge} from 'react-bootstrap';
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

        return (
            <Row ref='scoreboard'>
                {tutorialStep}
                {this._renderTeam(teams.first())}
                {this._renderTeam(teams.last(), 'flipped')}
            </Row>
        );
    },

    _renderTeam(team, extraClass = null) {
        return (
            <Col xs={6} className={extraClass}>
                <Image src={team.get('logoUrl')} width={32} height={32}/>
                <span>{team.get('name')}</span>
                <Badge>{team.get('score')}</Badge>
            </Col>
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
