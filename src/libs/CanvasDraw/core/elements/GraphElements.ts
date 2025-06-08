import BaseElement, { BaseElementOptions } from './BaseElements';
import { ElementType, DrawElementPartial } from '../../types';

export interface GraphElementOptions extends BaseElementOptions {
  /** 元素类型 */
  type: ElementType.图形;
  /** 元素的宽度 */
  width: number;
  /** 元素的高度 */
  height: number;
}

export default class GraphElements extends BaseElement<GraphElementOptions> {
  
  constructor(ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial) {
    super(ctx, drawJSON);
    this.options = {
      ...this.options,
      type: ElementType.图形, // 元素类型
      width: 100, // 元素的宽度
      height: 100, // 元素的高度
    }
  }

  draw(): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }
    this.ctx.save();

    this.ctx.restore();
  }

}