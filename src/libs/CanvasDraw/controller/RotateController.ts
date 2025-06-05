/***
 * RotateController
 * @description 控制器，用于绘制缩放图标
 */

import BaseController from './BaseController'
import BaseElement from '../elements/BaseElements';
import ControllerMiddleWare from '../elements/ControllerMiddleWare';

import RotateIcon from '../../assets/images/rotate.png';
import RotateDarkIcon from '../../assets/images/rotate_dark.png';

export default class RotateController extends BaseController {
  element: BaseElement | null = null;
  iconSize = 20;
  x = 0;
  y = 0;
  middleWare: ControllerMiddleWare | null = null;

  constructor(element: BaseElement) {
    super();
    this.element = element;
    this.iconSize = 20; // 图标大小    
    if (this.element && this.ctx) {
      this.drawController();
    }
  }

  /**
   * 绘制控制器图标
   */
  drawController(): void {
    if (!this.ctx || !this.element) return;

    // 绘制缩放图标
    this.ctx.save();
    // this.ctx. // TODO
    this.ctx.restore();
  }

  /**
   * 清除控制器图标
   */
  clearController(): void {
    if (!this.ctx || !this.element) return;

    // 清除控制器图标,只清除控制器图标而不影响画布上的其他内容
    this.ctx.save();
    this.ctx.clearRect(this.x, this.y, this.iconSize + this.x, this.iconSize + this.y);
    this.ctx.restore();
  }

  /**
   * 设置控制器中间件
   * @param middleWare - 控制器中间件实例
   * @description 用于注册控制器到中间件
   */
  setMiddleWare(middleWare: ControllerMiddleWare): void {
    this.middleWare = middleWare;
  }

  get ctx(): CanvasRenderingContext2D | null {
    return this.element ? (this.element as unknown as BaseElement).ctx : null;
  }

  get icon(): string {
    // 返回删除图标的路径
    return process.env.THEME === 'light' ? RotateIcon : RotateDarkIcon;
  }
}