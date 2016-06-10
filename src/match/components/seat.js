import styles from 'match/styles/seat.scss';
import React from 'react';
import classNames from 'classnames';

const Seat = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        id: React.PropTypes.string.isRequired,
        isDisabled: React.PropTypes.bool.isRequired
    },

    render() {
        const {isDisabled, children} = this.props;
        const cssClass =
            classNames(styles.wrapper, {[styles.disabled]: isDisabled});
        return (
            <td
                className={cssClass}
                onClick={isDisabled ? null : this._onClick}>
                {children}
            </td>
        );
    },

    _onClick() {
        const {onClick, id} = this.props;
        onClick(id);
    }
});

export default Seat;
