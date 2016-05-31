import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {Projectile} from 'item/components/projectile';
import {hitCharacter} from 'character/actions/character-actions';

const Projectiles = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
        onProjectileHit: React.PropTypes.func.isRequired,
        projectiles: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    render() {
        const {projectiles, onGetTargetNode, onProjectileHit} = this.props;
        return (
            <div>
                {projectiles.map((projectile) => (
                    <Projectile
                         key={projectile.get('id')}
                         targetId={projectile.get('targetId')}
                         onHit={onProjectileHit}
                         onGetTargetNode={onGetTargetNode}/>
                ))}
            </div>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    return {
        projectiles: state.match.get('projectiles')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onGetTargetNode(targetId) {
            return ownProps.onGetTargetNode(targetId);
        },
        onProjectileHit(targetId) {
            dispatch(hitCharacter(targetId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projectiles);
