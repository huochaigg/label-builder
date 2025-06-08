import BaseElement from './BaseElements';
import { createSymbol } from '../../utils/constants';
import { ElementType, DrawElementPartial } from '../../types';

export default class ImageElement extends BaseElement {
  type = ElementType.图形; // 元素类型：图片
  id = createSymbol(); // 元素唯一标识符
  width = 100; // 元素的宽度
  height = 100; // 元素的高度
  x = 10; // 元素的x坐标
  y = 10; // 元素的y坐标
  text = 'Z12345678'; // 二维码内容
  rotate = 0; // 元素的旋转角度（以弧度为单位）

  draw(drawJSON?: DrawElementPartial): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }
    this.ctx.save();
    this.ctx.fillStyle = '#fff'; // 设置二维码背景色
    this.ctx.fillRect(this.x, this.y, this.width, this.height); // 绘制背景矩形
    this.ctx.fillStyle = '#000'; // 设置二维码颜色

    this.ctx.restore();
  }

}