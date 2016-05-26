export function toggleToolbar(isExpanded) {
    return {
        type: 'TOGGLE_TOOLBAR',
        payload: {isExpanded: isExpanded}
    };
}
