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
                <Popover id=''>
                    {children}
                    <p>
                        <Button onClick={onComplete}>
                            <FormattedMessage id='common.ok'/>
                        </Button>
                    </p>
                </Popover>
            </Overlay>
        );
    }
});

export default TutorialStep;
