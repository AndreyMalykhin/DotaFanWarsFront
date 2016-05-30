import React from 'react';
import {Overlay, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {clearTarget} from 'character/actions/character-actions';

const TargetInfo = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onGetNode: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        rating: React.PropTypes.number.isRequired,
        nickname: React.PropTypes.string.isRequired,
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
            onGetNode
        } = this.props;
        return (
            <Overlay
                show={isOpen}
                onHide={onClose}
                placement='top'
                target={onGetNode}>
                <p>
                    <FormattedMessage id='targetInfo.rating'/>&nbsp;
                    {rating}
                </p>
                <Image src={photoUrl} rounded/>
                <p>{nickname}</p>
                {countryName && <p>{countryName}</p>}
            </Overlay>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const characters = match.get('characters');
    const myTargetId =
        characters.get(match.get('myCharacterId')).get('targetId');
    const user = characters.get(myTargetId).get('user');
    const country = user.get('country');
    return {
        isOpen: myTargetId != null,
        rating: user.get('rating'),
        nickname: user.get('nickname'),
        photoUrl: user.get('photoUrl'),
        countryName: country && country.get('name')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(clearTarget());
        },
        onGetNode() {
            return ownProps.onGetNode();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);
