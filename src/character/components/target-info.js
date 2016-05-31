import React from 'react';
import {Overlay, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {clearTarget} from 'character/actions/character-actions';

const TargetInfo = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        rating: React.PropTypes.number.isRequired,
        nickname: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        photoUrl: React.PropTypes.string,
        countryName: React.PropTypes.string
    },

    render() {
        const {
            isOpen,
            rating,
            photoUrl,
            nickname,
            countryName,
            onClose,
            onGetTargetNode
        } = this.props;
        return (
            <Overlay
                show={isOpen}
                onHide={onClose}
                placement='top'
                target={this._onGetTargetNode}>
                <p>
                    <FormattedMessage id='targetInfo.rating'/>&nbsp;
                    {rating}
                </p>
                <Image src={photoUrl} rounded/>
                <p>{nickname}</p>
                {countryName && <p>{countryName}</p>}
            </Overlay>
        );
    },

    _onGetTargetNode() {
        return this.props.onGetTargetNode(this.props.id);
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const characters = match.get('characters');
    const id =
        characters.get(match.get('myCharacterId')).get('targetId');
    const user = characters.get(id).get('user');
    const country = user.get('country');
    return {
        isOpen: id != null,
        rating: user.get('rating'),
        nickname: user.get('nickname'),
        photoUrl: user.get('photoUrl'),
        countryName: country && country.get('name'),
        id: id
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(clearTarget());
        },
        onGetTargetNode(targetId) {
            return ownProps.onGetTargetNode(targetId);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);
