/**
 * 是标签canvas画板的右侧边栏面板
 * PrintTagSiderPanel 组件
 * 内容包含：文字，图形，二维码，条形码......
 */
import { ElementType } from '@libs/CanvasDraw'
import { PrintTagSiderPanelProps, panelList } from './helper'
import styles from './style.module.less'

export default function PrintTagSiderPanel(props: PrintTagSiderPanelProps) {

  const handleClickItemPanel = (type: ElementType) => {
    props.triggerCreatePanel(type)
  }

  const handleClickSaveDrawJson = () => {
    props.handleClickSaveDrawJson()
  }

  return <section className={styles.printTagSiderPanel}>
    <div className='panel_list'>
      {
        panelList.map(item => (
          <div 
            className='panel_item' 
            key={item.name} 
            title={item.titleTip}
            onClick={() => handleClickItemPanel(item.type)}
          >
            {item.icon}
            <div className='name'>{item.name}</div>
          </div>
        ))
      }
    </div>
    <button className='save_button' onClick={handleClickSaveDrawJson}>保存格式</button>
  </section>
}