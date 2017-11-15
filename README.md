# whizzimo-app
Whizzimo Desktop Client for Windows

# Developers notes
## Configurations
The desktop client contains a `app.config.js` file to configure the application. As such any modifications to the configurations should NOT be made in `index.js`, but instead in the `app.config.js` file for smooth configurations. Any future configurations should be made in the `config` object as follows:
```javascript
const config = {
  .......
  CONFIGURATION_GOES_HERE: CONFIG_VAL_GOES_HERE
}
```
Then export the config object in addtional scripts:
```javascript
const config = require('./app.config')();
```
## How to use
 * install npm dependenices using `npm install`
 * then run the same command in the `whizzimo-source` directory
 * Run `npm run start` to start the app and make changes to code where neccessary
## Menu Templating
Each menu for the menubar and the tray icon menu [removed] has a menu template in the `whizzimo-source/templates` directory. Each file must be ended with `.template.js` to denote templates and future templates except HTML files must be placed in the `whizzimo-source/templates` directory.
## Testing 
To create tests for the app use the [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/) Testing frameworks for unit testing and [Spectron](https://electron.atom.io/spectron/) for integration testing the electron UI (already included). Be sure to place the test files in the `whizzimo-source/test` directory and name the files with the `.spec.js` file extension for consistency. Run each test with the `npm test` command.

## References
[Electron Docs](https://electron.atom.io/docs/) -- Electron Framework Documentation<br />
[Node.js Docs](https://nodejs.org/en/docs/) -- Node.js Documentation

