import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import Immutable from 'immutable';
import {touchCharacter} from 'match/actions/character-actions';
import {takeSeat} from 'match/actions/seat-actions';
import Character from 'match/components/character';
import Seat from 'match/components/seat';
import {CHARACTERS} from 'match/utils/tutorial-step-index';
import TutorialStep from 'common/components/tutorial-step';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import {PENDING} from 'common/utils/request-status';

const Seats = React.createClass({
    propTypes: {
        onCharacterClick: React.PropTypes.func.isRequired,
        onSeatClick: React.PropTypes.func.isRequired,
        onTutorialComplete: React.PropTypes.func.isRequired,
        seats: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        characters: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        showTutorial: React.PropTypes.bool.isRequired,
        iSit: React.PropTypes.bool.isRequired,
        myTeamId: React.PropTypes.string.isRequired,
        myCharacterId: React.PropTypes.string.isRequired,
        myTargetId: React.PropTypes.string,
        takeSeatRequestStatus: React.PropTypes.string,
        useOffensiveItemRequestStatus: React.PropTypes.string
    },

    render() {
        const {
            seats,
            characters,
            myTargetId,
            myTeamId,
            myCharacterId,
            showTutorial,
            iSit,
            takeSeatRequestStatus,
            useOffensiveItemRequestStatus,
            onCharacterClick,
            onSeatClick,
            onTutorialComplete
        } = this.props;
        const rows = [];

        for (let row = 0, seatId = 1; row < 4; ++row) {
            const columns = [];

            for (let column = 0; column < 8; ++column, ++seatId) {
                const seat = seats.get(String(seatId));
                let character;

                if (seat) {
                    const characterId = seat.get('characterId');
                    const characterModel = characters.get(characterId);

                    if (characterModel) {
                        const isEnemy =
                            characterModel.get('teamId') != myTeamId;
                        const photoUrl =
                            characterModel.get('user').get('photoUrl');
                        const isMe = myCharacterId == characterId;
                        const health = characterModel.get('health');
                        const isDisabled = isMe || health <= 0 ||
                            useOffensiveItemRequestStatus == PENDING;
                        character = (
                            <Character
                                ref={`character_${characterId}`}
                                id={characterId}
                                health={health}
                                photoUrl={photoUrl}
                                isSelected={characterId == myTargetId}
                                isEnemy={isEnemy}
                                isDisabled={isDisabled}
                                onClick={onCharacterClick}/>
                        );
                    }
                }

                const iCanTake = !iSit && !character;
                columns.push(
                    <Seat
                        key={seatId}
                        id={String(seatId)}
                        isDisabled={takeSeatRequestStatus == PENDING}
                        onClick={iCanTake ? onSeatClick : null}>
                        {character}
                    </Seat>
                );
            }

            rows.push(<tr key={row}>{columns}</tr>);
        }

        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='top'
                    isCompleted={false}>
                    <FormattedMessage id='matchTutorial.charactersStep'/>
                </TutorialStep>
            );
        }

        return (
            <div>
                {tutorialStep}
                <Table ref='seats' bordered><tbody>{rows}</tbody></Table>
            </div>
        );
    },

    getCharacter(id) {
        return this.refs[`character_${id}`];
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.seats);
    }
});

function mapStateToProps(state, ownProps) {
    const {match, requestStatuses} = state;
    const myCharacter =
        match.get('characters').get(match.get('myCharacterId'));
    return {
        seats: match.get('seats'),
        characters: match.get('characters'),
        myTargetId: myCharacter.get('targetId'),
        myTeamId: myCharacter.get('teamId'),
        myCharacterId: myCharacter.get('id'),
        iSit: myCharacter.get('seatId') != null,
        showTutorial: match.get('tutorialStep') === CHARACTERS,
        takeSeatRequestStatus: requestStatuses.get('match.takeSeat'),
        useOffensiveItemRequestStatus:
            requestStatuses.get('match.useOffensiveItem')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onCharacterClick(characterId) {
            dispatch(touchCharacter(characterId));
        },
        onSeatClick(seatId) {
            dispatch(takeSeat(seatId));
        },
        onTutorialComplete() {
            dispatch(nextTutorialStep());
        }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps, undefined, {withRef: true})(Seats);
