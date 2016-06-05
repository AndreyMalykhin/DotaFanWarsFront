export function updateProjectiles(projectiles) {
    return {type: 'UPDATE_PROJECTILES', payload: projectiles};
}

export function removeProjectiles(ids) {
    return {type: 'REMOVE_PROJECTILES', payload: ids};
}
