export enum PanelType {
  文本控制板 = 'TEXT_PANEL',
  图片控制板 = 'IMAGE_PANEL',
  条形码控制板 = 'BARCODE_PANEL',
  二维码控制板 = 'QRCODE_PANEL',
  图形控制板 = 'SHAPE_PANEL',
  线条控制板 = 'LINE_PANEL',
  其他控制板 = 'OTHER_PANEL',
}

export enum ElementType {
  文本 = 'TEXT',
  图片 = 'IMAGE',
  条形码 = 'BARCODE',
  二维码 = 'QRCODE',
  图形 = 'SHAPE',
  线条 = 'LINE',
  其他 = 'OTHER',
}

export enum ControllerType {
  缩放 = 'SCALE',
  旋转 = 'ROTATE',
  删除 = 'DELETE',
  拉伸 = 'STRETCH',
}  

export interface Element {
  /** 元素唯一标识符 */
  id: string; 
  /** 元素类型 */
  type: ElementType;
  /** 元素在画布上的x坐标 */
  x: number;
  /** 元素在画布上的y坐标 */
  y: number;
  /** 元素的宽度 */
  width: number; 
  /** 元素的高度 */
  height: number;
  /** 元素的旋转角度 */
  rotation?: number; // 元素的旋转角度
}

export interface CanvasDrawOptions {
  /** 画布的上下文对象 */
  ctx: CanvasRenderingContext2D;
  /** 标签的宽度 */
  width: number;
  /** 标签的高度 */
  height: number;
}