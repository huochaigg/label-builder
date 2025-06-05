export default class ScaleController {
  private element: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private iconSize: number = 20;
  private iconLeft: number = 0;
  private iconTop: number = 0;

  constructor(element: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
    this.element = element;
    this.ctx = ctx;
    this.iconSize = 20; // 图标大小    
    if (this.element && this.ctx) {
      this.drawController();
    }
  }

  drawController(): void {
    if (!this.ctx || !this.element) return;

    // 绘制缩放图标
    this.ctx.save();
    this.ctx.
    this.ctx.restore();
  }

  clearController(): void {
    if (!this.ctx || !this.element) return;

    // 清除控制器图标,只清除控制器图标而不影响画布上的其他内容
    this.ctx.save();
    this.ctx.clearRect(this.iconLeft, this.iconTop, this.iconSize + this.iconLeft, this.iconSize + this.iconTop);
    this.ctx.restore();
  }
}