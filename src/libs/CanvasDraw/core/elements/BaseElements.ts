import ControllerMiddleWare from '../mediator/ControllerMediator';

export default abstract class BaseElement {
  abstract type: string; // 元素类型
  abstract id: string; // 元素唯一标识符
  abstract x: number; // 元素的x坐标
  abstract y: number; // 元素的y坐标
  abstract width: number; // 元素的宽度
  abstract height: number; // 元素的高度
  abstract rotate: number; // 元素的旋转角度（以弧度为单位）
  abstract ctx: CanvasRenderingContext2D | null; // 画布的上下文对象

  abstract draw(ctx: CanvasRenderingContext2D): void; // 绘制元素的方法
  abstract isHit(x: number, y: number): boolean; // 检测鼠标是否点击在元素上

  abstract controllers: ControllerMiddleWare; // 控制器的WeakMap，用于存储控制器实例
}

