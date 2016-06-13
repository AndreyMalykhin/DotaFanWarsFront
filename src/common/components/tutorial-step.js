import styles from 'common/styles/tutorial-step.scss';
import React from 'react';
import {Overlay, Popover, Button} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

const TutorialStep = React.createClass({
    propTypes: {
        onComplete: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        placement: React.PropTypes.string.isRequired
    },

    render() {
        const {
            placement,
            children,
            onComplete,
            onGetTargetNode
        } = this.props;
        return (
            <Overlay target={onGetTargetNode} placement={placement} show>
                <Popover className={styles.wrapper} id=''>
                    {children}
                    <div className={styles.actions}>
                        <Button onClick={onComplete}>
                            <FormattedMessage id='common.ok'/>
                        </Button>
                    </div>
                </Popover>
            </Overlay>
        );
    }
});

export default TutorialStep;
