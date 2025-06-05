// routes/Router.tsx
import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
// Suspense是 React 的一个特性，用于处理异步加载组件
// 通过 lazy 函数来懒加载组件，只有在需要时才加载对应的组件

// 懒加载页面组件
import Home from '../pages/Home';
import Printer from '../pages/Printer';
// const About = lazy(() => import('../pages/About'));
const Setting = lazy(() => import('../pages/Setting'));

const NotFound = () => {
  return (
    <div>404 Not Found</div>
  )
}

// 可选：权限守卫组件
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = true; // TODO: 替换为你的实际逻辑
  return isLoggedIn ? children : <div>请先登录</div>;
};

export default function Router() {
  const location = useLocation();
  const element = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: '/printer',
      children: [
        {
          index: true,
          element: <Navigate to="batch" replace />,
        },
        {
          path: 'index',
          element: <Printer />,
        },
      ]
    },
    // {
    //   path: '/about',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <About />
    //     </Suspense>
    //   ),
    // },
    {
      path: '/setting',
      element: (
        <RequireAuth>
          <Suspense fallback={<div>Loading...</div>}>
            <Setting />
          </Suspense>
        </RequireAuth>
      ),
    },
    // {
    //   path: '/history/list',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <HistoryList />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: '/history/detail/:id',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <HistoryDetail />
    //     </Suspense>
    //   ),
    // },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <div className='page_container'>{element}</div>
      </CSSTransition>
    </TransitionGroup>
  )
}
