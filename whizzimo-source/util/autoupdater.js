const { dialog, autoUpdater } = require('electron');
const config = require('../app.config')();

async function applyUpdater() {
  /**
   * Apply configuration Settings
   */
  autoUpdater.setFeedURL(config.updateSettings.url);
    /**
     * Auto Update Events
     */
  autoUpdater.on(config.updateEvents.UPDATE_ERROR, () => {
    dialog.showErrorBox(
      config.updateDialogsSettings.title,
      config.updateDialogsSettings.messages.error_message);
  }).on(config.updateEvents.CHECKING_FOR_UPDATES, () => {
  }).on(config.updateEvents.UPDATE_NOT_AVAILABLE, info => {
  }).on(config.updateEvents.UPDATE_AVAILABLE, info => {
  }).on(config.updateEvents.DOWNLOAD_PROGRESS, progressObj => {
  }).on(config.updateEvents.UPDATE_DOWNLOADED, (event, releaseNotes, releaseName) => {
    dialog.showMessageBox({
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

async function removeUpdateListeners() {
  autoUpdater.removeAllListeners();
}

module.exports = {
  applyUpdater,
  removeUpdateListeners
};