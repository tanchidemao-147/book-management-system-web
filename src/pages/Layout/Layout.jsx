import './Layout.scss'
import { Layout, theme, Watermark } from 'antd';
import { lazy, memo } from 'react';
import { motion } from 'framer-motion'
import { authPageFadeInVariants } from '../../utils/motion'
import { Route, Routes } from "react-router-dom";

import Home from '../Home/Home'
import Books from '../Books/Books'
import Borrow from '../Borrow/Borrow'
import Users from '../Users/Users'
import Community from '../Community/Community'
import Library from '../Library/Library'

const BorrowTaskModal = lazy(() => import('../../components/BorrowTaskModal/BorrowTaskModal'))
const Header = lazy(() => import('../../components/Header/Header'))
const { Content } = Layout;
// const Home = lazy(() => import('../Home/Home')) 容易闪烁
// const Books = lazy(() => import('../Books/Books'))

const LayoutPage = () => {
    const {
        token: { colorBgContainer, colorTextBase },
    } = theme.useToken();

    return (
        <motion.div
            variants={authPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Layout className="layout" style={{ background: colorBgContainer, color: colorTextBase }} >
                <Header />
                <Content style={{ padding: '0 30px', overflowY: "scroll" }}>
                    <Watermark content="admin">
                        <BorrowTaskModal />
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="books" element={<Books />} />
                            <Route path="borrow" element={<Borrow />} />
                            <Route path="users" element={<Users />} />
                            <Route path="community" element={<Community />} />
                            <Route path="library" element={<Library />} />
                        </Routes>
                    </Watermark>
                </Content>
            </Layout>
        </motion.div >
    )

}
export default memo(LayoutPage)