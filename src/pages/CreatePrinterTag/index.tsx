import { useRef, useEffect, useReducer } from 'react';
import { getDPR } from '@utils/canvas.ts'
import styles from './style.module.less'
import { canvasReducer, initCanvasState } from './canvesState'
import PrintTagSiderPanel from '@components/PrintTagSiderPanel';
import PrintTagElemetnPanel from '@components/PrintTagElementPanel';
import { ElementType } from '@libs/CanvasDraw'

export default function CreatePrinterTag() {

  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [state, dispatch] = useReducer(canvasReducer, initCanvasState)

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const proportion = state.height / state.width

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (canvas && container && entry) {
        const dpr = getDPR();
        const containerWidth = entry.contentRect.width;
        const width = containerWidth;
        const height = containerWidth * proportion

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [state.width, state.height])

  const triggerCreatePanel = async (type: ElementType) => {
    return new Promise((resolve) => {
      console.log(type)
      resolve(); 
    }) as Promise<void>;
  };

  return (
    <div className={styles.createPrinterTag}>
      <div className='main' ref={canvasContainerRef}>
        <canvas className='canvas' ref={canvasRef} id='drawArtboard'></canvas>
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