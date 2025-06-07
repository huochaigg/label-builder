import ControllerMediator from '../mediator/ControllerMediator';
import ElementsMediator from '../mediator/ElementsMediator';
import { ElementType } from '../../types';


export default abstract class BaseElement {
  abstract type: ElementType; // 元素类型
  abstract id: string; // 元素唯一标识符
  abstract x: number; // 元素的x坐标
  abstract y: number; // 元素的y坐标
  abstract width: number; // 元素的宽度
  abstract height: number; // 元素的高度
  abstract rotate: number; // 元素的旋转角度（以弧度为单位）

  abstract draw(ctx: CanvasRenderingContext2D): void; // 绘制元素的方法
  abstract isHit(x: number, y: number): boolean; // 检测鼠标是否点击在元素上

  ctx: CanvasRenderingContext2D | null; // 画布的上下文对象
  controller: ControllerMediator; // 用于存储控制器实例
  middleWare: ElementsMediator | null = null; // 控制器中间件实例

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx; // 初始化画布的上下文对象
    this.controller = new ControllerMediator(); // 初始化控制器中间件
  }

  setMiddleWare(middleWare: ElementsMediator): void {
    this.middleWare = middleWare; // 设置控制器中间件
  }


}

