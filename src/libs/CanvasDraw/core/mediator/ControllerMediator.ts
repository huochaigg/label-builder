import BaseController from '../controller/BaseController';

export enum ControllerType {
  Scale = 'scale',
  Rotate = 'rotate',
  Delete = 'delete',
  Stretch = 'stretch',
}  

export type ControllerMap = Map<ControllerType, BaseController>;

// 一个控制器中间件，用于管理所有的控制器
export default class ControllerMiddleWare {
  private controllers: ControllerMap = new Map();

  // 注册控制器
  addController(type: ControllerType, controller: BaseController): void {
    if (this.controllers.has(type)) {
      console.warn(`Controller of type ${type} already exists.`);
      return;
    }
    controller.setMiddleWare(this);
    this.controllers.set(type, controller);
  }

  clearController(): void {
    this.controllers.forEach(controller => {
      controller.clearController(); // 清除控制器图标
    });
    this.controllers.clear();
  }

  drawControllers(): void {
    this.controllers.forEach((controller) => {
      controller.clearController(); // 清除之前的控制器图标
      controller.drawController(); // 绘制新的控制器图标
    });
  }
}