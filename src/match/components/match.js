import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {leaveMatch} from 'match/actions/match-actions';
import Scoreboard from 'match/components/scoreboard';
import Seats from 'match/components/seats';
import MatchResultDlg from 'match/components/match-result-dlg';
import Items from 'match/components/items';
import Projectiles from 'match/components/projectiles';
import CharacterStats from 'match/components/character-stats';
import TargetInfo from 'match/components/target-info';
import ChatInput from 'chat/components/chat-input';
import ChatOutput from 'chat/components/chat-output';
import {ensureTutorial} from 'common/actions/tutorial-actions';
import {MATCH} from 'common/utils/tutorial-id';
import NotificationBar from 'common/components/notification-bar';

const Match = React.createClass({
    propTypes: {
        onLeave: React.PropTypes.func.isRequired,
        onReadyForTutorial: React.PropTypes.func.isRequired,
        iHaveTarget: React.PropTypes.bool.isRequired,
        isMatchEnded: React.PropTypes.bool.isRequired
    },

    _tutorialTimeoutId: null,

    render() {
        const {iHaveTarget, isMatchEnded} = this.props;
        const targetInfo = iHaveTarget &&
            <TargetInfo onGetTargetNode={this._onGetTargetNode}/>;
        return (
            <Grid fluid>
                <NotificationBar/>
                {targetInfo}
                <Projectiles onGetTargetNode={this._onGetTargetNode}/>
                {isMatchEnded && <MatchResultDlg/>}
                <Scoreboard/>
                <Row><Col xs={12}><ChatOutput/></Col></Row>
                <Row><Col xs={12}><Seats ref='seats'/></Col></Row>
                <Row>
                    <Col xs={6}><CharacterStats/></Col>
                    <Col xs={6}><Items ref='items'/></Col>
                </Row>
                <Row><Col xs={12}><ChatInput/></Col></Row>
            </Grid>
        );
    },

    componentDidMount() {
        this._tutorialTimeoutId =
            setTimeout(this.props.onReadyForTutorial, 2000);
    },

    componentWillUnmount() {
        clearTimeout(this._tutorialTimeoutId);
        this.props.onLeave();
    },

    _onGetTargetNode(targetId) {
        return ReactDOM.findDOMNode(
            this.refs.seats.getWrappedInstance().getCharacter(targetId));
    }
});

function mapStateToProps(state, ownProps) {
    const match = state.match;
    return {
        iHaveTarget: match.get('characters').get(match.get('myCharacterId'))
            .get('targetId') != null,
        isMatchEnded: match.get('result') != null
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLeave() {
            dispatch(leaveMatch());
        },
        onReadyForTutorial() {
            dispatch(ensureTutorial(MATCH));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
