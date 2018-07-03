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
      label: "File",
      submenu: [{
        label: "Close",
        click() {
          if (process.platform === config.env.DARWIN) {
            app.emit(config.events.CLOSED);
          }
          renderer.closeApp(app);
        }
      }]
    },
    {
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
          label: "Toggle Developer Tools",
          accelerator: "CmdOrCtrl+Shift+I",
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools()
            }
          },
          visible: false
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

  if (process.platform === config.env.DARWIN) {
    template.unshift();
  }

  return template;
};

module.exports = {
  getMenuTemplate
};