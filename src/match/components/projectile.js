import React from 'react';
import {Overlay} from 'react-bootstrap';

const Projectile = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
        targetId: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <Overlay target={this._onGetTargetNode} show placement='top'>
                <img src='https://placekitten.com/32/32'/>
            </Overlay>
        );
    },

    _onGetTargetNode() {
        return this.props.onGetTargetNode(this.props.targetId);
    }
});

export default Projectile;
