export abstract class CanvasElement {
  abstract type: string; // 元素类型
  abstract id: string; // 元素唯一标识符
  abstract x: number; // 元素的x坐标
  abstract y: number; // 元素的y坐标
  abstract width: number; // 元素的宽度
  abstract height: number; // 元素的高度
  abstract rotate: number; // 元素的旋转角度（以弧度为单位）

  abstract draw(ctx: CanvasRenderingContext2D): void; // 绘制元素的方法
  abstract isHit(x: number, y: number): boolean; // 检测鼠标是否点击在元素上

  abstract controllers: WeakMapConstructor; // 控制器的WeakMap，用于存储控制器实例
  abstract clearController(): void; // 清除控制器的方法
  abstract drawController(): void; // 绘制控制器的方法
}

// WeakMap 有哪些方法? 
// WeakMap 的方法有：
// 1. set(key, value): 将键值对添加到 WeakMap 中。
// 2. get(key): 根据键获取对应的值。
// 3. has(key): 检查 WeakMap 中是否存在指定的键。
// 4. delete(key): 删除 WeakMap 中指定的键及其对应的值。
