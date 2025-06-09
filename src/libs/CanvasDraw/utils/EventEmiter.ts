/**
 * 一个发布订阅模式的事件类
 **/
export default class EventEmiter<T extends (...args: unknown[]) => void, E extends string> {
  private listeners: { [key: string]: T[] } = {};

  // 添加事件监听器
  on(event: E, listener: T): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  // 移除事件监听器
  off(event: E, listener: T): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  // 发布事件
  emit(event: E, ...args: unknown[]): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(listener => listener(...args));
  }

  // 清除所有事件监听器
  clear(): void {
    this.listeners = {};
  } 
}