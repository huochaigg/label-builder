import ControllerMiddleWare from "../mediator/ControllerMediator";
import { DrawElement } from "../../types";

export default abstract class BaseController {
  element: DrawElement | null = null; // 画布元素
  iconSize = 20; // 图标大小
  x = 0; // 图标左定位
  y = 0; // 图标上定位
  middleWare: ControllerMiddleWare | null = null; // 控制器中间件实例

  constructor(element: DrawElement) {
    this.element = element;
  }

  /**
   * 绘制控制器图标
   */
  drawController(): void {
    if (!this.ctx || !this.element) return;

    this.ctx.save();
    this.drawIcon(); // 调用子类实现的绘制图标方法
    this.ctx.restore();
  }

  /**
   * 清除控制器图标
   */
  clearController(): void {
    if (!this.ctx || !this.element) return;

    this.ctx.save();
    this.ctx.clearRect(this.x, this.y, this.iconSize + this.x, this.iconSize + this.y);
    this.ctx.restore();
  }

  /**
   * 设置控制器中间件
   * @param middleWare - 控制器中间件实例
   */
  setMiddleWare(middleWare: ControllerMiddleWare): void {
    this.middleWare = middleWare;
  }

  /**
   * 获取上下文
   */
  get ctx(): CanvasRenderingContext2D | null {
    return this.element ? this.element.ctx : null;
  }

  /**
   * 获取图标路径
   */
  get icon(): string {
    return ''; // 子类实现具体的图标路径
  }

  /**
   * 子类需要实现的绘制图标方法
   */
  abstract drawIcon(): void;
}