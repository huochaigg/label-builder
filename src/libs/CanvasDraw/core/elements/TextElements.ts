import BaseElements, { BaseElementOptions } from './BaseElements';
import { ElementType, DrawElementPartial } from '../../types';

export interface TextElementOptions extends BaseElementOptions {
  /** 元素位置 */
  x: number;
  y: number;
  /** 元素类型 */
  type: ElementType.文本;
  /** 文本内容 */
  text: string; 
  /** 字体大小 */
  fontSize: number;
  /** 字体类型 */
  fontFamily: string;
  /** 字体颜色 */
  fontColor: string;
  /** 文本对齐方式 */
  textAlign: CanvasTextAlign;
  /** 文本垂直对齐方式 */
  textBaseline: CanvasTextBaseline;
  /** 文本行高 */
  lineHeight: number;
  /** 文本内容宽度，超出隐藏或换行 */
  textWidth: number;
}
export default class TextElement extends BaseElements<TextElementOptions> {
  constructor(ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial) {
    super(ctx, drawJSON);
    this.options = {
      ...this.options,
      x: 20,
      y: 20, // 元素位置
      type: ElementType.文本, // 元素类型
      text: '请输入文本内容', // 文本内容
      fontSize: 16, // 字体大小
      fontFamily: 'Arial', // 字体类型
      fontColor: '#000', // 字体颜色
      textAlign: 'left', // 文本对齐方式
      textBaseline: 'middle', // 文本垂直对齐方式
      lineHeight: 1.5, // 文本行高
      textWidth: 100, // 文本内容宽度
    }

    this.draw();
  }

  draw(): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }
    console.log('绘制文本元素', this.options, this.ctx);
    this.ctx.save();
    this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`; // 设置字体样式
    this.ctx.fillStyle = '#000';
    this.ctx.fillText(this.options.text, this.options.x, this.options.y); // 绘制文本，y坐标加上字体高度的一半
    this.ctx.restore();
  }
  
}