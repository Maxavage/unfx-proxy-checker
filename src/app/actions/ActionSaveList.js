import store from '../store';
import {writeFile} from "fs";
import {remote} from "electron";
const {dialog} = remote;

const getList = () => {
    const list = store.getState().list;
    let result = "";

    for(const key in list) {
        result += list[key].ip + ":" + list[key].port + "\r\n";
    }

    return result;
}

export const ActionSaveList = () => {
    let savePath = dialog.showSaveDialog({
        filters: [{
            name: 'Text Files',
            extensions: ['txt']
        }]
    });

    if(!savePath){
        return;
    }

    writeFile(savePath, getList(), function(err) {});
}