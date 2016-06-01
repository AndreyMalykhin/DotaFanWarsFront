import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Modal, Button} from 'react-bootstrap';
import {leaveMatch} from 'match/actions/match-actions';

const MatchResultDlg = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        isOpened: React.PropTypes.bool.isRequired,
        winnerName: React.PropTypes.string
    },

    render() {
        const {winnerName, isOpened, onClose} = this.props;
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

        return (
            <Modal.Dialog show={isOpened} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id='matchResultDlg.title'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><p>{verdict}</p></Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>
                        <FormattedMessage id='common.close'/>
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    const match = state.match;
    const result = match.get('result');
    const winnerId = result.winnerId;
    return {
        winnerName: result && winnerId && match.get('teams').get(winnerId),
        isOpened: result != null
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClose() {
            dispatch(leaveMatch());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultDlg);
