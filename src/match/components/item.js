import React from 'react';
import {Badge, Button, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

const Item = React.createClass({
    propTypes: {
        onUse: React.PropTypes.func.isRequired,
        onBuy: React.PropTypes.func.isRequired,
        onRunOut: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.bool.isRequired,
        isUseDisabled: React.PropTypes.bool.isRequired,
        isBuyDisabled: React.PropTypes.bool.isRequired,
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        photoUrl: React.PropTypes.string.isRequired
    },

    render() {
        const {
            isActive,
            isUseDisabled,
            isBuyDisabled,
            name,
            count,
            photoUrl
        } = this.props;
        const style = {display: 'inline-block', width: '50%'};
        isActive && Object.assign(style, {border: '1px solid yellow'});
        return (
            <li
                className={isActive ? 'active' : null}
                style={style}>
                <p>{name} <Badge>{count}</Badge></p>
                <Image
                    className={isUseDisabled ? 'disabled' : null}
                    style={isUseDisabled ? {opacity: 0.5} : null}
                    src={photoUrl}
                    onClick={isUseDisabled ? null : this._onClick}
                    width={32}
                    height={32}/>
                <Button disabled={isBuyDisabled} onClick={this._onBuy}>
                    <FormattedMessage id='item.buy'/>
                </Button>
            </li>
        );
    },

    componentWillReceiveProps(newProps) {
        const {id, count, onRunOut} = this.props;

        if (count && !newProps.count) {
            onRunOut(id);
        }
    },

    _onBuy() {
        const {id, onBuy} = this.props;
        onBuy(id);
    },

    _onClick() {
        const {id, onUse} = this.props;
        onUse(id);
    }
});

export default Item;
