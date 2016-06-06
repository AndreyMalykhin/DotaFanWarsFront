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
        const isDead = health <= 0;
        const imgClass = classNames(
            {selected: isSelected, enemy: isEnemy, dead: isDead});
        const style = {};
        isEnemy && Object.assign(style, {border: '1px solid red'});
        isSelected && Object.assign(style, {outline: '1px solid yellow'});
        isDisabled && Object.assign(style, {opacity: 0.5});
        return (
            <div className={imgClass} style={style}>
                <ProgressBar now={health} style={{height: 8, margin: 0}}/>
                <Image
                    src={isDead ? 'https://placekitten.com/32/32' : photoUrl}
                    onClick={isDisabled ? null : this._onClick}
                    width={32}
                    height={32}/>
            </div>
        );
    },

    _onClick() {
        const {id, onClick} = this.props;
        onClick && onClick(id);
    }
});

export default Character;
