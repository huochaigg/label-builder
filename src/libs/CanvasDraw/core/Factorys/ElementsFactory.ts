import BaseElements from "../elements/BaseElements";
import EwmElement from "../elements/EwmElements";
import TextElement from "../elements/TextElements";
import GraphElements from "../elements/GraphElements";
import { ElementType } from "../../types";

export default class ElementsFactory {
  static createElement(type: string, ctx: CanvasRenderingContext2D): BaseElements {
    switch (type) {
      case ElementType.文本:
        return new TextElement(ctx);
      case ElementType.图形:
        return new GraphElements(ctx);
      case ElementType.二维码:
        return new EwmElement(ctx);
      case ElementType.条形码:
        return new EwmElement(ctx); // TODO
      case ElementType.图片:
        return new GraphElements(ctx); // TODO
      case ElementType.线条:
        return new GraphElements(ctx); // TODO
      default:
        throw new Error(`Unknown element type: ${type}`);
    }
  }
}
