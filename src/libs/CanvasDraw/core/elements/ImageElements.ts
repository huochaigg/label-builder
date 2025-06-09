import BaseElement, { BaseElementOptions } from './BaseElements';
import { ElementType, DrawElementPartial, PanelRenderJSONType } from '../../types';

export interface ImageElementOptions extends BaseElementOptions {
  /** 元素类型 */
  type: ElementType.图片;
  /** 元素的宽度 */
  width: number;
  /** 元素的高度 */
  height: number;
}

export default class ImagesElements extends BaseElement<ImageElementOptions> {
  
  constructor(ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial) {
    super(ctx, drawJSON);
    this.options = {
      ...this.options,
      type: ElementType.图片, // 元素类型
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

  isHit(x: number, y: number): boolean {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return false;
    }
    // 检查点击位置是否在元素范围内
    const { x: elementX, y: elementY, width, height } = this.options;
    return x >= elementX && x <= elementX + width && y >= elementY && y <= elementY + height;
  }

  /**
   * 获取元素的表单数据
   * @returns 元素的表单数据
   */
  getFormData(): PanelRenderJSONType[] {
    return []
  }
}