import { JUDGES_CHANGE_STATE, JUDGE_CHANGE_PING_STATE } from '../constants/ActionTypes';

export const changeState = state => ({
    type: JUDGES_CHANGE_STATE,
    state
});

export const startPing = () => (dispatch, getState) => {
    const { settings } = getState();

    const parsejudges = settings.judgesList.map(item => {
        return {
            url: item.url,
            state: {
                checking: true,
                working: false
            }
        }
    });

    dispatch(changeState({ isActive: true, locked: true, items: parsejudges }));
};

export const changeJudgePingState = (url, state) => ({
    type: JUDGE_CHANGE_PING_STATE,
    url,
    state
});