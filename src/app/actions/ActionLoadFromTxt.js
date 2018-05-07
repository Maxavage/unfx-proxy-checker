import {readFile} from "fs";
import {remote} from "electron";
const {dialog} = remote;

export const ActionLoadFromTxt = (dispatch) => {
    let readPath = dialog.showOpenDialog({
        filters: [{
            name: 'Text Files',
            extensions: ['txt']
        }]
    });

    if(!readPath){
        return;
    }

    dispatch('Loading...');

    readFile(readPath[0], 'utf8', (err, contents) => dispatch(contents));
}