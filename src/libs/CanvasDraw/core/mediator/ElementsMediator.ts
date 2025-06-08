/**
 * 针对于Elements的中介者
 * 用于协调不同的元素之间的交互
 */
import { DrawElement, ElementType, DrawElementPartial } from '../../types';
import ElementsFactory from '../Factorys/ElementsFactory';


export default class ElementsMediator {
  private elements: Map<string, DrawElement> = new Map();

  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /** 新增元素添加到elements */
  crateElement(type: ElementType, ElementJSON?: DrawElementPartial): void {
    const element = ElementsFactory.createElement(type, this.ctx, ElementJSON);
    element.setMiddleWare(this); // 设置中介者
    this.elements.set(element.options.id, element);
  }

  /** 获取元素 */
  getElement(id: string): DrawElement | undefined {
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
  updateElement(id: string, newElement: DrawElement): void {
    if (!this.elements.has(id)) {
      console.warn(`Element with id ${id} does not exist.`);
      return;
    }
    this.elements.set(id, newElement);
  }

  /** 获取所有元素 */
  getAllElements(): DrawElement[] {
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

  /** 根据drawJSON遍历并添加对应Element */
  drawElements(drawElementsJSON: DrawElementPartial[]): void {
    if (!this.ctx) {
      console.error('CanvasRenderingContext2D 未初始化');
      return;
    }

    // 清空当前画布
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // 遍历元素并绘制
    drawElementsJSON.forEach(elementJSON => {
      this.crateElement(elementJSON.type, elementJSON);
    });
  } 

}