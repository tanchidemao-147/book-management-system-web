import './Detail.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { timeToYMD } from '../../../utils/utils'
import { getBookDetail } from '../../../api/book'
import { communityDelivery } from '../../../api/book'
import { Modal, Row, Col, Image, Tag, Divider, Drawer } from 'antd';
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'
import DescriptionsItem from '../../HomeComponents/DescriptionsItem';
import { notificationStart, resumeLinkSseStart } from '../../../redux/auth/auth.actions'

const Detail = ({ itemData, bookData }) => {
    return (
        <motion.div variants={staggerOne} className='detail_box'>
            <motion.div variants={authFadeInUpVariants} className='book_info'>
                <Row>
                    <Col span={6}>
                        <Image
                            width={140}
                            className="book_img"
                            src={bookData.book_image}
                            placeholder={
                                <Image
                                    preview={false}
                                    src={bookData.book_image}
                                    fallback="data:image/png;base64,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"
                                />
                            }
                        />
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <DescriptionsItem title="书名：" content={bookData.book_name} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="作者：" content={bookData.book_auth} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="出版社：" content={bookData.book_press} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="ISBN：" content={bookData.book_number} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="出版日期：" content={bookData.book_publication_date} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="类型：" content={
                                    bookData.book_type && bookData.book_type.map((type) => {
                                        return (
                                            <Tag color="orange" key={type}>
                                                {type}
                                            </Tag>
                                        );
                                    })
                                }
                                />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="总数量：" content={bookData.book_count} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="剩余数量：" content={bookData.book_surplus_quantity} />
                            </Col>
                            <Col span={24}>
                                <DescriptionsItem title="位置：" content={bookData.book_position} />
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </motion.div>
            <motion.div variants={authFadeInUpVariants} >
                <Divider orientation="center" plain >
                    借阅人信息
                </Divider>
            </motion.div>
            <motion.div variants={authFadeInUpVariants} className='borrow_info'>
                <Row>
                    <Col span={12}>
                        <DescriptionsItem title="借阅人姓名：" content={itemData.borrow_user_name} />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="借阅人手机号码：" content={itemData.borrow_phone} />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="借阅时间：" content={
                            `${timeToYMD(itemData.start_date)} - ${timeToYMD(itemData.end_date)}`
                        } />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="借阅状态：" content={
                            <Tag color="orange" >
                                {itemData.borrow_status}
                            </Tag>}
                        />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="续借次数：" content={itemData.borrow_renew} />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="归还时间：" content={itemData.borrow_return_date} />
                    </Col>
                    <Col span={12}>
                        <DescriptionsItem title="借阅位置：" content={itemData.borrow_user_location} />
                    </Col>
                </Row>
            </motion.div>
        </motion.div>
    )
}

/**
 * 配送任务弹框
 * @param {*} param0 
 */
export const BorrowDetailModal = ({ isShow, setIsShow, itemData }) => {
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState({})

    useEffect(() => {
        // console.log(itemData)
        if (JSON.stringify(itemData) !== "{}")
            getBookDetail({ _id: itemData.book_id }).then(({ data }) => {
                setBookData(data.data)
            })
    }, [isShow, itemData]);

    const onConfirm = async () => {
        await communityDelivery([itemData._id])
        dispatch(resumeLinkSseStart());
        dispatch(notificationStart({ message: '提交完成', type: 'success' }))
        setIsShow();
    }
    const onClose = () => {
        setIsShow();
    }
    return (
        <Modal
            width={750}
            title={itemData.status_type}
            open={isShow}
            okText="完成"
            onCancel={onClose}
            onOk={onConfirm}
        >
            <Detail itemData={itemData} bookData={bookData} />
        </Modal >
    )
}

/**
 * 详情抽屉
 * @param {*} param0 
 */
export const BorrowDetailDrawer = ({ isShow, setIsShow, itemData }) => {

    const [bookData, setBookData] = useState({})
    const [getContainer, setContainer] = useState(null)

    useEffect(() => {
        //解决 ant-drawer-body 内字体颜色不跟随主题的问题 
        //指定 Drawer 挂载到layout的节点上
        setContainer(document.querySelector('.layout'))
        if (JSON.stringify(itemData) !== "{}")
            getBookDetail({ _id: itemData.book_id }).then(({ data }) => {
                setBookData(data.data)
            })
    }, [isShow])

    const onClose = () => {
        setIsShow();
    }

    return (
        <Drawer
            title='借阅详情'
            size='large'
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={isShow}
        >
            <Detail itemData={itemData} bookData={bookData} />
        </Drawer>
    )
}
