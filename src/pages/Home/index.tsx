import styles from './style.module.less';
import { useNavigate } from 'react-router-dom'

export default function Home() { 

  const navigate = useNavigate();

  const handleClickToPrinter = () => {
    navigate('/printer/createPrinterTag');
  }

  return (
    <div className={styles.homePage}>
      <div className='flex'>
        <div className="card" onClick={handleClickToPrinter}>
          <div className="card-icon">🖼️</div>
          <h2>设置标签</h2>
          <p>支持添加图形，二维码，条形码，文字等功能</p>
          <button className="btn">开始设置</button>
        </div>
      </div>
    </div>
  );
}