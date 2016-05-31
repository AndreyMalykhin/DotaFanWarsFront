import React from 'react';
import {Badge, Button, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

const Item = React.createClass({
    propTypes: {
        onUse: React.PropTypes.func.isRequired,
        onBuy: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.bool.isRequired,
        isUseDisabled: React.PropTypes.bool.isRequired,
        isAffordable: React.PropTypes.bool.isRequired,
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
        countInBag: React.PropTypes.number.isRequired,
        photoUrl: React.PropTypes.string.isRequired
    },

    render() {
        const {
            isActive,
            isUseDisabled,
            name,
            countInBag,
            photoUrl,
            isAffordable
        } = this.props;
        return (
            <div className={isActive && 'active'}>
                <p>{name} <Badge>{countInBag}</Badge></p>
                <Image
                    className={isUseDisabled && 'disabled'}
                    src={photoUrl}
                    onClick={this._onClick}
                    rounded/>
                <Button disabled={!isAffordable} onClick={this._onBuy}>
                    <FormattedMessage id='item.buy'/>
                </Button>
            </div>
        );
    },

    _onBuy() {
        this.props.onBuy(this.props.id);
    },

    _onClick() {
        if (this.props.isUseDisabled) {
            return;
        }

        this.props.onUse(this.props.id);
    }
});

export default Item;
