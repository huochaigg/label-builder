/***
 * 一个总的管理器
 */
import ElementsMediator from '../mediator/ElementsMediator';
import { CanvasDrawOptions } from '../../types';
import utils from '../../utils';

export default class CanvasDrawManager {

  ctx: CanvasRenderingContext2D; // 画布的上下文对象
  elementsMediator: ElementsMediator; // 元素中间件，用于管理和协调元素

  constructor(options: CanvasDrawOptions) {
    this.ctx = options.ctx;
    this.elementsMediator = new ElementsMediator(options.ctx);
  }

  /** 
   * 初始化canvas
   * 根据传入的宽度和高度，计算出适合的画布大小，并设置设备像素比。
   * 根据宽度自适应高度，宽度为500px。
   * @param canvas - HTMLCanvasElement 实例
   * @param width - 标签的宽度
   * @param height - 标签的高度
   * @return {CanvasRenderingContext2D | null} 返回 CanvasRenderingContext2D 实例或 null
   * @throws {Error} 如果无法获取 CanvasRenderingContext2D，则抛出错误
   * */ 
  static initializeCanvas(canvas: HTMLCanvasElement, width: number, height: number): CanvasRenderingContext2D | null {
    const dpr = utils.getDPR();
    const proportion = width / height;

    const adjustedWidth = 500; // 固定宽度
    const adjustedHeight = adjustedWidth / proportion;

    canvas.width = adjustedWidth * dpr;
    canvas.height = adjustedHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    return ctx;
  }
}