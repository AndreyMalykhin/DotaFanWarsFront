import styles from 'match/styles/item.scss';
import React from 'react';
import {Badge, Button, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

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
        const wrapperClass =
            classNames(styles.wrapper, {[styles.active]: isActive});
        return (
            <li className={wrapperClass}>
                <p className={styles.header}>{name}</p>
                <p>
                    <Button
                        className={styles.photoBtn}
                        disabled={isUseDisabled}
                        onClick={this._onClick}>
                        <Image src={photoUrl} width={64} height={64}/>
                        <Badge className={styles.count}>{count}</Badge>
                    </Button>
                </p>
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
