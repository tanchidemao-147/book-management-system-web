import './App.scss';
import { useState } from 'react';
import { lazy, useEffect } from 'react';
import zh_CN from 'antd/lib/locale/zh_CN';
import { themeConfig } from './utils/theme'
import { AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider, Spin, theme, notification } from 'antd';
import { notificationStart } from './redux/auth/auth.actions';
import { selectCurrentUser, selectLoadingState, selectThemeState, selectNotificationState } from './redux/auth/auth.selectors'

import Auth from './pages/Auth/Auth';
import { memo } from 'react';
const Layout = lazy(() => import('./pages/Layout/Layout'))

function App() {
  const dispatch = useDispatch()
  const themeState = useSelector(selectThemeState)
  const currentUser = useSelector(selectCurrentUser);
  const loadingState = useSelector(selectLoadingState)
  const [api, contextHolder] = notification.useNotification();
  const notificationState = useSelector(selectNotificationState)
  const [styleTheme, setStyleTheme] = useState(themeConfig[themeState])

  useEffect(() => {
    const vt = document.startViewTransition(() => {
      setStyleTheme({
        ...themeConfig[themeState],
        algorithm: themeState === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      })
    })
    vt.ready.then(() => {
      const el = document.querySelector('.header_bar_theme')
      const { x, y } = el.getBoundingClientRect()
      const trageRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerWidth - y)
      )
      let clipPath = [
        `circle(0% at ${x}px ${y}px)`,
        `circle(${trageRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: themeState !== 'dark' ? [...clipPath].reverse() : clipPath,
          // easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        {
          duration: 5000,
          easing: "ease-in",
          pseudoElements: '::view-transition-new(root)',
        }
      )
    })
  }, [themeState])

  useEffect(() => {
    notificationState && api[notificationState.type](notificationState)
    return () => {
      dispatch(notificationStart(null))
    }
  }, [notificationState, api, dispatch])

  return (
    <ConfigProvider theme={{ ...styleTheme }} locale={zh_CN}>
      <div id="App">
        <AnimatePresence>
          {contextHolder}
          <Spin spinning={loadingState} fullscreen="true" >
            <Routes >
              <Route path="/*" element={currentUser ? <Layout /> : <Navigate to="/login" />} />
              <Route exact path="/login" element={currentUser ? <Navigate to="/home" /> : <Auth />} />
            </Routes>
          </Spin>
        </AnimatePresence>
      </div>
    </ConfigProvider>
  );
}

export default memo(App);








