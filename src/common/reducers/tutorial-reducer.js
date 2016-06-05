export default function tutorialReducer(tutorials = null, action) {
    switch (action.type) {
    case 'SET_TUTORIAL_STEP':
        const {tutorialId, step} = action.payload;
        return tutorials.setIn([tutorialId, 'step'], step);
    }

    return tutorials;
}
