import Immutable from 'immutable';

export default function projectileReducer(projectiles = null, action) {
    switch (action.type) {
    case 'LAUNCH_PROJECTILE':
        const projectile = action.payload;
        return projectiles.set(projectile.id, Immutable.fromJS(projectile));
    case 'HIT_PROJECTILE':
        return projectiles.remove(action.payload.id);
    }

    return projectiles;
}
