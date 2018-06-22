import request from 'request';
import progress from 'request-progress';
import {remote, shell} from "electron";
import {createWriteStream} from 'fs';
const {dialog, getCurrentWindow} = remote;

export const ActionDownload = async (download, dispatchStart, dispatchDone, dispatchProgress) => {
    let savePath = dialog.showSaveDialog({
        defaultPath: download.filename,
        filters: [{
            name: 'Archive',
            extensions: ['rar']
        }]
    });
    
    if(!savePath){
        return;
    }

    dispatchStart();

    progress(request(download.fullUrl), {
        throttle: 100
    })
    .on('progress', function (state) {
        dispatchProgress(state.percent)
    })
    .on('end', function () {
        dispatchDone();
        setTimeout(() => {
            shell.showItemInFolder(savePath);
            getCurrentWindow().close();
        }, 300);
    })
    .pipe(createWriteStream(savePath));
}