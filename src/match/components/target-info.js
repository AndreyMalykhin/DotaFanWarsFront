import React from 'react';
import {Overlay, Popover, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {clearTarget} from 'match/actions/character-actions';

const TargetInfo = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        rating: React.PropTypes.number,
        nickname: React.PropTypes.string,
        id: React.PropTypes.string,
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
                target={this._onGetTargetNode}
                placement='top'>
                <Popover id=''>
                    <p>
                        <FormattedMessage id='targetInfo.rating'/>&nbsp;
                        {rating}
                    </p>
                    <Image src={photoUrl} rounded/>
                    <p>{nickname}</p>
                    {countryName && <p>{countryName}</p>}
                </Popover>
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
    const user = id && characters.get(id).get('user');
    const countryId = user && user.get('countryId');
    const countryName =
        countryId && match.get('countries').get(countryId).get('name');
    return {
        isOpen: id != null,
        rating: user && user.get('rating'),
        nickname: user && user.get('nickname'),
        photoUrl: user && user.get('photoUrl'),
        countryName: countryName,
        id: id
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
