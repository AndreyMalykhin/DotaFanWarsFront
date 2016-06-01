import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Immutable from 'immutable';
import Item from 'item/components/item';
import {useItem, buyItem} from 'item/actions/item-actions';
import {ITEMS} from 'match/utils/tutorial-step-index';
import {nextTutorialStep} from 'common/actions/tutorial-actions';
import TutorialStep from 'common/components/tutorial-step';

const Items = React.createClass({
    propTypes: {
        onTutorialComplete: React.PropTypes.func.isRequired,
        onItemUse: React.PropTypes.func.isRequired,
        onItemBuy: React.PropTypes.func.isRequired,
        items: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        myMoney: React.PropTypes.number.isRequired,
        isMeDead: React.PropTypes.bool.isRequired,
        showTutorial: React.PropTypes.bool.isRequired
    },

    render() {
        const {
            items,
            myMoney,
            isMeDead,
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

        return (
            <Row ref='items'>
                {tutorialStep}
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
        isMeDead: myCharacter.get('health') <= 0,
        items: myCharacter.get('items'),
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
