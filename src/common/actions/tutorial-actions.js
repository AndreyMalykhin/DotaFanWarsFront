export function nextTutorialStep(tutorialId) {
    return (dispatch, getState, diContainer) => {
        const tutorial = getState().tutorials.get(tutorialId);
        let currentStep = tutorial.get('step');

        if (++currentStep >= tutorial.get('stepCount')) {
            currentStep = null;
            diContainer.localStorage.set(
                `tutorial_${tutorialId}.isCompleted`, true);
        }

        dispatch(setTutorialStep(tutorialId, currentStep));
        return Promise.resolve();
    };
}

export function ensureTutorial(tutorialId) {
    return (dispatch, getState, diContainer) => {
        const isCompleted =
            diContainer.localStorage.get(`tutorial_${tutorialId}.isCompleted`);

        if (!isCompleted) {
            dispatch(setTutorialStep(tutorialId, 0));
        }

        return Promise.resolve();
    };
}

function setTutorialStep(tutorialId, step) {
    return {
        type: 'SET_TUTORIAL_STEP',
        payload: {tutorialId: tutorialId, step: step}
    };
}
