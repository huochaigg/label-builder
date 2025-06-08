
/**
 * 获取设备像素比（DPR）
 * @returns {number} 设备像素比
 * @description
 * 设备像素比（DPR）是指设备的物理像素与CSS像素的比率。
 **/
export const getDPR = () => {
  return window.devicePixelRatio || 1;
}

/**
 * 设置画布的分辨率
 * @param {HTMLCanvasElement} canvas - 画布元素
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 * @description
 * 根据设备像素比（DPR）调整画布的实际像素大小和样式大小。
 **/
export const correctResolution = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = getDPR();
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
}

/**
 * 获取画布的base64编码, 创建一个离屏canvas
 * @param ctx - CanvasRenderingContext2D 实例
 * @param width - 画布宽度
 * @param height - 画布高度
 * @return {string | null} 返回画布的base64编码字符串或null
 * @description
 * 将画布内容转换为base64编码的PNG格式字符串。
 * 如果获取失败，则返回null。
 */
export const getCanvasBase64 = (ctx: CanvasRenderingContext2D, width: number, height: number): string => {
  if (!ctx) {
    console.error('Canvas context is not initialized.');
    return '';
  }
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;
  const offscreenCtx = offscreenCanvas.getContext('2d');
  if (!offscreenCtx) {
    console.error('Failed to get 2D context from the offscreen canvas.');
    return '';
  }
  offscreenCtx.drawImage(ctx.canvas, 0, 0, width, height);
  return offscreenCanvas.toDataURL('image/png') || ''; // 从离屏 canvas 获取 Base64
}