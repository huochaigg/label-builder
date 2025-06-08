import { ElementType } from '@libs/CanvasDraw';

export interface PrintTagSiderPanelProps {
  /** 打印方向 */
  direction?: 'horizontal' | 'vertical';
  /** 点击面板触发创建element */ 
  triggerCreatePanel: (type: ElementType) => void;
}

export const panelList = [
  {
    name: '文字',
    type: ElementType['文本'],
    titleTip: '点击创建文字',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7V5h13v2m-6-2v14m2 0H8m7-6v-1h6v1m-3-1v7m-1 0h2"/></svg>
  },
  {
    name: '图形',
    type: ElementType['图形'],
    titleTip: '点击创建图形',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 5.667A2.667 2.667 0 0 1 9.667 3h8.666A2.667 2.667 0 0 1 21 5.667v8.666A2.667 2.667 0 0 1 18.333 17H9.667A2.667 2.667 0 0 1 7 14.333z"/><path d="M4.012 7.26A2 2 0 0 0 3 8.997v10c0 1.1.9 2 2 2h10c.75 0 1.158-.385 1.5-1M17 7h.01"/><path d="m7 13l3.644-3.644a1.21 1.21 0 0 1 1.712 0L16 13"/><path d="m15 12l1.644-1.644a1.21 1.21 0 0 1 1.712 0L21 13"/></g></svg>
  },
  {
    name: '二维码',
    type: ElementType['二维码'],
    titleTip: '点击创建二维码',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v8h8V3zm6 6H5V5h4zm-6 4v8h8v-8zm6 6H5v-4h4zm4-16v8h8V3zm6 6h-4V5h4zm-6 4v8h8v-8zm6 6h-4v-4h4z"/></svg>
  },
  {
    name: '条形码',
    type: ElementType['条形码'],
    titleTip: '点击创建条形码',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 19V5h2v14zm3 0V5h2v14zm3 0V5h1v14zm3 0V5h2v14zm3 0V5h3v14zm4 0V5h1v14zm3 0V5h3v14z"/></svg>
  },
]