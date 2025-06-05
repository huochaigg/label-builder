import { CanvasElement } from './BaseElements';
import { createSymbol } from '../utils/canvas';

export default class TextElement extends CanvasElement {
  type = 'text'; // 元素类型
  id = createSymbol(); // 元素唯一标识符
  x = 0; // 元素的x坐标
  y = 0; // 元素的y坐标
  width = 100; // 元素的宽度
  height = 30; // 元素的高度
  text = '请输入文本'; // 文本内容
  rotate = 0; // 元素的旋转角度（以弧度为单位）

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(this.text, this.x, this.y + 16); // 绘制文本，y坐标加上字体高度的一半
    ctx.restore();
  }
  
  isHit(x: number, y: number): boolean {
    // 检测鼠标是否点击在文本元素上
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y - this.height && // 考虑到文本的高度
      y <= this.y
    );
  }
}