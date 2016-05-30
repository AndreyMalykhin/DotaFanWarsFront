import React from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col} from 'react-bootstrap';
import Immutable from 'immutable';
import {touchCharacter} from 'character/actions/character-actions';
import {takeSeat} from 'match/actions/seat-actions';
import Character from 'character/components/character';

const rowCount = 4;
const columnCount = 8;

const Seats = React.createClass({
    propTypes: {
        onCharacterClick: React.PropTypes.func.isRequired,
        onSeatClick: React.PropTypes.func.isRequired,
        seats: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        characters: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        myTargetId: React.PropTypes.string,
        myTeamId: React.PropTypes.string
    },

    render() {
        const {
            seats,
            characters,
            myTargetId,
            myTeamId,
            onCharacterClick,
            onSeatClick
        } = this.props;
        const rows = [];

        for (let row = 0, seatId = 1; row < rowCount; ++row) {
            const columns = [];

            for (let column = 0; column < columnCount; ++column, ++seatId) {
                const characterId =
                    seats.get(String(seatId)).get('characterId');
                const characterModel = characters.get(characterId);
                let character;

                if (characterModel) {
                    character = (
                        <Character
                            id={characterModel.get('id')}
                            health={characterModel.get('health')}
                            photoUrl={characterModel.get('photoUrl')}
                            isSelected={characterId == myTargetId}
                            isEnemy={characterModel.get('teamId') != myTeamId}
                            onClick={onCharacterClick}/>
                    );
                }

                columns.push(
                    <td key={seatId} onClick={onSeatClick.bind(this, seatId)}>
                        {character}
                    </td>
                );
            }

            rows.push(<tr>{columns}</tr>);
        }

        return (
            <Row>
                <Col xs={12}>
                    <Table bordered><tbody>{rows}</tbody></Table>
                </Col>
            </Row>
        );
    }
});

function mapStateToProps(state, ownProps) {
    const match = state.match;
    const myCharacter =
        match.get('characters').get(match.get('myCharacterId'));
    return {
        seats: match.get('seats'),
        characters: match.get('characters'),
        myTargetId: myCharacter.get('targetId'),
        myTeamId: myCharacter.get('teamId')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onCharacterClick(characterId) {
            dispatch(touchCharacter(characterId));
        },
        onSeatClick(seatId) {
            dispatch(takeSeat(seatId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
