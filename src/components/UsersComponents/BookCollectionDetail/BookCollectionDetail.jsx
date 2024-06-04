import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { Drawer, Row, Col, List } from 'antd';
import { getBookCollectionDetail } from '../../../api/book'
import DescriptionsItem from '../../HomeComponents/DescriptionsItem';
import BookDetail from '../../HomeComponents/Detail/Detail'
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'




const Detail = ({ isShow, setIsShow, itemID }) => {

    const [itemData, setItemData] = useState({})
    const [getContainer, setContainer] = useState(null)
    const [bookItemData, setBookItemData] = useState({})
    const [isBookDetailShow, setBookDetailShow] = useState(false)


    const onFindBookCollection = async () => {
        const { data } = await getBookCollectionDetail({ _id: itemID })
        setItemData(data.data)
    }
    const onClose = () => {
        setIsShow();
    }

    useEffect(() => {
        //解决 ant-drawer-body 内字体颜色不跟随主题的问题 
        //指定 Drawer 挂载到layout的节点上
        setContainer(document.querySelector('.layout'))
        // console.log(itemID)
        if (itemID)
            onFindBookCollection()
    }, [itemID])
    return (
        <Drawer
            title="书单详情"
            size='large'
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={isShow}
        >
            <motion.div variants={staggerOne}  >
                <motion.div variants={authFadeInUpVariants} >
                    <Row gutter={[10, 10]}>
                        <Col span={8}>
                            <DescriptionsItem title="用户昵称：" content={itemData.user_name} />
                        </Col>
                        <Col span={8}>

                            <DescriptionsItem title="手机号码：" content={itemData.user_phone} />
                        </Col>
                        <Col span={8}>
                            <DescriptionsItem title="书单名：" content={itemData.collection_name} />
                        </Col>
                        <Col span={8}>

                            <DescriptionsItem title="收藏数量：" content={itemData.collect_count} />
                        </Col>
                        <Col span={8}>
                            <DescriptionsItem title="是否公开：" content={
                                itemData.public ? '是' : '否'
                            } />
                        </Col>
                    </Row>
                </motion.div>
                <motion.div variants={authFadeInUpVariants} >
                    <Col span={24}>
                        <List
                            size="small"
                            header={<div>书籍</div>}
                            bordered
                            dataSource={itemData.booksList}
                            renderItem={(item) =>
                                <List.Item
                                    onClick={() => {
                                        setBookItemData(item)
                                        setBookDetailShow(true)
                                    }}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    actions={[<div>《 {item.book_name} 》</div>]}
                                />
                            }
                        />
                    </Col>
                </motion.div>
            </motion.div>
            <BookDetail
                itemData={bookItemData}
                isShow={isBookDetailShow}
                setIsShow={() => { setBookDetailShow(false) }}
            />
        </Drawer>
    )
}

export default Detail