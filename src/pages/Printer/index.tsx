import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { getDPR, correctResolution } from '@utils/canvas.ts'
import styles from './style.module.less';

const dpr = getDPR()

export default function Setting() { 

  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(300)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      correctResolution(canvas, width, height)
    }
  }, [width, height])


  return (
    <div className={styles.printer}>
      <canvas ref={canvasRef} id='drawArtboard'></canvas>
    </div>
  );
}