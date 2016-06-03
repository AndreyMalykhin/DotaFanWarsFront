import React from 'react';
import {Badge, Button, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

const Item = React.createClass({
    propTypes: {
        onUse: React.PropTypes.func.isRequired,
        onBuy: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.bool.isRequired,
        isUseDisabled: React.PropTypes.bool.isRequired,
        isBuyDisabled: React.PropTypes.bool.isRequired,
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        countInBag: React.PropTypes.number.isRequired,
        photoUrl: React.PropTypes.string.isRequired
    },

    render() {
        const {
            isActive,
            isUseDisabled,
            isBuyDisabled,
            name,
            countInBag,
            photoUrl
        } = this.props;
        return (
            <div className={isActive ? 'active' : null}>
                <p>{name} <Badge>{countInBag}</Badge></p>
                <Image
                    className={isUseDisabled ? 'disabled' : null}
                    src={photoUrl}
                    onClick={isUseDisabled ? null : this._onClick}
                    responsive/>
                <Button disabled={isBuyDisabled} onClick={this._onBuy}>
                    <FormattedMessage id='item.buy'/>
                </Button>
            </div>
        );
    },

    _onBuy() {
        this.props.onBuy(this.props.id);
    },

    _onClick() {
        this.props.onUse(this.props.id);
    }
});

export default Item;
