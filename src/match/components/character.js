import React from 'react';
import {ProgressBar, Image} from 'react-bootstrap';
import Immutable from 'immutable';
import classNames from 'classnames';

const Character = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        isEnemy: React.PropTypes.bool.isRequired,
        health: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        photoUrl: React.PropTypes.string
    },

    render() {
        const {isSelected, isEnemy, health, photoUrl} = this.props;
        const imgClass = classNames({selected: isSelected, enemy: isEnemy});
        return (
            <div>
                <ProgressBar now={health} style={{height: 8, margin: 0}}/>
                <Image
                    className={imgClass}
                    src={photoUrl}
                    onClick={this._onClick}
                    style={{width: 32, height: 32}}/>
            </div>
        );
    },

    _onClick() {
        this.props.onClick(this.props.id);
    }
});

export default Character;