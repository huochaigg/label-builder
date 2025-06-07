/***
 * ControllerMiddleWare.ts
 * @description 控制器中间件
 * 旋转，缩放，删除，拉伸等控制器的管理和绘制
 */

import BaseController from '../controller/BaseController';
import { ControllerType } from '../../types';

export type ControllerMap = Map<ControllerType, BaseController>;

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