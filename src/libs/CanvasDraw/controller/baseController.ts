import ControllerMiddleWare from "../elements/ControllerMiddleWare";
import BaseElement from "../elements/BaseElements";

export default abstract class BaseController {
  abstract element: BaseElement | null; // 画布元素
  abstract iconSize: number; // 图标大小
  // 图标定位要根据element的高度来计算，
  // 左上角为删除符号
  // 右上角为旋转符号
  // 右下角为缩放符号
  // 右边中心点和下边中心点为拉伸符号
  abstract x: number; // 图标左定位
  abstract y: number; // 图标上定位
  abstract middleWare: ControllerMiddleWare | null; // 控制器中间件实例

  abstract drawController(): void;
  abstract clearController(): void;

  abstract setMiddleWare(middleWare: ControllerMiddleWare): void;
}