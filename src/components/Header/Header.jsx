import './Header.scss'
import { motion } from 'framer-motion'
import logo from '../../images/logo_cross.jpg'
import { useState, useEffect, memo } from 'react'
import dark_icon from '../../images/dark_icon.png'
import light_icon from '../../images/light_icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { navbarFadeInVariants } from '../../utils/motion'
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginOutlined, BellOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Switch, Space, Popconfirm, Badge } from 'antd';
import { selectThemeState, selectResumeCount } from '../../redux/auth/auth.selectors'
import { signOutStart, themeToggleStart, resumeLinkSseStart, taskResumeOpen } from '../../redux/auth/auth.actions'
const { Header } = Layout;
const items = [
    { label: '主页', key: '/home' },
    { label: '书刊管理', key: '/books' },
    { label: '借阅管理', key: '/borrow' },
    { label: '用户管理', key: '/users' },
    { label: '社区管理', key: '/community' },
    { label: '图书馆管理', key: '/library' },
]

const HeaderComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const themeState = useSelector(selectThemeState)
    const resumeCount = useSelector(selectResumeCount)
    const [selectedKey, setSelectedKey] = useState(location.pathname)
    useEffect(() => {
        setSelectedKey(location.pathname)
    }, [location]);

    useEffect(() => {
        const getresume = setInterval(() => {
            dispatch(resumeLinkSseStart());
        }, 50000);
        return () => {
            clearInterval(getresume);
        }
    }, []);

    const skipPage = (e) => {
        navigate(e.key)
    }
    const onQuest = () => {
        dispatch(taskResumeOpen(null));
    }
    const onThemeToggle = (value) => {
        dispatch(themeToggleStart());
    }
    const onExit = () => {
        dispatch(signOutStart())
    }
    return (
        <motion.div variants={navbarFadeInVariants}>
            <motion.div className='header_bar'>
                <div className='header_bar_left'>
                    <img src={logo} alt="四喜丸子社区图书管理系统" />
                </div>
                <div className='header_bar_right'>
                    <div className='header_bar_icon'>
                        <a onClick={onQuest}>
                            <Badge size="small" count={resumeCount}>
                                <BellOutlined style={{ fontSize: '18px' }} />
                            </Badge>
                        </a>
                    </div>
                    <div className='header_bar_theme'>
                        <Space direction="vertical" align="center">
                            <Switch
                                className={themeState == 'dark' ? 'theme_but' : 'theme_but2'}
                                checkedChildren={<img src={dark_icon} />}
                                unCheckedChildren={<img src={light_icon} />}
                                defaultChecked={themeState == 'dark'}
                                onClick={onThemeToggle}
                            />
                        </Space>
                    </div>
                    <div>
                        <Popconfirm title="是否退出登录?" onConfirm={onExit} >
                            <Button type="text" icon={<LoginOutlined />}>退出</Button>
                        </Popconfirm>
                    </div>
                </div>
            </motion.div>
            <Header className='header_nav' style={{ display: 'flex', alignItems: 'center' }}>
                <Menu
                    className='header_nav_menu'
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={selectedKey}
                    items={items}
                    onClick={skipPage}
                >
                </Menu>
            </Header>
        </motion.div>
    )
}
export default memo(HeaderComponent)