/**
 * Application Configuration Settings
 */
const path = require('path'),
    url = require('url');

module.exports = function () {
    const iconsPath = './icons/';
    const title = 'Whizzimo';
    const errorUrl = url.format({
        pathname: path.join(__dirname, 'error.html'),
        protocol: 'file:',
        slashes: true
    }).replace(/\\/g, "/");

    return Object.freeze({
        title: title,

        /**
         * Tool Tip Settings
         */
        toolTipTitle: 'Whizzimo.com',
        /**
         * Icons path
         */
        icoPath: `${iconsPath}icon.ico`,

        /**
         * Dialog Settings
         */
        crashedDialogSettings: {
            type: 'info',
            title: `${title} has crashed`,
            message: `${title} seems to have crashed`,
            buttons: [
                'Reload',
                'Close'
            ]
        },

        unresponsiveDialogSettings: {
            type: 'info',
            title: `${title} is not responding`,
            message: `${title} is not responding
            and needs to close. We are sorry for any inconvience`,
            buttons: [
                'Reload',
                'Close'
            ]
        },

        preventUnloadSettings: {
            type: 'question',
            buttons: [
                'Leave',
                'Stay'
            ],
            title: 'Do you want to leave this site?',
            message: 'Changes you made may not be saved.',
            defaultId: 0,
            cancelId: 1
        },

        errorBoxSettings: {
            title: `${title} will now close.`,
            content: `${title} encountered an error and needs to close.`
        },

        aboutDiagSettings(app) {
            return {
                type: "info",
                title: `${this.title}`,
                message: `About ${this.title}`,
                detail: `Version: ${app.getVersion()}.
Changes:
- fixed:
    - updater fixes.
    - other bug fixes`,
                buttons: ["Close"]
            };
        },

        /**
         * Window settings
         */
        dimensions: {
            width: 1014,
            height: 768
        },

        getElectronWindowSettings() {
            return {
                title: title,
                width: this.dimensions.width,
                height: this.dimensions.height,
                minWidth: this.dimensions.width,
                minHeight: this.dimensions.height,
                icon: this.icoPath,
                webPreferences: {
                    nodeIntegration: false,
                    zoomFactor: 0.8,
                },
                show: false
            };
        },

        /**
         * Cache Settings
         */
        cacheSettings: {
            storages: ['appcache'],
            quotas: ['persistant']
        },

        /**
         * Environment Vars
         */
        env: {
            URL: 'https://edu.whizzimo.com/#/login',
            HOME_URL: 'http://www.whizzimo.com/',
            ABOUT_URL: 'http://www.whizzimo.com/features.html',
            MAIN_PAGE: 'https://edu.whizzimo.com/',
            DARWIN: 'darwin'
        },

        /**
         * Window Events
         */
        events: {
            ACTIVATE: 'activate',
            CLOSED: 'closed',
            CRASHED: 'crashed',
            UNRESPONSIVE: 'unresponsive',
            UNCAUGHT_EXCEPTION: 'uncaughtException',
            READY: 'ready',
            READY_TO_SHOW: 'ready-to-show',
            RESPONSIVE: 'responsive',
            RIGHT_CLICK: 'right-click',
            WINDOW_ALL_CLOSED: 'window-all-closed',
            WILL_PREVENT_UNLOAD: 'will-prevent-unload',
            DID_FAIL_LOAD: 'did-fail-load',
            DID_FINISH_LOAD: 'did-finish-load',
            WILL_QUIT: 'will-quit',
            WILL_DOWNLOAD: 'will-download',
            PAGE_TITLE_UPDATED: 'page-title-updated',
            DID_FRAME_FINISH_LOAD: 'did-frame-finish-load'
        },

        /**
         * Updater Settings
         */
        updateSettings: {
            url: 'https://edu.whizzimo.com/app/',
            autoDownload: false,
            allowDowngrade: false,
            allowPrerelease: false,
        },
        /**
         * Update Events
         */
        updateEvents: {
            CHECKING_FOR_UPDATES: 'checking-for-updates',
            UPDATE_AVAILABLE: 'update-available',
            UPDATE_NOT_AVAILABLE: 'update-not-available',
            UPDATE_ERROR: 'error',
            DOWNLOAD_PROGRESS: 'download-progress',
            UPDATE_DOWNLOADED: 'update-downloaded'
        },

        /**
         * Update dialogs config
         */
        updateNotAvailableSettings: {
            type: 'info',
            title: 'Updates',
            message: `Update for ${title} not available`
        },

        updateDownloadedSettings: {
            type: 'info',
            title: 'Updates',
            message: `Update downloaded!\nWould you like to restart ${title} to apply update?`,
            buttons: ['Yes. Install Now!', 'No. Install on Restart']
        },

        /**
         * Error Page
         */
        errorUrl: errorUrl

    });
}