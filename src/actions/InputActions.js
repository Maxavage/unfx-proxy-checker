import { readFile } from 'fs';
import { remote } from 'electron';
const { dialog } = remote;

export const changeValue = value => ({
    type: 'CHANGE_INPUT',
    value
});

export const loadFromTxt = () => dispatch => {
    let readPath = dialog.showOpenDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (!readPath) {
        return;
    }

    dispatch(changeValue('Loading...'));

    readFile(readPath[0], 'utf8', (err, contents) => dispatch(changeValue(contents)));
};
