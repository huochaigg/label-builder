/**
 * 针对于Elements的中介者
 * 用于协调不同的元素之间的交互
 */
import { Element, ElementType } from '../../types';
import ElementsFactory from '../Factorys/ElementsFactory';


export default class ElementsMediator {
  private elements: Map<string, Element> = new Map();

  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /** 创建元素 */
  crateElement(type: ElementType): Element {
    return ElementsFactory.createElement(type, this.ctx);
  }

  /** 添加原素 */
  addElement(type: ElementType): void {
    const element = this.crateElement(type);
    this.elements.set(element.id, element);
  }

  /** 获取元素 */
  getElement(id: string): Element | undefined {
    return this.elements.get(id);
  }

  /** 删除元素 */
  deleteElement(id: string): void {
    if (!this.elements.has(id)) {
      console.warn(`Element with id ${id} does not exist.`);
      return;
    }
    this.elements.delete(id);
  }

  /** 更新元素 */
  updateElement(id: string, newElement: Element): void {
    if (!this.elements.has(id)) {
      console.warn(`Element with id ${id} does not exist.`);
      return;
    }
    this.elements.set(id, newElement);
  }

  /** 获取所有元素 */
  getAllElements(): Element[] {
    return Array.from(this.elements.values());
  }
  
  /** 清除所有元素 */
  clearElements(): void {
    this.elements.clear();
  }

  /** 获取元素数量 */
  getElementCount(): number {
    return this.elements.size;
  }

  /** 检查元素是否存在 */
  hasElement(id: string): boolean {
    return this.elements.has(id);
  }

}