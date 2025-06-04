import { app, BrowserWindow, Menu } from "electron";
import path from "node:path";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const isDebug = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
if (isDebug) {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
}
let win;
function createMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: process.platform === "darwin" ? "Cmd+Option+I" : "Ctrl+Shift+I",
          click: () => {
            if (win) {
              win.webContents.toggleDevTools();
            }
          }
        },
        {
          role: "reload"
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
function createWindow() {
  if (win) {
    return;
  }
  win = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  createMenu();
  console.log("isDebug", isDebug);
  if (isDebug && win) {
    win?.webContents.toggleDevTools();
  }
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.on("closed", () => {
    console.log("Window closed");
    win = null;
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  console.log("App activated");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(async () => {
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
