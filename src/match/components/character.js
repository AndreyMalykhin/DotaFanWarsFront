import React from 'react';
import {ProgressBar, Image} from 'react-bootstrap';
import Immutable from 'immutable';
import classNames from 'classnames';

const Character = React.createClass({
    propTypes: {
        isSelected: React.PropTypes.bool.isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        isEnemy: React.PropTypes.bool.isRequired,
        health: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        photoUrl: React.PropTypes.string
    },

    render() {
        const {isSelected, isDisabled, isEnemy, health, photoUrl} = this.props;
        const imgClass = classNames(
            {selected: isSelected, enemy: isEnemy, dead: health <= 0});
        return (
            <div className={imgClass}>
                <ProgressBar now={health} style={{height: 8, margin: 0}}/>
                <Image
                    src={photoUrl}
                    onClick={isDisabled ? null : this._onClick}
                    style={{width: 32, height: 32}}/>
            </div>
        );
    },

    _onClick() {
        const {id, onClick} = this.props;
        onClick && onClick(id);
    }
});

export default Character;
