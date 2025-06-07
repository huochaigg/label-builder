
/**
 * 创建唯一的符号
 * @returns {number} 唯一的符号
 **/
export const createSymbol = () => {
  return `element-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}