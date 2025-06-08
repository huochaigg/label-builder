import TextElement from './core/elements/TextElements';
import EwmElement from './core/elements/EwmElements';
import ImageElement from './core/elements/ImageElements';
import GraphElements from './core/elements/GraphElements';


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

/** 绘制的Elements类型 */ 
export type DrawElement = 
  | TextElement 
  | EwmElement 
  | ImageElement
  | GraphElements;

/** 
 * 绘制时可以使用
 * 只有 type 属性是必填的
 * 其他属性都是可选的
 * 如果需要使用其他属性，请在使用时手动添加
 * 
 * 例如：
 * const element: DrawElementPartial = { type: ElementType.文本, x: 10, y: 20, width: 100, height: 50 }; 
 **/ 
export type DrawElementPartial = Partial<Omit<DrawElement, 'type'>> & { type: ElementType };


/** CanvasDrawJSON 接口定义了画布已绘制的 JSON 对象结构 */
export interface CanvasDrawJSON {
  /** 画布的上下文对象 */
  ctx: CanvasRenderingContext2D;
  /** 标签的宽度 */
  width: number;
  /** 标签的高度 */
  height: number;
  /** 元素列表 */
  elements: DrawElement[];
}

export interface CanvasDrawOptions {
  /** 画布的上下文对象 */
  ctx: CanvasRenderingContext2D;
  /** 标签的宽度 */
  width: number;
  /** 标签的高度 */
  height: number;
}