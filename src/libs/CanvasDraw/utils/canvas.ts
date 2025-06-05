
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
 * 创建唯一的符号
 * @returns {number} 唯一的符号
 **/
export const createSymbol = () => {
  return Math.random().toString(36).slice(2);
}