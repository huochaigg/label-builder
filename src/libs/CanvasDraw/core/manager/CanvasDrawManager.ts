/***
 * 一个总的管理器
 */
import ElementsMediator from '../mediator/ElementsMediator';
import { CanvasDrawOptions, CanvasDrawJSON } from '../../types';
import utils from '../../utils';

export default class CanvasDrawManager {

  elementsMediator: ElementsMediator | null = null; // 元素中间件，用于管理和协调元素
  private options: CanvasDrawOptions; // 画布绘制选项
  private ctx: CanvasRenderingContext2D | null = null; // 画布的上下文对象
  
  constructor(options: CanvasDrawOptions) {
    this.options = options;
    this.ctx = options.ctx;
    // 初始化画布
    CanvasDrawManager.initializeCanvas(
      options.ctx,
      options.width,
      options.height
    );
    if (!this.ctx) {
      console.error('无法获取 CanvasRenderingContext2D，请检查 canvas 元素是否正确初始化');
      return;
    } 
    // 创建元素中间件实例
    this.elementsMediator = new ElementsMediator(this.ctx);
  }

  /** 获取当前canvas绘制标签的JSON对象 */
  getDrawJSON(): CanvasDrawJSON | null {
    // TODO
    return null;
  }

  /** 获取当前canvas的base64对象 */
  getDrawBase64(): string {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return '';
    }
    return utils.getCanvasBase64(
      this.ctx, 
      this.options.width, 
      this.options.height
    ) || '';
  }

  /** 根据DrawJSON对象默认绘制canvas */
  drawFromJSON(json: CanvasDrawJSON): void {
    if (!json || !json.elements || json.elements.length === 0) {
      console.warn('没有可绘制的元素');
      return;
    }

    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }

    // 清空当前画布
    this.ctx.clearRect(0, 0, this.options.width, this.options.height);

    // 遍历元素并绘制
    this.elementsMediator?.drawElements(json.elements);
  } 

  /** 
   * 初始化canvas
   * 根据传入的宽度和高度，计算出适合的画布大小，并设置设备像素比。
   * 根据宽度自适应高度，宽度为500px。
   * @param ctx - CanvasRenderingContext2D
   * @param width - 标签的宽度
   * @param height - 标签的高度
   * @return {CanvasRenderingContext2D | null} 返回 CanvasRenderingContext2D 实例或 null
   * @throws {Error} 如果无法获取 CanvasRenderingContext2D，则抛出错误
   * */ 
  static initializeCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const dpr = utils.getDPR();
    const proportion = width / height;

    const adjustedWidth = 500; // 固定宽度
    const adjustedHeight = adjustedWidth / proportion;

    ctx.canvas.width = adjustedWidth * dpr;
    ctx.canvas.height = adjustedHeight * dpr;
  }
}