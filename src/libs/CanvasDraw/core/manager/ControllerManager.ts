import BaseController from "../controller/BaseController";

/***
 * 控制器管理器
 * 针对于Elements的控制器进行管理
 */

export default class ControllerManager {
  private controllers: Map<string, BaseController> = new Map();

  // 注册控制器
  addController(id: string, controller: BaseController): void {
    if (this.controllers.has(id)) {
      console.warn(`Controller with id ${id} already exists.`);
      return;
    }
    this.controllers.set(id, controller);
  }

  // 清除所有控制器
  clearControllers(): void {
    this.controllers.clear();
  }

  // 绘制所有控制器
  drawControllers(): void {
    this.controllers.forEach((controller) => {
      controller.drawController();
    });
  }
}