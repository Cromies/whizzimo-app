const {
  dialog,
  autoUpdater
} = require('electron');
const config = require('../app.config')();

function applyUpdater(window) {
  /**
   * Apply configuration Settings
   */
  autoUpdater.setFeedURL(config.updateSettings.url);
  /**
   * Auto Update Events
   */
  autoUpdater.on(config.updateEvents.UPDATE_ERROR, () => {
      // updater encounters an error either by internet disconnect
    })
    .on(config.updateEvents.UPDATE_DOWNLOADED, (event, releaseNotes, releaseName) => {
      dialog.showMessageBox(window, {
        type: 'info',
        title: config.updateDialogsSettings.title,
        message: config.updateDialogsSettings.messages.finished_message,
        buttons: config.updateDialogsSettings.buttons.down_diag
      }, response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      });
    });

  autoUpdater.checkForUpdates();
}

function removeUpdateListeners() {
  autoUpdater.removeAllListeners();
}

module.exports = {
  applyUpdater,
  removeUpdateListeners
};