import { ipcMain } from 'electron';
type ConsoleMethod = 'log' | 'warn' | 'error' | 'info' | 'debug';

export function registerEvents() {
  ipcMain.on('log-event', (_e, { type, content }: { type: ConsoleMethod, content: unknown }) => {
    console[type || 'log'](content);
  }),
  ipcMain.handle('app:get-version', () => {
    return { version: '1.0.0' }; 
  }),
  ipcMain.handle('select:img', () => {
    return { version: '1.0.0' }; 
  })
}
