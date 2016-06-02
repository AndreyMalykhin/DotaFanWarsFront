import React from 'react';
import {Overlay, Popover} from 'react-bootstrap';

const TutorialStep = React.createClass({
    propTypes: {
        onComplete: React.PropTypes.func.isRequired,
        onGetTargetNode: React.PropTypes.func.isRequired,
        isCompleted: React.PropTypes.bool.isRequired,
        placement: React.PropTypes.string.isRequired
    },

    render() {
        const {
            isCompleted,
            placement,
            children,
            onComplete,
            onGetTargetNode
        } = this.props;
        return (
            <Overlay
                target={onGetTargetNode}
                show={!isCompleted}
                onHide={onComplete}
                placement={placement}>
                <Popover id=''>{children}</Popover>
            </Overlay>
        );
    }
});

export default TutorialStep;
