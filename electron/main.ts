import { app, BrowserWindow } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Menu } from 'electron'
import { registerEvents } from './ipc/handleEvent.js'
import dotenv from 'dotenv';

dotenv.config(); // 读取 .env 文件中的环境变量

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

const isDebug =
process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

if (isDebug) {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
}

let win: BrowserWindow | null

function createMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: process.platform === 'darwin' ? 'Cmd+Option+I' : 'Ctrl+Shift+I',
          click: () => {
            if (win) {
              win.webContents.toggleDevTools()
            }
          },
        },
        {
          role: 'reload',
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function createWindow() {
  console.log('process.env.WINDOW_WIDTH', process.env.WINDOW_WIDTH)
  win = new BrowserWindow({
    width: process.env.WINDOW_WIDTH ? parseInt(process.env.WINDOW_WIDTH) : 1200,
    height: process.env.WINDOW_HEIGHT ? parseInt(process.env.WINDOW_HEIGHT) : 1000,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  createMenu() // 添加菜单
  if (isDebug && win) {
    win?.webContents.toggleDevTools()
  }
  
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.事件
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

registerEvents();

app.whenReady().then(createWindow)
