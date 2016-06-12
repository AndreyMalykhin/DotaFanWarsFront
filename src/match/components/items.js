import styles from 'match/styles/items.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import Item from 'match/components/item';
import {useItem, buyItem, ensureItemInactive} from
    'match/actions/character-actions';
import {ITEMS} from 'match/utils/tutorial-step-index';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import TutorialStep from 'common/components/tutorial-step';
import {PENDING} from 'common/utils/request-status';
import {MATCH} from 'common/utils/tutorial-id';

const Items = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        onItemUse: React.PropTypes.func.isRequired,
        onItemBuy: React.PropTypes.func.isRequired,
        onItemRunOut: React.PropTypes.func.isRequired,
        items: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
        myItems: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        myMoney: React.PropTypes.number.isRequired,
        iDead: React.PropTypes.bool.isRequired,
        iSit: React.PropTypes.bool.isRequired,
        showTutorial: React.PropTypes.bool.isRequired,
        iUseOffensiveItem: React.PropTypes.bool.isRequired,
        iUseDefensiveItem: React.PropTypes.bool.isRequired,
        iBuyItem: React.PropTypes.bool.isRequired,
        myActiveItemId: React.PropTypes.string
    },

    render() {
        const {
            items,
            myItems,
            myMoney,
            myActiveItemId,
            iSit,
            iDead,
            showTutorial,
            iUseOffensiveItem,
            iUseDefensiveItem,
            iBuyItem,
            onItemUse,
            onItemBuy,
            onItemRunOut,
            onTutorialComplete
        } = this.props;
        let tutorialStep;

        if (showTutorial) {
            tutorialStep = (
                <TutorialStep
                    onGetTargetNode={this._onGetTutorialTargetNode}
                    onComplete={onTutorialComplete}
                    placement='top'>
                    <FormattedMessage id='items.tutorial'/>
                </TutorialStep>
            );
        }

        const itemViews = [];

        for (let item of items.values()) {
            const itemId = item.get('id');
            const myItem = myItems.get(itemId);
            const count = myItem ? myItem.get('count') : 0;
            const isActive = itemId == myActiveItemId;
            const isUseDisabled =
                iDead
                || !iSit
                || count <= 0
                || iUseOffensiveItem
                || iUseDefensiveItem
                || (myActiveItemId != null && !isActive);
            const isBuyDisabled =
                iDead
                || !iSit
                || iBuyItem
                || item.get('price') > myMoney;
            itemViews.push(
                <Item
                    key={itemId}
                    id={itemId}
                    name={item.get('name')}
                    count={count}
                    photoUrl={item.get('photoUrl')}
                    isActive={isActive}
                    isUseDisabled={isUseDisabled}
                    isBuyDisabled={isBuyDisabled}
                    onRunOut={onItemRunOut}
                    onUse={onItemUse}
                    onBuy={onItemBuy}/>
            );
        }

        return (
            <div className={styles.wrapper}>
                {tutorialStep}
                <ul className={styles.list} ref='items'>{itemViews}</ul>
            </div>
        );
    },

    _onGetTutorialTargetNode() {
        return ReactDOM.findDOMNode(this.refs.items);
    }
});

export default function mapStateToProps(state, ownProps) {
    const {match, requestStatuses, tutorials} = state;
    const myCharacter = match.get('characters').get(match.get('myCharacterId'));
    return {
        myMoney: myCharacter.get('money'),
        myActiveItemId: myCharacter.get('activeItemId'),
        iSit: myCharacter.get('seatId') != null,
        iDead: myCharacter.get('health') <= 0,
        items: match.get('items'),
        myItems: myCharacter.get('items'),
        showTutorial: tutorials.get(MATCH).get('step') === ITEMS,
        iUseOffensiveItem:
            requestStatuses.get('match.useOffensiveItem') == PENDING,
        iUseDefensiveItem:
            requestStatuses.get('match.useDefensiveItem') == PENDING,
        iBuyItem: requestStatuses.get('buyItem') == PENDING
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
        onItemRunOut(id) {
            dispatch(ensureItemInactive(id));
        },
        onTutorialComplete() {
            dispatch(nextTutorialStep(MATCH));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
