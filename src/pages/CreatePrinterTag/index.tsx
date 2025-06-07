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
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = CanvasDrawManager.initializeCanvas(canvas, state.width, state.height);
      if (!ctx) {
        console.error('无法获取 CanvasRenderingContext2D，请检查 canvas 元素是否正确初始化');
        return;
      }

      // 创建新的 CanvasDrawManager 实例
      canvasDrawManager.current = new CanvasDrawManager({
        ctx: ctx,
        width: state.width,
        height: state.height,
      });
    }
  }, [state.width, state.height])

  const triggerCreatePanel = async (type: ElementType) => {
    return new Promise((resolve) => {
      console.log(type)
      // TODO 给canvas添加对应elements
      resolve();
    }) as Promise<void>;
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
