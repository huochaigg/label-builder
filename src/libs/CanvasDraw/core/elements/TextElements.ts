import BaseElements from './BaseElements';
import { createSymbol } from '../../utils/constants';
import { ElementType, DrawElementPartial } from '../../types';
export default class TextElement extends BaseElements {
  type = ElementType.文本; // 元素类型
  id = createSymbol(); // 元素唯一标识符
  x = 0; // 元素的x坐标
  y = 0; // 元素的y坐标
  width = 100; // 元素的宽度
  height = 30; // 元素的高度
  text = '请输入文本'; // 文本内容
  rotate = 0; // 元素的旋转角度（以弧度为单位）

  draw(drawJSON?: DrawElementPartial): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }
    this.ctx.save();
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#000';
    this.ctx.fillText(this.text, this.x, this.y + 16); // 绘制文本，y坐标加上字体高度的一半
    this.ctx.restore();
  }
  
}