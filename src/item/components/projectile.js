import React from 'react';
import {Overlay} from 'react-bootstrap';

const Projectile = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
        onHit: React.PropTypes.func.isRequired,
        targetId: React.PropTypes.string.isRequired
    },

    _hitTimeoutId: null,

    render() {
        return (
            <Overlay target={this._onGetTargetNode} show placement='top'>
                <img src='https://placekitten.com/32/32'/>
            </Overlay>
        );
    },

    componentDidMount() {
        this._hitTimeoutId = setTimeout(() => {
            this.props.onHit(this.props.targetId);
        }, 1000);
    },

    componentWillUnmount() {
        clearTimeout(this._hitTimeoutId);
    },

    _onGetTargetNode() {
        return this.props.onGetTargetNode(this.props.targetId);
    }
});

export default Projectile;
