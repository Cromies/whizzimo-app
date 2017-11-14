const path = require('path'),
    url = require('url');    

module.exports = function () {
    const iconsPath = './icons/';
    const title = 'Whizzimo';
    let errorUrl = url.parse(url.format({
        pathname: path.join(__dirname, 'error.html'),
        protocol: 'file:',
        slashes: true
    })).href;

    const config = {
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
            title: `${title} got broke`,
            content: `${title} will now close`
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
                width: config.dimensions.width,
                height: config.dimensions.height,
                minWidth: config.dimensions.width,
                minHeight: config.dimensions.height,
                icon: config.icoPath,
                autoHideMenuBar: true,
                webPreferences: {
                    nodeIntegration: false,
                    webSecurity: false,
                    zoomFactor: 0.8,
                    allowRunningInsecureContent: true
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
            LOGIN: 'testsuperheroplus@whizzimo.com',
            PASS: 'words',
            URL: 'https://edu.whizzimo.com/#/login',
            HOME_URL: 'http://www.whizzimo.com/',
            ABOUT_URL: 'http://www.whizzimo.com/features.html',
            MAIN_PAGE: 'https://edu.whizzimo.com/#/mycurriculum',
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
            WILL_DOWNLOAD: 'will-download'
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
        updateDialogsSettings: {
            title: 'Updates',
            messages: {
                check_message: 'Checking for updates...',
                avail_message: 'Updates are available',
                n_avail_message: 'Update not available',
                error_message: 'Error in auto updater',
                prog_message: 'Download in progess...',
                finished_message: `Update downloaded!\nNow wait patiently as ${title} updates in the background!`
            }
        },
        
        /**
         * Error Page
         */
        errorUrl: errorUrl

    };

    return config;
}