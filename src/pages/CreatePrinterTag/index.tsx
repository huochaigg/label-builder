import { useRef, useEffect, useReducer } from 'react';
import { correctResolution } from '@utils/canvas.ts'
import styles from './style.module.less'
import { canvasReducer, initCanvasState } from './canvesState'

export default function CreatePrinterTag() { 

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [state, dispatch] = useReducer(canvasReducer, initCanvasState)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      correctResolution(canvas, state.width, state.height)
    }
  }, [state.width, state.height])


  return (
    <div className={styles.createPrinterTag}>
      <div className='main'>
        <canvas className='canvas' ref={canvasRef} id='drawArtboard'></canvas>
      </div>
      <div className='sider'>
        
      </div>
    </div>
  );
}