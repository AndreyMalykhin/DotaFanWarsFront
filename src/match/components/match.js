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

const Match = React.createClass({
    propTypes: {
        onLeave: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <Grid fluid>
                <TargetInfo onGetTargetNode={this._onGetTargetNode}/>
                <Projectiles onGetTargetNode={this._onGetTargetNode}/>
                <MatchResultDlg/>
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

    componentWillUnmount() {
        this.props.onLeave();
    },

    _onGetTargetNode(targetId) {
        return ReactDOM.findDOMNode(
            this.refs.seats.getWrappedInstance().getCharacter(targetId));
    }
});

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLeave() {
            dispatch(leaveMatch());
        }
    };
}

export default connect(undefined, mapDispatchToProps)(Match);
