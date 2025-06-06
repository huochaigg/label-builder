/***
 * StretchController
 * @description 控制器，用于绘制缩放图标
 */

import BaseController from './BaseController'

import StretchIcon from '../../assets/images/stretch.png';
import StretchDarkIcon from '../../assets/images/stretch_dark.png';

export default class StretchController extends BaseController {
  drawIcon(): void {
    if (!this.ctx) return;

    const img = new Image();
    img.src = this.icon;
    img.onload = () => {
      this.ctx?.drawImage(img, this.x, this.y, this.iconSize, this.iconSize);
    };
  }

  get icon(): string {
    return process.env.THEME === 'light' ? StretchIcon : StretchDarkIcon;
  }
}