import TextElement, { TextElementOptions } from './core/elements/TextElements';
import EwmElement, { EwmElementOptions } from './core/elements/EwmElements';
import ImageElement, { ImageElementOptions } from './core/elements/ImageElements';
import GraphElement, { GraphElementOptions } from './core/elements/GraphElements';


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

/** PanelType和ElementType的映射关系 */
export const ElementTypeToPanelType: {elementType: ElementType, PanelType: PanelType}[] = [
  { elementType: ElementType.文本, PanelType: PanelType.文本控制板 },
  { elementType: ElementType.图片, PanelType: PanelType.图片控制板 },
  { elementType: ElementType.条形码, PanelType: PanelType.条形码控制板 },
  { elementType: ElementType.二维码, PanelType: PanelType.二维码控制板 },
  { elementType: ElementType.图形, PanelType: PanelType.图形控制板 },
  { elementType: ElementType.线条, PanelType: PanelType.线条控制板 },
  { elementType: ElementType.其他, PanelType: PanelType.其他控制板 },
]

export enum ControllerType {
  缩放 = 'SCALE',
  旋转 = 'ROTATE',
  删除 = 'DELETE',
  拉伸 = 'STRETCH',
}  

/** 面板对应序列化数据，用于生成对应elements的表单格式 */
export type PanelRenderJSONType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  type: 'radio';
} | {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  type: 'checkbox';
} | {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  type: 'input';
}
// TODO ......其他类型待补充


/** 中介者保存的element类型，以便于调用各Element的方法 */
export type DrawElement = 
  | TextElement
  | EwmElement
  | ImageElement
  | GraphElement;
 

/** 绘制的Elements类型 */ 
export type DrawElementOptions = 
  | TextElementOptions 
  | EwmElementOptions  
  | ImageElementOptions 
  | GraphElementOptions;

/** 
 * 绘制时可以使用
 * 只有 type 属性是必填的
 * 其他属性都是可选的
 * 如果需要使用其他属性，请在使用时手动添加
 * 
 * 例如：
 * const element: DrawElementPartial = { type: ElementType.文本, x: 10, y: 20, width: 100, height: 50 }; 
 **/ 
export type DrawElementPartial = Partial<Omit<DrawElementOptions, 'type'>> & { type: ElementType };


/** 
 * 画布已绘制的 JSON 对象详细结构
 * 缓存到本地存储时使用
 * 可以用于恢复画布状态
 */
export interface CanvasDrawJSON {
  /** 标签的宽度 */
  width: number;
  /** 标签的高度 */
  height: number;
  /** 元素列表 */
  elements: DrawElementOptions[];
}

/** 
 * 画布绘制的 JSON 对象结构
 * 用于传递给 CanvasDrawManager 进行绘制
 * 包含画布的上下文对象、宽度、高度和元素列表
 */
export interface CanvasDrawOptions {
  /** 画布的上下文对象 */
  ctx: CanvasRenderingContext2D;
  /** 标签的宽度 */
  width: number;
  /** 标签的高度 */
  height: number;
}

/** 
 * 事件类型枚举
 * 用于事件发布订阅模式
 */
export enum EventType {
  元素选中 = 'ELEMENT_SELECT',
  元素取消选中 = 'ELEMENT_UNSELECT',
  元素清除 = 'ELEMENT_CLEAR',
  元素复制 = 'ELEMENT_COPY',
  元素粘贴 = 'ELEMENT_PASTE',
}

/** 
 * 事件回调函数类型
 * 用于事件发布订阅模式
 */
export type EventOptions = {
  type: EventType;
  data: {
    currentElement?: DrawElementOptions | undefined; // 当前选中的元素数据
    /** 切换panel会返回对应element的form表单数据 */
    form?: PanelRenderJSONType[];
  }
}