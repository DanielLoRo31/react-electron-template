const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
let splash;

app.on("ready", () => {
  // create main browser window
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 1000,
    minHeight: 750,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false, // don't show the main window
  });
  // create a new `splash`-Window
  splash = new BrowserWindow({
    width: 610,
    height: 320,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: true,
    },
  });
  //   splash.loadURL(`file://${path.join(__dirname, "../build/splash.html")}`);
  splash.loadURL(
    isDev
      ? `file://${path.join(__dirname, "/splash.html")}`
      : `file://${path.join(__dirname, "../build/splash.html")}`
  );
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.removeMenu();

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once("ready-to-show", () => {
    splash.destroy();
    mainWindow.show();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
