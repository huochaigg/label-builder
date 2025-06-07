/**
 * 针对于Elements的控制器的工厂类
 */
import BaseController from "../controller/BaseController";
import DeleteController from "../controller/DeleteController";
import ScaleController from "../controller/ScaleController";
import RotateController from "../controller/RotateController";
import StretchController from "../controller/StretchController";

import BaseElements from "../elements/BaseElements";
import { ControllerType } from "../../types";

export default class ElementControllerFactory {
  /**
   * 创建一个控制器
   * @param type 控制器类型 
   * @param element 元素实例
   * @returns 控制器实例
   */
  static createController(type: ControllerType, element: BaseElements): BaseController {
    switch (type) {
      case ControllerType.删除:
        return new DeleteController(element);
      case ControllerType.缩放:
        return new ScaleController(element);
      case ControllerType.旋转:
        return new RotateController(element);
      case ControllerType.拉伸:
        return new StretchController(element);
      default:
        throw new Error(`Unknown controller type: ${type}`);
    }
  }
}