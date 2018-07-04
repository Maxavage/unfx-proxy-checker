import {getSettings} from '../../settings';

const settings = (state = getSettings(), action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default settings;