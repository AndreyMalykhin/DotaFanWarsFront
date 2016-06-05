import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {FormattedMessage} from 'react-intl';
import {Modal, Button} from 'react-bootstrap';
import {leaveMatch} from 'match/actions/match-actions';

const MatchResultDlg = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        myRatingDelta: React.PropTypes.number.isRequired,
        winnerName: React.PropTypes.string
    },

    render() {
        const {myRatingDelta, winnerName, onClose} = this.props;
        let verdict;

        if (winnerName) {
            verdict = (
                <FormattedMessage
                    id='matchResultDlg.winner'
                    values={{name: winnerName}}/>
            );
        } else {
            verdict = <FormattedMessage id='matchResultDlg.draw'/>;
        }

        let ratingDeltaView;

        if (myRatingDelta != 0) {
            ratingDeltaView = (
                <p>
                    {myRatingDelta > 0 ? '+' : '-'}{myRatingDelta}&nbsp;
                    <FormattedMessage id='matchResultDlg.rating'/>
                </p>
            );
        }

        return (
            <Modal show onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id='matchResultDlg.title'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{verdict}</p>{ratingDeltaView}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>
                        <FormattedMessage id='common.close'/>
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function mapStateToProps(state, ownProps) {
    const match = state.match;
    const result = match.get('result');
    const winnerId = result.get('winnerId');
    return {
        winnerName: winnerId && match.get('teams').get(winnerId).get('name'),
        myRatingDelta: result.get('myRatingDelta')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(push('/'));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultDlg);
