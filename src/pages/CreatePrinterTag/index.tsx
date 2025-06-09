import { useRef, useEffect, useReducer } from 'react';
import styles from './style.module.less'
import { canvasReducer, initCanvasState, CanvesType } from './canvesState'
import PrintTagSiderPanel from '@components/PrintTagSiderPanel';
import PrintTagElemetnPanel from '@components/PrintTagElementPanel';
import { ElementType, CanvasDrawManager, EventType } from '@libs/CanvasDraw'

export default function CreatePrinterTag() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasDrawManager = useRef<CanvasDrawManager | null>(null)

  const [state, dispatch] = useReducer(canvasReducer, initCanvasState)

  useEffect(() => {
    // 创建新的 CanvasDrawManager 实例
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      canvasDrawManager.current = new CanvasDrawManager({
        ctx: ctx,
        width: state.width,
        height: state.height,
      });

      canvasDrawManager.current.subscribe((options) => {
        console.log('options', options.type, options.data)
        if (options.type === EventType.元素选中) {
          dispatch({ 
            type: CanvesType.UPDATE_PANEL_TYPE, 
            payload: options.data
          })
        } else if (options.type === EventType.元素取消选中) {
          dispatch({ type: CanvesType.UPDATE_PANEL_TYPE, payload: undefined })
        }
      })
    }

    return () => {
      canvasDrawManager.current?.destory()
    }
  }, [state.width, state.height])

  const triggerCreatePanel = (type: ElementType) => {
    canvasDrawManager.current?.createElement(type)
  };

  const handleClickSaveDrawJson = () => {
    const saveJson = canvasDrawManager.current?.getDrawJSON()
    console.log('saveJson', saveJson)
    // TODO 暂时存在localStorage中
    localStorage.setItem('cardJson', JSON.stringify(saveJson))
  }

  return (
    <div className={styles.createPrinterTag}>
      <div className='main'>
        <div className='canvas_container'>
          <canvas className='canvas' ref={canvasRef} id='drawArtboard'></canvas>
        </div>
        <PrintTagElemetnPanel />
      </div>
      <div className='sider'>
        <PrintTagSiderPanel
          triggerCreatePanel={triggerCreatePanel}
          handleClickSaveDrawJson={handleClickSaveDrawJson}
        />
      </div>
    </div>
  );
}
