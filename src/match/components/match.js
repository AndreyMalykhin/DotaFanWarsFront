import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {leaveMatch} from 'match/actions/match-actions';
import Scoreboard from 'match/components/scoreboard';
import Seats from 'match/components/seats';
import CharacterStats from 'character/components/character-stats';
import CharacterInventory from 'character/components/character-inventory';
import ChatInput from 'chat/components/chat-input';
import ChatOutput from 'chat/components/chat-output';

const Match = React.createClass({
    propTypes: {
        onLeave: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <Grid fluid>
                <Scoreboard/>
                <ChatOutput/>
                <Seats/>
                <Row>
                    <Col xs={6}>
                        <CharacterStats/>
                    </Col>
                    <Col xs={6}>
                        <CharacterInventory/>
                    </Col>
                </Row>
                <ChatInput/>
            </Grid>
        );
    },

    componentWillUnmount() {
        this.props.onLeave();
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
