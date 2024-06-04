import './Detail.scss'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import TableBase from '../../TableBase/TableBase'
import { getBookCollection } from '../../../api/book'
import { Drawer, Row, Col, Avatar, Image, Divider } from 'antd';
import DescriptionsItem from '../../HomeComponents/DescriptionsItem';
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'
import BookCollectionDetail from '../BookCollectionDetail/BookCollectionDetail'

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 70,
        render: (text, record, index) => `${index + 1}`,
    },
    {
        title: '书单名',
        align: 'center',
        dataIndex: 'collection_name',
        key: 'collection_name',
    },
    {
        title: '收藏数量',
        align: 'center',
        dataIndex: 'collect_count',
        key: 'collect_count',
    },
    {
        title: '是否公开',
        align: 'center',
        key: '操作',
        render: (item) => (
            <div>
                {item.public ? '是' : '否'}
            </div>
        )
    },
]


const Detail = ({ isShow, setIsShow, itemData }) => {
    const [getContainer, setContainer] = useState(null)
    const [dataSource, setDataSource] = useState([])
    const [bookCollectionID, setBookCollectionID] = useState('')
    const [isBookCollectionShow, setBookCollectionShow] = useState(false)


    const onFindBookCollection = async () => {
        const { data } = await getBookCollection({ user_id: itemData._id })
        if (!data.code) return;
        setDataSource(data.data)
    }
    const onClose = () => {
        setIsShow();
    }
    const doubleClick = (value) => {
        setBookCollectionID(value._id)
        setBookCollectionShow(true)
        // console.log(value)
    }
    useEffect(() => {
        //解决 ant-drawer-body 内字体颜色不跟随主题的问题 
        //指定 Drawer 挂载到layout的节点上
        setContainer(document.querySelector('.layout'))
        onFindBookCollection()
    }, [itemData])
    return (
        <Drawer
            title="用户详情"
            size='large'
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={isShow}
        >
            <motion.div variants={staggerOne} >
                <motion.div variants={authFadeInUpVariants} >
                    <Row gutter={[12, 12]}>
                        <Col span={3}>
                            <Avatar size={64} icon={<Image src={itemData.avatar} />} />
                        </Col>
                        <Col span={21} className='user_info'>
                            <Row>
                                <Col span={12}>
                                    <DescriptionsItem title="用户昵称：" content={itemData.user_name} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionsItem title="手机号码：" content={itemData.user_phone} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionsItem title="注册时间：" content={itemData.create_time} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionsItem title="小区：" content={itemData.user_community} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <DescriptionsItem title="详细地址：" content={itemData.user_address} />
                        </Col>
                    </Row>
                </motion.div>
                <motion.div variants={authFadeInUpVariants} >
                    <Divider orientation="center" plain >
                        用户书单
                    </Divider>
                </motion.div>
                <motion.div variants={authFadeInUpVariants} >
                    <Row>
                        <Col span={24}>
                            <TableBase
                                doubleClick={doubleClick}
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </motion.div>
            </motion.div>
            <BookCollectionDetail
                itemID={bookCollectionID}
                isShow={isBookCollectionShow}
                setIsShow={() => { setBookCollectionShow(false) }}
            />
        </Drawer>
    )
}

export default Detail