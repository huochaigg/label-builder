export enum CanvesType {
  UPDATE_DATA = 'update_data',
  UPDATE_WIDTH = 'update_width',
  UPDATE_HEIGHT = 'update_height',
  UPDATE_PANEL_TYPE = 'update_panel_type',
}

export type CanvesAction =
| { type: CanvesType.UPDATE_DATA, payload: InitState } 
| { type: CanvesType.UPDATE_WIDTH; payload: InitState['width'] } 
| { type: CanvesType.UPDATE_HEIGHT; payload: InitState['height'] } 
| { type: CanvesType.UPDATE_PANEL_TYPE; payload: InitState['panelType'] }; 

export enum PanelType {
  文本控制板 = 'text_panel',
  图片控制板 = 'image_panel',
  条形码控制板 = 'barcode_panel',
  二维码控制板 = 'qrcode_panel',
  图形控制板 = 'shape_panel',
  线条控制板 = 'line_panel',
  其他控制板 = 'other_panel',
}

export interface InitState {
  width: number;
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
        width: actions.payload, // 示例：增加宽度
      };
    case CanvesType.UPDATE_HEIGHT:
      return {
        ...state,
        height: actions.payload, // 示例：增加高度
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