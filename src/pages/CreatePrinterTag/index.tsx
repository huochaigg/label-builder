import { useRef, useEffect, useReducer } from 'react';
import styles from './style.module.less'
import { canvasReducer, initCanvasState } from './canvesState'
import PrintTagSiderPanel from '@components/PrintTagSiderPanel';
import PrintTagElemetnPanel from '@components/PrintTagElementPanel';
import { ElementType, CanvasDrawManager } from '@libs/CanvasDraw'

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
    }
  }, [state.width, state.height])

  const triggerCreatePanel = (type: ElementType) => {
    canvasDrawManager.current?.createElement(type)
  };

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
        />
      </div>
    </div>
  );
}
