import React from 'react';
import {Overlay} from 'react-bootstrap';

const Projectile = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
        targetId: React.PropTypes.string.isRequired,
        container: React.PropTypes.any
    },

    render() {
        return (
            <Overlay
                container={this.props.container}
                target={this._onGetTargetNode}
                show
                placement='top'>
                <img
                    src='https://placekitten.com/32/32'
                    style={{position: 'absolute', marginTop: 32}}
                    width={64}
                    height={64}/>
            </Overlay>
        );
    },

    _onGetTargetNode() {
        return this.props.onGetTargetNode(this.props.targetId);
    }
});

export default Projectile;
