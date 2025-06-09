import BaseElements, { BaseElementOptions } from './BaseElements';
import { ElementType, DrawElementPartial, PanelRenderJSONType } from '../../types';

export interface TextElementOptions extends BaseElementOptions {
  /** 元素位置 */
  x: number;
  y: number;
  /** 元素实际高度，文本内容高度 */
  height: number;
  /** 元素最大宽度 */
  maxWidth: number;
  /** 元素最大高度，isWrap=true时生效 */
  maxHeight: number;
  /** 是否换行 */
  isWrap: boolean;
  /** 元素类型 */
  type: ElementType.文本;
  /** 文本内容 */
  text: string; 
  /** 字体大小 */
  fontSize: number;
  /** 行数 */
  lineCount: number;
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
      isWrap: false, // 是否换行
      maxWidth: 100, // 元素最大宽度
      maxHeight: 100, // 元素最大高度，isWrap=true时生效
      type: ElementType.文本, // 元素类型
      text: '请输入文本内容', // 文本内容
      fontSize: 16, // 字体大小
      fontFamily: 'Arial', // 字体类型
      fontColor: '#000', // 字体颜色
      textAlign: 'left', // 文本对齐方式
      textBaseline: 'middle', // 文本垂直对齐方式
      lineHeight: 1.5, // 文本行高
      textWidth: 100, // 文本内容宽度
      lineCount: 1, // 行数
    }

    this.draw();
  }

  /**
   * 获取换行后的文本内容
   * @param text - 要处理的文本内容
   * @returns 换行后的文本数组
   */
  getWrapLineText(text: string): string[] {
    const lines: string[] = [];
    let currentLine = '';
    let currentLineWidth = 0;
    text.split('').forEach((char) => {
      const charWidth = this.ctx!.measureText(char).width; // 获取字符宽度
      currentLine += char;
      currentLineWidth += charWidth; // 累加当前行宽度
      if (currentLineWidth > this.options.maxWidth) {
        lines.push(currentLine.slice(0, -1)); // 将当前行添加到结果中，去掉最后一个字符
        currentLine = ''; // 开始新的一行
        currentLineWidth = 0; // 重置当前行宽度
      }
    });
    return lines;
  }

  draw(): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }
    console.log('绘制文本元素', this.options, this.ctx);
    this.ctx.save();
    this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`; // 设置字体样式
    this.ctx.textAlign = this.options.textAlign || 'left'; // 设置文本对齐方式
    this.ctx.textBaseline = this.options.textBaseline || 'top'; // 设置文本垂直对齐方式
    this.ctx.fillStyle = this.options.fontColor || '#000'; // 设置字体颜色
    if (this.options.isWrap) {
      const lineHeight = this.options.fontSize * this.options.lineHeight; // 设置文本行高
      const wrapLines = this.getWrapLineText(this.options.text); // 获取换行后的文本内容
      this.options.lineCount = wrapLines.length; // 更新行数
      this.options.height = lineHeight * this.options.lineCount; // 更新元素高度
      wrapLines.forEach((line, index) => {
        this.ctx!.fillText(line, this.options.x, this.options.y + index * lineHeight + this.options.fontSize);
      });
    } else {
      this.ctx.fillText(this.options.text, this.options.x, this.options.y); // 绘制文本，
    }
    this.ctx.restore();
  }
  
  isHit(x: number, y: number): boolean {
    const { x: elementX, y: elementY, fontSize } = this.options;
    // 检查鼠标位置是否在文本元素的范围内
    return (
      x >= elementX &&
      x <= elementX + this.options.textWidth &&
      y >= elementY - fontSize / 2 &&
      y <= elementY + fontSize / 2
    );
  }

  /**
   * 获取元素的表单数据
   * @returns 元素的表单数据
   */
  getFormData(): PanelRenderJSONType[] {
    return []
  }
}