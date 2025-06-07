/***
 * 一个总的管理器
 */
import ElementsMediator from '../mediator/ElementsMediator';
import { CanvasDrawOptions } from '../../types';

export default class CanvasDrawManager {

  ctx: CanvasRenderingContext2D; // 画布的上下文对象
  elementsMediator: ElementsMediator; // 元素中间件，用于管理和协调元素

  constructor(options: CanvasDrawOptions) {
    this.ctx = options.ctx;
    this.elementsMediator = new ElementsMediator(options.ctx);
  }
}