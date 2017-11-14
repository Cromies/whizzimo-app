const renderer = require('../renderer');

const getTrayMenuTemplate = (app, win) => {
    let trayTemplate = [
        {
            label: 'Show Window',
            click () {
                win.restore();
            }
        },
        {
            label: 'Hide Window',
            click () {
                win.minimize();
            }
        },
        {
            label: 'Close',
            click () {
              renderer.closeApp(app);
            }
        }
    ];

    return trayTemplate;
};

module.exports = { getTrayMenuTemplate };