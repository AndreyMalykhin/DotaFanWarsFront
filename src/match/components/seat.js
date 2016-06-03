import React from 'react';

const Seat = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        isDisabled: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func
    },

    render() {
        const {isDisabled, children} = this.props;
        return (
            <td className={isDisabled ? 'disabled' : null}
                onClick={isDisabled ? null : this._onClick}
                style={{width: 32}}>
                {children}
            </td>
        );
    },

    _onClick() {
        const {onClick, id} = this.props;
        onClick && onClick(id);
    }
});

export default Seat;
