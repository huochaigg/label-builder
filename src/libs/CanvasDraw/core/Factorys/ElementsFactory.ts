/**
 * 创建元素实例
 */

import EwmElement from "../elements/EwmElements";
import TextElement from "../elements/TextElements";
import GraphElements from "../elements/GraphElements";
import { ElementType, DrawElementPartial, DrawElement } from "../../types";

export default class ElementsFactory {
  static createElement(type: string, ctx: CanvasRenderingContext2D, drawJSON?: DrawElementPartial): DrawElement {
    switch (type) {
      case ElementType.文本:
        return new TextElement(ctx, drawJSON);
      case ElementType.图形:
        return new GraphElements(ctx, drawJSON);
      case ElementType.二维码:
        return new EwmElement(ctx, drawJSON);
      case ElementType.条形码:
        return new EwmElement(ctx, drawJSON); // TODO
      case ElementType.图片:
        return new GraphElements(ctx, drawJSON); // TODO
      case ElementType.线条:
        return new GraphElements(ctx, drawJSON); // TODO
      default:
        throw new Error(`Unknown element type: ${type}`);
    }
  }
}
