import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Immutable from 'immutable';
import Item from 'match/components/item';
import {useItem, buyItem} from 'match/actions/item-actions';
import {ITEMS} from 'match/utils/tutorial-step-index';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import TutorialStep from 'common/components/tutorial-step';

const Items = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        onItemUse: React.PropTypes.func.isRequired,
        onItemBuy: React.PropTypes.func.isRequired,
        items: React.PropTypes.instanceOf(Immutable.List).isRequired,
        myItems: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        myMoney: React.PropTypes.number.isRequired,
        iDead: React.PropTypes.bool.isRequired,
        iSit: React.PropTypes.bool.isRequired,
        showTutorial: React.PropTypes.bool.isRequired
    },

    render() {
        const {
            items,
            myItems,
            myMoney,
            iSit,
            iDead,
            showTutorial,
            onItemUse,
            onItemBuy,
            onTutorialComplete
        } = this.props;
        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='left'
                    isCompleted={false}>
                    <FormattedMessage id='matchTutorial.itemsStep'/>
                </TutorialStep>
            );
        }

        const itemViews = [];

        for (let item of items.values()) {
            const itemId = item.get('id');
            const myItem = myItems.get(itemId);
            const countInBag = myItem ? myItem.get('count') : 0;
            const isActive =
                Boolean(!iDead && myItem && myItem.get('isActive'));
            const isBuyDisabled = iDead || !iSit || item.get('price') > myMoney;
            itemViews.push(
                <Col key={itemId} xs={6}>
                    <Item
                        id={itemId}
                        name={item.get('name')}
                        countInBag={countInBag}
                        photoUrl={item.get('photoUrl')}
                        isActive={isActive}
                        isUseDisabled={iDead || !iSit || !countInBag}
                        isBuyDisabled={isBuyDisabled}
                        onUse={onItemUse}
                        onBuy={onItemBuy}/>
                </Col>
            );
        }

        return <Row ref='items'>{tutorialStep}{itemViews}</Row>;
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.items);
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        myMoney: myCharacter.get('money'),
        iSit: myCharacter.get('seatId') != null,
        iDead: myCharacter.get('health') <= 0,
        items: match.get('items'),
        myItems: myCharacter.get('items'),
        showTutorial: match.get('tutorialStep') === ITEMS
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onItemUse(id) {
            dispatch(useItem(id));
        },
        onItemBuy(id) {
            dispatch(buyItem(id));
        },
        onTutorialComplete() {
            dispatch(nextTutorialStep());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
