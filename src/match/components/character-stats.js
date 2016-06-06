import React from 'react';
import {connect} from 'react-redux';
import {ProgressBar, Glyphicon} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

const CharacterStats = React.createClass({
    propTypes: {
        health: React.PropTypes.number.isRequired,
        money: React.PropTypes.number.isRequired
    },

    render() {
        const {health, money} = this.props;
        const isDead = health <= 0;
        const deathMsg = isDead ?
            <p><FormattedMessage id='characterStats.dead'/></p> : null;
        return (
            <div>
                {deathMsg}
                {!isDead && <ProgressBar now={health}/>}
                {!isDead && <p>{money} <Glyphicon glyph='usd'/></p>}
            </div>
        );
    }
});

function mapStateToProps(state, ownProps) {
    const match = state.match;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        health: myCharacter.get('health'),
        money: myCharacter.get('money')
    };
}

export default connect(mapStateToProps)(CharacterStats);
