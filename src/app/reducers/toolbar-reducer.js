export default function toolbarReducer(toolbar = null, action) {
    switch (action.type) {
    case 'TOGGLE_TOOLBAR':
        return toolbar.set('isExpanded', action.payload.isExpanded);
    }

    return toolbar;
}
