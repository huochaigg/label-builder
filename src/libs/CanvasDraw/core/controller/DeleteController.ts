import BaseController from './BaseController';
import DeleteIcon from '../../assets/images/delete.png';
import DeleteDarkIcon from '../../assets/images/delete_dark.png';

export default class DeleteController extends BaseController {
  drawIcon(): void {
    if (!this.ctx) return;

    const img = new Image();
    img.src = this.icon;
    img.onload = () => {
      this.ctx?.drawImage(img, this.x, this.y, this.iconSize, this.iconSize);
    };
  }

  get icon(): string {
    return process.env.THEME === 'light' ? DeleteIcon : DeleteDarkIcon;
  }
}