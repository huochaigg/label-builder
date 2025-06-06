/***
 * RotateController
 * @description 控制器，用于绘制缩放图标
 */

import BaseController from './BaseController'
import BaseElement from '../elements/BaseElements';
import ControllerMiddleWare from '../mediator/ControllerMediator';

import RotateIcon from '../../assets/images/rotate.png';
import RotateDarkIcon from '../../assets/images/rotate_dark.png';

export default class RotateController extends BaseController {
  element: BaseElement | null = null;
  iconSize = 20;
  x = 0;
  y = 0;
  middleWare: ControllerMiddleWare | null = null;


  drawIcon(): void {
    if (!this.ctx) return;

    const img = new Image();
    img.src = this.icon;
    img.onload = () => {
      this.ctx?.drawImage(img, this.x, this.y, this.iconSize, this.iconSize);
    };
  }

  get icon(): string {
    return process.env.THEME === 'light' ? RotateIcon : RotateDarkIcon;
  }
}