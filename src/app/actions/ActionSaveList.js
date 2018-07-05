import { writeFile } from 'fs';
import { remote } from 'electron';
const { dialog } = remote;

export const ActionSaveList = list => {
    let savePath = dialog.showSaveDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (!savePath) {
        return;
    }

    writeFile(savePath, list.map(item => `${item.ip}:${item.port}`).join('\r\n'), err => {});
};
