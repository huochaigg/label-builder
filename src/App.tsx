import { BrowserRouter } from 'react-router-dom';

import './App.css'
import './index.less'

import Router from './router/Router';

function App() {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
