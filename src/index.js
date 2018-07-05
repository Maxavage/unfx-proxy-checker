import { app, BrowserWindow } from 'electron';

if (require('electron-squirrel-startup')) {
    app.quit();
}

const DEV = true;
let window;

const devWindow = () => {
    window = new BrowserWindow({
        width: 1850,
        height: 960,
        show: false
    });

    window.webContents.openDevTools();
};

const prodWindow = () => {
    window = new BrowserWindow({
        width: 1140,
        height: 760,
        show: false,
        resizable: false
    });

    window.setMenu(null);
};

const createWindow = () => {
    DEV ? devWindow() : prodWindow();

    window.loadURL(`file://${__dirname}/../public/index.html`);

    window.on('ready-to-show', () => {
        window.show();
    });

    window.on('closed', () => {
        window = null;
        app.quit();
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
