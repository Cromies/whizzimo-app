const url = require('url'),
    https = require('https'),
    path = require('path');
    
const config = require('./app.config')();

/**
 * Renders a page in the renderer process
 * @param {Electron.BrowserWindow} window 
 * @param {URL} page 
 */
const renderUI = (window, page = config.env.MAIN_PAGE) => { 
    https.get(url.parse(page), (res) => {
        if (res.statusCode === 200) {
            window.loadURL(page);
        } else {
            getErrorWindow(window);
        }
    }).on('error', () => {
        getErrorWindow(window);
    });   
};

/**
 * Checks for a connection to the server
 * @param {Electron.BrowserWindow} window 
 */
const checkConnection = window => {
    https.get(url.parse(config.env.MAIN_PAGE), (res) => {
        if (window.webContents.getURL() === config.errorUrl &&
            res.statusCode === 200) {
            if (window.webContents.history.length > 1) {
                let his = window.webContents.history.filter(entry => entry !== config.errorUrl);
                let lastPage = his.pop();
                renderUI(window, lastPage);
            } else {
                renderUI(window);
            }
        } else if (window.webContents.getURL() !== config.errorUrl && res.statusCode === 200) {
            window.reload();
        } else {
            getErrorWindow(window);
        }
    }).on('error', () => {
        getErrorWindow(window);
    });
};

const getErrorWindow = window => {
    window.loadURL(config.errorUrl);
};

const closeApp = app => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== config.env.DARWIN) {
        app.quit();
    }
};
  
module.exports = {
    renderUI,
    closeApp,
    checkConnection,
    getErrorWindow
};