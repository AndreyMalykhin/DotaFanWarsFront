import React from 'react';
import {Overlay, Popover, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {clearTarget} from 'match/actions/character-actions';

const TargetInfo = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        rating: React.PropTypes.number.isRequired,
        nickname: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        photoUrl: React.PropTypes.string,
        countryName: React.PropTypes.string
    },

    render() {
        const {
            rating,
            photoUrl,
            nickname,
            countryName,
            onClose,
            onGetTargetNode
        } = this.props;
        return (
            <Overlay
                onHide={onClose}
                target={this._onGetTargetNode}
                show
                placement='bottom'>
                <Popover id=''>
                    <p>
                        <FormattedMessage id='targetInfo.rating'/>&nbsp;
                        {rating}
                    </p>
                    <Image src={photoUrl} rounded width={128} height={128}/>
                    <p>{nickname}</p>
                    {countryName && <p>{countryName}</p>}
                </Popover>
            </Overlay>
        );
    },

    _onGetTargetNode() {
        const {onGetTargetNode, id} = this.props;
        return onGetTargetNode(id);
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const characters = match.get('characters');
    const id =
        characters.get(match.get('myCharacterId')).get('targetId');
    const user = characters.get(id).get('user');
    const countryId = user.get('countryId');
    const countryName =
        countryId && match.get('countries').get(countryId).get('name');
    return {
        rating: user.get('rating'),
        nickname: user.get('nickname'),
        photoUrl: user.get('photoUrl'),
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
