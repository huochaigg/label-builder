import BaseElement, { BaseElementOptions } from './BaseElements';
import { ElementType, DrawElementPartial } from '../../types';

export interface EwmElementOptions extends BaseElementOptions {
  /** 元素类型 */
  type: ElementType.二维码;
  /** 尺寸 */
  size: number;
  /** 纠错等级 */
  level: 'L' | 'M' | 'Q' | 'H';
  /** 容错率 */
  errorCorrection: number;
  /** 二维码内容 */
  content: string;
  /** 二维码颜色 */
  color: string;
  /** 二维码背景颜色 */
  backgroundColor: string;
  /** 二维码边距 */
  margin: number;
}

export default class ImagesElements extends BaseElement<EwmElementOptions> {
  
  constructor(ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial) {
    super(ctx, drawJSON);
    this.options = {
      ...this.options,
      type: ElementType.二维码, // 元素类型
      size: 100, // 默认尺寸
      level: 'M', // 默认纠错等级
      errorCorrection: 0.1, // 默认容错率
      content: 'Z12345678', // 二维码内容
      color: '#000000', // 二维码颜色
      backgroundColor: '#FFFFFF', // 二维码背景颜色
      margin: 4, // 二维码边距

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