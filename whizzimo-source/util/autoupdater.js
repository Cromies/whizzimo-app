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
    .on(config.updateEvents.UPDATE_NOT_AVAILABLE, () => {
      dialog.showMessageBox(window, config.updateNotAvailableSettings);
    })
    .on(config.updateEvents.UPDATE_DOWNLOADED, (event, releaseNotes, releaseName) => {
      dialog.showMessageBox(window, config.updateDownloadedSettings, response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      });
    });
}

function removeUpdateListeners() {
  autoUpdater.removeAllListeners();
}

function checkUpdates() {
  autoUpdater.checkForUpdates();
}
module.exports = {
  checkUpdates,
  applyUpdater,
  removeUpdateListeners
};