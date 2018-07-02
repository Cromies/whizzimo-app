const installer = require("electron-winstaller");

installer.createWindowsInstaller({
        appDirectory: "./whizzimo-source/dist/win-unpacked/",
        outputDirectory: "./whizzimo-installer/",
        authors: "Whizzimo, LLC",
        exe: "Whizzimo.exe",
        version: "1.0.23",
        title: "Whizzimo Desktop",
        name: "com.prolificrew.whizzimo",
        certificateFile: "./whizzimo-source/certs/whizzimo.pfx",
        certificatePassword: "Whizzardedu@7851",
        iconUrl: "https://raw.githubusercontent.com/loturner/whizzimo-app/master/icon.ico",
        setupIcon: "./icon.ico",
        setupExe: "Whizzimo-Setup.exe",
        noMsi: true,
        remoteReleases: "https://edu.whizzimo.com/app/"
    })
    .then(() => {
        console.log("Build Success");
    }, e => {
        console.log(`Build Failed here's why: ${e.message}`);
    });