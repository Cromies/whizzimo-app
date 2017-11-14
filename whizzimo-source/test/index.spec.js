const assert = require('assert'),
    path = require('path'),
    { Application } = require('spectron'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    { env } = require('../util/env');
    
chai.should();
chai.use(chaiAsPromised);

// Paths
const dirName = path.join(__dirname, '..');
let electronExe = path.join(dirName, 'node_modules', '.bin', 'electron');

if (process.platform === "win32") {
    electronExe += ".cmd";
}

const sleep = sleepTime => new Promise(r => setTimeout(r, sleepTime));

describe('Application Launch', function () {
    this.timeout(10000);

    let app = null;

    before(() => {
        app = new Application({
            path: electronExe,
            args: [dirName],
            requireName: 'electronRequire'
        });

        return app.start();
    });

    beforeEach(() => {
        chaiAsPromised.transferPromiseness = app.transferPromiseness;
    });
    
    after(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('Shows an initial window', async () => {
        await app.client.waitUntilWindowLoaded()
            .getWindowCount().should.eventually.equal(1)
            .browserWindow.isMinimized().should.eventually.be.false
            .browserWindow.isDevToolsOpened().should.eventually.be.false
            .browserWindow.isVisible().should.eventually.be.true
            .browserWindow.isMovable().should.eventually.be.true
            .browserWindow.isFullScreenable().should.eventually.be.true
            .browserWindow.isClosable().should.eventually.be.true
            .browserWindow.isMaximizable().should.eventually.be.true
            .browserWindow.isMinimizable().should.eventually.be.true
            .browserWindow.isFocused().should.eventually.be.true
            .browserWindow.getBounds().should.eventually.have.property('width').and.be.equals(1014)
            .browserWindow.getBounds().should.eventually.have.property('height').and.be.equals(768)
    });

    it('Has title of Whizzimo', async () => {
        await app.client.getTitle()
            .then(title => assert.deepStrictEqual(title, 'Whizzimo'));
        await app.webContents.getURL()
            .then(page => assert.deepStrictEqual(page, env.URL));
    });

    it('logs in a user', async () => {
        await sleep(3000);
        await app.client.setValue('input[type="email"]', env.LOGIN);
        await app.client.setValue('input[type="password"]', env.PASS);
        await app.client.submitForm('.auth0-lock-widget');
        await app.client.waitUntilWindowLoaded();
        await sleep(6000);
    });

    it('has reached the main page', async () => {
        await app.webContents.getURL()
            .then(page => assert.deepStrictEqual(page, env.MAIN_PAGE));
    });

    it('logs a user out', async () => {
        await sleep(2000);
        await app.client.click('div.nav-menu,li.fa.fa-bars');        
        //await app.client.click('li.loggout');
    });
});