export abstract class BaseController {
  abstract element: HTMLCanvasElement | null; // 画布元素
  abstract ctx: CanvasRenderingContext2D | null; // 画布上下文
  abstract iconSize: number; // 图标大小
  // 图标定位要根据element的高度来计算，
  // 左上角为删除符号
  // 右上角为旋转符号
  // 右下角为缩放符号
  // 右边中心点和下边中心点为拉伸符号
  abstract x: number; // 图标左定位
  abstract y: number; // 图标上定位

  abstract drawController(): void;

  abstract clearController(): void;
}