import ControllerMediator from '../mediator/ControllerMediator';
import ElementsMediator from '../mediator/ElementsMediator';
import { ElementType, DrawElementPartial } from '../../types';
import { createSymbol } from '../../utils/constants';

export interface BaseElementOptions {
  id: string; // 元素唯一标识符
  type: ElementType; // 元素类型
  x: number; // 元素的x坐标
  y: number; // 元素的y坐标
  rotate: number; // 元素的旋转角度（以弧度为单位）
}

export default abstract class BaseElement<T extends Partial<BaseElementOptions>> {
  options:T & { id: string } = {
    id: createSymbol(), // 元素唯一标识符，使用 createSymbol 生成唯一 ID
  } as T & { id: string };
  
  ctx: CanvasRenderingContext2D | null; // 画布的上下文对象
  controller: ControllerMediator; // 用于存储控制器实例
  middleWare: ElementsMediator | null = null; // 控制器中间件实例
  abstract draw(): void; // 绘制元素的方法

  constructor(ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial) {
    this.ctx = ctx; // 初始化画布的上下文对象
    this.options = { ...this.options, ...drawJSON }; // 合并默认选项和传入的选项
    this.controller = new ControllerMediator(); // 初始化控制器中间件
    if (drawJSON) {
      this.draw() 
    }
  }

  setMiddleWare(middleWare: ElementsMediator): void {
    this.middleWare = middleWare; // 设置控制器中间件
  }
}

