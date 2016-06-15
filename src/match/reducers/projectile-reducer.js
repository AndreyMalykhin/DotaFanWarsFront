import Immutable from 'immutable';

export default function projectileReducer(projectiles = null, action) {
    switch (action.type) {
    case 'UPDATE_PROJECTILES':
        return projectiles.withMutations((projectiles) => {
            for (let projectile of action.payload) {
                projectiles.mergeDeepIn([projectile.id], projectile);
            }
        });
    case 'REMOVE_PROJECTILES':
        return projectiles.filter(
            (projectile) => !action.payload.includes(projectile.get('id')));
    }

    return projectiles;
}
