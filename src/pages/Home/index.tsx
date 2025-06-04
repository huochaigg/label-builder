import styles from './style.module.less';
import { useNavigate } from 'react-router-dom'

export default function Home() { 

  const navigate = useNavigate();

  const handleClickToBatch = () => {
    navigate('/select_pic/batch');
  }

  return (
    <div className={styles.homePage}>
      <div className='flex'>
        <div className="card" onClick={handleClickToBatch}>
          <div className="card-icon">🖼️</div>
          <h2>图片处理</h2>
          <p>支持图片压缩、格式转换、大小调整、滤镜应用等多种图片处理功能</p>
          <button className="btn">开始处理</button>
        </div>
        
        <div className="card">
          <div className="card-icon">📄</div>
          <h2>文件处理</h2>
          <p>提供PDF转换、文档合并、文件压缩、格式转换等多种文件处理功能</p>
          <button className="btn">开始处理</button>
        </div>
      </div>
    </div>
  );
}