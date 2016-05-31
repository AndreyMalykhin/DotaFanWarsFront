import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Immutable from 'immutable';
import Item from 'item/components/item';
import {useItem, buyItem} from 'item/actions/item-actions';

const Items = React.createClass({
    propTypes: {
        onItemUse: React.PropTypes.func.isRequired,
        onItemBuy: React.PropTypes.func.isRequired,
        items: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        myMoney: React.PropTypes.number.isRequired,
        isMeDead: React.PropTypes.bool.isRequired
    },

    render() {
        const {items, myMoney, isMeDead, onItemUse, onItemBuy} = this.props;
        return (
            <Row>
                {items.map((item) => (
                    <Col key={item.get('id')} xs={6}>
                        <Item
                            id={item.get('id')}
                            name={item.get('name')}
                            countInBag={item.get('countInBag')}
                            photoUrl={item.get('photoUrl')}
                            isActive={item.get('isActive')}
                            isUseDisabled={!item.get('countInBag')}
                            isAffordable={item.get('price') <= myMoney}
                            onUse={onItemUse}
                            onBuy={onItemBuy}/>
                    </Col>
                ))}
            </Row>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        myMoney: myCharacter.get('money'),
        isMeDead: myCharacter.get('health') <= 0,
        items: myCharacter.get('items')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onItemUse(id) {
            dispatch(useItem(id));
        },
        onItemBuy(id) {
            dispatch(buyItem(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
