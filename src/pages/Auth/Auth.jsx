import './Auth.scss'
import { motion } from 'framer-motion'
import sha1 from 'sha1'
import { Button, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { signInStart } from '../../redux/auth/auth.actions'
import { authPageFadeInVariants, staggerOne, authFadeInUpVariants } from '../../utils/motion'
import bgImg from '../../images/books-1655783_1280.jpg'
import logo from '../../images/logo_cross.jpg'

const Auth = () => {
    const dispatch = useDispatch();

    const onLogin = async (values) => {
        values.password = sha1(values.password)
        dispatch(signInStart(values));
    }

    return (
        <motion.div
            className='login'
            variants={authPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className='bgMask'></div>
            <img className='bgImg' src={bgImg} />
            <motion.div variants={staggerOne} className='login_content'>
                <motion.div className='logo' >
                    <motion.img src={logo} variants={authFadeInUpVariants} className='logo_img' />
                    <motion.h2 variants={authFadeInUpVariants}>——— 欢 迎 登 录 ———</motion.h2>
                </motion.div>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onLogin}
                    autoComplete="off"
                    size='large'
                >
                    <motion.div variants={authFadeInUpVariants}>
                        <Form.Item name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input maxLength={5} placeholder='用户名' />
                        </Form.Item>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Form.Item name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password maxLength={6} placeholder='密码' />
                        </Form.Item>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Form.Item
                        >
                            <Button type="primary" size='large' htmlType="submit" block>
                                登 录
                            </Button>
                        </Form.Item>
                    </motion.div>
                </Form>

            </motion.div>
        </motion.div>
    )
}

export default Auth