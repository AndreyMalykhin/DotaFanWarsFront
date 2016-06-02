import uuid from 'node-uuid';

export function launchProjectile(targetId) {
    return (dispatch, getState, diContainer) => {
        const projectileId = uuid.v4();
        dispatch({
            type: 'LAUNCH_PROJECTILE',
            payload: {id: projectileId, targetId: targetId}
        });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({type: 'HIT_PROJECTILE', payload: {id: projectileId}});
                resolve();
            }, 1000);
        });
    };
}
