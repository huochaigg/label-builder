import { PanelType } from '@libs/CanvasDraw';

export enum CanvesType {
  UPDATE_DATA = 'UPDATE_DATA',
  UPDATE_WIDTH = 'UPDATE_WIDTH',
  UPDATE_HEIGHT = 'UPDATE_HEIGHT',
  UPDATE_PANEL_TYPE = 'UPDATE_PANEL_TYPE',
}

export type CanvesAction =
| { type: CanvesType.UPDATE_DATA; payload: InitState } 
| { type: CanvesType.UPDATE_WIDTH; payload: InitState['width'] } 
| { type: CanvesType.UPDATE_HEIGHT; payload: InitState['height'] } 
| { type: CanvesType.UPDATE_PANEL_TYPE; payload: InitState['panelType'] }; 

export interface InitState {
  /** 要设置的标签（tag）宽度 */ 
  width: number;
  /** 要设置的标签高度 */ 
  height: number;
  panelType: PanelType | undefined;
}

export const initCanvasState: InitState = {
  width: 500,
  height: 300,
  panelType: undefined
}

export const canvasReducer = (state: InitState, actions: CanvesAction): InitState => {
  switch(actions.type) {
    case CanvesType.UPDATE_DATA:
      return {
        ...actions.payload, // 更新画布数据
      };
    case CanvesType.UPDATE_WIDTH:
      return {
        ...state,
        width: actions.payload, // 设置宽度
      };
    case CanvesType.UPDATE_HEIGHT:
      return {
        ...state,
        height: actions.payload, // 设置高度
      };
    case CanvesType.UPDATE_PANEL_TYPE:
      return {
        ...state,
        panelType: actions.payload, // 更新面板类型
      };
    default:
      return state;
  }
}