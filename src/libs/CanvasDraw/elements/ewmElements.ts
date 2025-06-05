import { CanvasElement } from './elements';
import { createSymbol } from '../utils/canvas';

export default class EwmElement extends CanvasElement {
  type = 'ewm'; // 元素类型：二维码
  id = createSymbol(); // 元素唯一标识符
  width = 100; // 元素的宽度
  height = 100; // 元素的高度
  x = 10; // 元素的x坐标
  y = 10; // 元素的y坐标
  text = '12345678'; // 二维码内容
  rotate = 0; // 元素的旋转角度（以弧度为单位）

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = '#fff'; // 设置二维码背景色
    ctx.fillRect(this.x, this.y, this.width, this.height); // 绘制背景矩形
    ctx.fillStyle = '#000'; // 设置二维码颜色

    ctx.restore();
  }
  
  isHit(x: number, y: number): boolean {
    // 检测鼠标是否点击在二维码元素上
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y - this.height && 
      y <= this.y
    );
  }
}