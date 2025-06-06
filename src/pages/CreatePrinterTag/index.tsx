import { useRef, useEffect, useReducer } from 'react';
import { getDPR } from '@utils/canvas.ts'
import styles from './style.module.less'
import { canvasReducer, initCanvasState } from './canvesState'
import PrintTagSiderPanel from '@components/PrintTagSiderPanel';
import PrintTagElemetnPanel from '@components/PrintTagElementPanel';

export default function CreatePrinterTag() {

  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [state, dispatch] = useReducer(canvasReducer, initCanvasState)

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const proportion = state.height / state.width

    const resizeObserver = new ResizeObserver(() => {
      if (canvas && container) {
        const dpr = getDPR();
        const containerWidth = container.offsetWidth;
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


  return (
    <div className={styles.createPrinterTag}>
      <div className='main' ref={canvasContainerRef}>
        <canvas className='canvas' ref={canvasRef} id='drawArtboard'></canvas>
        <PrintTagElemetnPanel />
      </div>
      <div className='sider'>
        <PrintTagSiderPanel />
      </div>
    </div>
  );
}