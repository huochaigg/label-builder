import ElementsMediator from '../mediator/ElementsMediator';
import { CanvasDrawOptions, CanvasDrawJSON, DrawElementPartial, ElementType, EventType, EventOptions } from '../../types';
import utils from '../../utils';
import EventEmiter from '../../utils/EventEmiter';
/***
 * 一个总的管理器
 * 用于管理和协调画布绘制的各个方面，包括元素的创建、绘制和获取JSON数据等。
 * 
 * @param {Object} options - 画布绘制选项，包括上下文、宽度和高度等。
 * @param {CanvasRenderingContext2D} options.ctx - CanvasRenderingContext2D 实例，用于绘制元素。
 * @param {number} [options.width=500] - 画布的宽度，默认为 500px。
 * @param {number} [options.height] - 画布的高度，根据宽度自适应计算
 */
export default class CanvasDrawManager {

  elementsMediator: ElementsMediator | null = null; // 元素中间件，用于管理和协调元素
  eventEmitter: EventEmiter<(...args: unknown[]) => void, EventType> = new EventEmiter(); // 事件发布订阅模式
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
    return {
      width: this.options.width,
      height: this.options.height,
      elements: this.elementsMediator?.getAllElements().map(element => element.options) || []
    }
  }

  /** 获取当前canvas的base64对象 */
  getDrawBase64(): string {
    return utils.getCanvasBase64(
      this.ctx as CanvasRenderingContext2D, 
      this.options.width, 
      this.options.height
    );
  }

  /** 
   * 根据DrawJSON对象默认绘制canvas
   * @param drawJson - CanvasDrawJSON 对象
   * @throws {Error} 如果元素JSON对象不包含elements属性，则抛出错误
   */
  drawFromJSON(drawJson: CanvasDrawJSON): void {
    this.elementsMediator?.drawElements(drawJson.elements);
  } 

  /** 
   * 根据DrawJSON某个对象来单独绘制
   * @param elementJSON - DrawElementPartial 对象
   * @throws {Error} 如果元素JSON对象不包含type属性，则抛出错误
   */
  drawFromJSONElement(elementJSON: DrawElementPartial): void {
    this.elementsMediator?.drawElements([elementJSON]);
  }

  /** 
   * 创建一个新的元素
   * @param type - 元素类型
   */
  createElement(type: ElementType): void {
    this.elementsMediator?.crateElement(type);
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

  /** 订阅 */
  subscribe(callback: (res: EventOptions) => void): void {
    const currentElement = this.elementsMediator?.getCurrentElement();
    const resultData: EventOptions['data'] = {
      currentElement: currentElement?.options,
      form: this.elementsMediator?.getCurrentElement()?.getFormData()
    }
    this.eventEmitter.on(EventType.元素选中, () => {
      callback({ 
        type: EventType.元素选中, 
        data: resultData
      });
    });
    this.eventEmitter.on(EventType.元素取消选中, () => {
      callback({ 
        type: EventType.元素取消选中, 
        data: resultData
      });
    });
    this.eventEmitter.on(EventType.元素清除, () => {
      callback({ 
        type: EventType.元素清除, 
        data: resultData
      });
    });
    this.eventEmitter.on(EventType.元素复制, () => {
      callback({ 
        type: EventType.元素复制, 
        data: resultData
      });
    });
    this.eventEmitter.on(EventType.元素粘贴, () => {
      callback({ 
        type: EventType.元素粘贴, 
        data: resultData
      });
    });
  }

  /** 销毁 */
  destory(): void {
    if (this.elementsMediator) {
      this.elementsMediator.clearElements(); // 清除所有元素
      this.elementsMediator = null; // 清空元素中间件
    }
    this.ctx = null; // 清空上下文对象
    this.eventEmitter.clear(); // 清空事件订阅
  }
}