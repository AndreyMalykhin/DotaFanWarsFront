import React from 'react';
import {connect} from 'react-redux';
import {ProgressBar, Glyphicon} from 'react-bootstrap';

const CharacterStats = React.createClass({
    propTypes: {
        health: React.PropTypes.number.isRequired,
        money: React.PropTypes.number.isRequired
    },

    render() {
        const {health, money} = this.props;
        return (
            <div>
                <ProgressBar now={health}/>
                <p>{money} <Glyphicon glyph='usd'/></p>
            </div>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        health: myCharacter.get('health'),
        money: myCharacter.get('money')
    };
}

export default connect(mapStateToProps)(CharacterStats);
