import * as canvas from './canvas';
import * as constants from './constants';

const utils = {
  ...canvas,
  ...constants,
};

export { utils };        // 命名导出
export default utils;    // 默认导出（可选）
