import styles from 'match/styles/target-info.scss';
import React from 'react';
import {Overlay, Popover, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import classNames from 'classnames';
import {clearTarget} from 'match/actions/character-actions';

const TargetInfo = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        rating: React.PropTypes.number.isRequired,
        nickname: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        isEnemy: React.PropTypes.bool.isRequired,
        photoUrl: React.PropTypes.string,
        country: React.PropTypes.instanceOf(Immutable.Map)
    },

    render() {
        const {
            rating,
            photoUrl,
            nickname,
            isEnemy,
            country,
            onClose,
            onGetTargetNode
        } = this.props;
        const wrapperClass =
            classNames(styles.wrapper, {[styles.enemy]: isEnemy});
        let countryView;

        if (country) {
            countryView = (
                <p>
                    <Image
                        className={styles.countryImg}
                        src={country.get('flagUrl')}
                        width={16}
                        height={16}/>
                    {country.get('name')}
                </p>
            );
        }

        return (
            <Overlay
                onHide={onClose}
                target={this._onGetTargetNode}
                show
                rootClose
                placement='bottom'>
                <Popover className={wrapperClass} id=''>
                    <p>
                        <Image
                            className={styles.photoImg}
                            src={photoUrl}
                            rounded/>
                    </p>
                    <p>{nickname}</p>
                    <p>
                        <FormattedMessage id='targetInfo.rating'/>:&nbsp;
                        {rating}
                    </p>
                    {countryView}
                </Popover>
            </Overlay>
        );
    },

    _onGetTargetNode() {
        const {onGetTargetNode, id} = this.props;
        return onGetTargetNode(id);
    }
});

function mapStateToProps(state, ownProps) {
    const match = state.match;
    const characters = match.get('characters');
    const myCharacter = characters.get(match.get('myCharacterId'));
    const id = myCharacter.get('targetId');
    const character = characters.get(id);
    const isEnemy =
        character.get('teamId') != myCharacter.get('teamId');
    const user = character.get('user');
    const countryId = user.get('countryId');
    const country = countryId && match.get('countries').get(countryId);
    return {
        rating: user.get('rating'),
        nickname: user.get('nickname'),
        photoUrl: user.get('photoUrl'),
        country: country,
        id: id,
        isEnemy: isEnemy
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(clearTarget());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);
