/*
 * Construct the menu template for the main window
 */
const {
  BrowserWindow,
  shell,
  dialog
} = require("electron"),
  renderer = require("../renderer"), {
    checkUpdates
  } = require('../util/autoupdater');

const config = require("../app.config")();

const getMenuTemplate = (window, app) => {
  const template = [{
    label: "View",
    submenu: [{
      accelerator: "CmdOrCtrl+=",
      role: "zoomin"
    },
    {
      role: "zoomout"
    },
    {
      label: "Refresh",
      accelerator: "CmdOrCtrl+R",
      click() {
        if (window) {
          // on reload start fresh and close any
          // old open secondary windows
          if (window.id === 1) {
            BrowserWindow.getAllWindows().forEach(win => {
              if (win.id > 1) {
                win.close();
              }
            });
          }
          renderer.checkConnection(window);
        }
      }
    },
    {
      label: "Toggle Full Screen",
      accelerator: (() => {
        if (process.platform === config.env.DARWIN) {
          return "Ctrl+Cmd+F";
        }

        return "F11";
      })(),
      click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    }
    ]
  },
  {
    label: "Window",
    role: "window",
    submenu: [{
      label: "Minimize",
      accelerator: "CmdOrCtrl+M",
      role: "minimize"
    }]
  },
  {
    label: "Help",
    role: "help",
    submenu: [{
      label: `Learn more about ${config.title}`,
      click() {
        shell.openExternal(config.env.ABOUT_URL);
      }
    },
    {
      label: "About",
      click() {
        dialog.showMessageBox(window, config.aboutDiagSettings(app));
      }
    },
    {
      label: "Check for Updates",
      key: "checkForUpdates",
      click() {
        checkUpdates();
      }
    }
    ]
  }
  ];

  if (config.Developer_mode === true) {
    template.push({
      'label': 'Tools',
      submenu: [{
        label: "Toggle Developer Tools",
        accelerator: (() => {
          if (process.platform === config.env.DARWIN) {
            return 'Alt+Command+I';
          } else {
            return 'Ctrl+Shift+I';
          }
        })(),
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      }]
    })
  }
  if (process.platform === config.env.DARWIN) {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [{
        label: `About ${name}`,
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        role: 'services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: `Hide ${name}`,
        accelerator: 'Command+H',
        role: 'hide'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      }, {
        label: 'Show All',
        role: 'unhide'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    });
    // Window menu.
    template[2].submenu.push({
      type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
      });
  } else if (process.platform === config.env.WIN) {
    template.unshift({
      label: "File",
      submenu: [{
        label: "Close",
        click() {
          renderer.closeApp(app);
        }
      }]
    });
  }

  return template;
};

module.exports = {
  getMenuTemplate
};