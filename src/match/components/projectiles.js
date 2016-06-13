import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import Projectile from 'match/components/projectile';

const Projectiles = React.createClass({
    propTypes: {
        onGetTargetNode: React.PropTypes.func.isRequired,
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
                        onGetTargetNode={onGetTargetNode}/>
                )).toArray()}
            </div>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {
        projectiles: state.match.get('projectiles')
    };
}

export default connect(mapStateToProps)(Projectiles);
