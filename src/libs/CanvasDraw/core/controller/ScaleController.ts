import BaseController from './BaseController';
import ScaleIcon from '../../assets/images/scale.png';
import ScaleDarkIcon from '../../assets/images/scale_dark.png';

export default class ScaleController extends BaseController {
  drawIcon(): void {
    if (!this.ctx) return;

    const img = new Image();
    img.src = this.icon;
    img.onload = () => {
      this.ctx?.drawImage(img, this.x, this.y, this.iconSize, this.iconSize);
    };
  }

  get icon(): string {
    return process.env.THEME === 'light' ? ScaleIcon : ScaleDarkIcon;
  }
}