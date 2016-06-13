import styles from 'match/styles/match-result-dlg.scss';
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
        iWon: React.PropTypes.bool.isRequired,
        winnerName: React.PropTypes.string
    },

    render() {
        const {iWon, myRatingDelta, winnerName, onClose} = this.props;
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
                    <FormattedMessage id='matchResultDlg.rating'/>:&nbsp;
                    <span className={styles.ratingDelta}>
                        {myRatingDelta > 0 ? '+' : ''}{myRatingDelta}
                    </span>
                </p>
            );
        }

        return (
            <Modal className={iWon ? null : styles.loose} onHide={onClose} show>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id='matchResultDlg.title'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <p className={styles.verdict}>{verdict}</p>{ratingDeltaView}
                </Modal.Body>
                <Modal.Footer className={styles.footer}>
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
    const iWon = match.get('characters').get(match.get('myCharacterId'))
        .get('teamId') == winnerId;
    return {
        winnerName: winnerId && match.get('teams').get(winnerId).get('name'),
        iWon: iWon,
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
