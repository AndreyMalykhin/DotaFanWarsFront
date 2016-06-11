import styles from 'match/styles/character.scss';
import React from 'react';
import {ProgressBar, Image} from 'react-bootstrap';
import Immutable from 'immutable';
import classNames from 'classnames';
import Icon from 'common/components/icon';
import DeadIcon from 'match/images/character-dead.svg';

const Character = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        isEnemy: React.PropTypes.bool.isRequired,
        isMe: React.PropTypes.bool.isRequired,
        health: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        photoUrl: React.PropTypes.string
    },

    render() {
        const {isSelected, isDisabled, isEnemy, isMe, health, photoUrl} =
            this.props;
        const isDead = health <= 0;
        const wrapperClass = classNames(styles.wrapper, {
            [styles.me]: isMe,
            [styles.disabled]: isDisabled,
            [styles.selected]: isSelected,
            [styles.enemy]: isEnemy,
            [styles.dead]: isDead
        });
        let photo;

        if (isDead) {
            photo = <Icon
                glyph={DeadIcon}
                className={styles.deadIcon}
                width={32}
                height={32}/>;
        } else {
            photo =
                <Image
                    className={styles.photo}
                    src={photoUrl}
                    onClick={isDisabled ? null : this._onClick}
                    width={32}
                    height={32}
                    rounded/>;
        }

        return (
            <div className={wrapperClass}>
                <ProgressBar now={health} className={styles.health}/>{photo}
            </div>
        );
    },

    _onClick() {
        const {id, onClick} = this.props;
        onClick(id);
    }
});

export default Character;
