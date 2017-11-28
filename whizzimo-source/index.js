const {
  app,
  BrowserWindow,
  dialog,
  Menu,
  globalShortcut
  } = require('electron'),
MenuTemplate = require('./templates/menu.template'),
path = require('path'),
renderer = require('./renderer'),
updater = require('./util/autoupdater');

const config = require('./app.config')();

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow
    (config.getElectronWindowSettings());
  
  await clearCaches();

  loadEventHandlers();

  // build and set the menubar for the app
  const menu = await Menu.buildFromTemplate(MenuTemplate.
    getMenuTemplate(mainWindow, app));
  
  Menu.setApplicationMenu(menu);

  await renderer.renderUI(mainWindow);

  //updater.applyUpdater();
};

// Clears the Storage Caches
async function clearCaches () {
  mainWindow.webContents.session.
    clearStorageData(config.cacheSettings);
};

// Load the Event Handlers of the app and mainWindow
async function loadEventHandlers() {
  
  const handlediag = (index) => {
    if (index === 0) {
      mainWindow.reload();
    } else {
      invokeClosingEvents();
    }
  }

  // handles the crashed event
  await mainWindow.webContents.on(config.events.CRASHED, () => {
    dialog.showMessageBox(config.crashedDialogSettings, handlediag(index));
  });  

  // Emitted when an unresponsive event occurs
  await mainWindow.on(config.events.UNRESPONSIVE, () => {
    dialog.showMessageBox(config.unresponsiveDialogSettings, handlediag(index));   
  });

  // Emitted when an exception occurs (error handling)
  await process.on(config.events.UNCAUGHT_EXCEPTION, () => { 
    dialog.showErrorBox(
      config.errorBoxSettings.title,
      config.errorBoxSettings.content
    );
    invokeClosingEvents();
  });

  // Emitted when the window is closed.
  await mainWindow.on(config.events.CLOSED, () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    app.removeAllListeners();
    mainWindow.removeAllListeners();
    updater.removeUpdateListeners();
    config.errorUrl = null;
    config.events = null;
    config.updateEvents = null;
    config.env = null;
    mainWindow = null;
    if (typeof global.gc !== 'undefined') {
      global.gc();
    }
  });

  await mainWindow.webContents.on(config.events.DID_FAIL_LOAD, () => { 
    renderer.getErrorWindow(mainWindow);
  });

  await mainWindow.webContents.on(config.events.WILL_PREVENT_UNLOAD,
    (event) => {
      const choice = dialog.showMessageBox(mainWindow,
      config.preventUnloadSettings)
    const leave = choice === 0;
    if (leave) {
      event.preventDefault()
    }
  });

  await mainWindow.on(config.events.RESPONSIVE, () => { 
      mainWindow.reload();
  });

  // Quit when all windows are closed.
  await app.on(config.events.WINDOW_ALL_CLOSED, () => {
    if (process.platform !== config.env.DARWIN) {
      app.quit();
    }
  });

  await app.on(config.events.ACTIVATE, () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  await app.on(config.events.WILL_QUIT, () => {
    globalShortcut.unregisterAll();
  });

  await mainWindow.once(config.events.READY_TO_SHOW, () => {
    mainWindow.show();
  });

  const invokeClosingEvents = () => {
    app.emit(config.events.WILL_QUIT);
    app.emit(config.events.CLOSED);
    app.quit();
  };

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on(config.events.READY, createWindow)