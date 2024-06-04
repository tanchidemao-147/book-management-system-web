import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Drawer, Row, Col, List, Button, Popconfirm, Image, Card, Input } from 'antd';
import DescriptionsItem from '../../HomeComponents/DescriptionsItem';
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'
import BookDetail from '../../HomeComponents/Detail/Detail'
import BookCollectionDetail from '../../UsersComponents/BookCollectionDetail/BookCollectionDetail'


const Detail = ({ isShow, setIsShow, itemData, updateChat, addChat }) => {

    const [getContainer, setContainer] = useState(null)
    const [isContentDetailShow, setContentDetailShow] = useState(false)

    useEffect(() => {
        //解决 ant-drawer-body 内字体颜色不跟随主题的问题 
        //指定 Drawer 挂载到layout的节点上
        setContainer(document.querySelector('.layout'))
    }, [itemData])

    const onClose = () => {
        setIsShow();
    }

    const onEnter = ({ target }) => {
        let obj = JSON.parse(JSON.stringify(itemData))
        obj.chat[obj.chat.length - 1].content = target.value
        console.log(obj)
        updateChat(obj, '评论')
    }
    const onContentClose = () => {
        setContentDetailShow(false);
    }

    const onBookClick = () => {
        setContentDetailShow(true)
    }

    return (
        <Drawer
            title="留言详情"
            size='large'
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={isShow}
        >
            <motion.div variants={staggerOne} >
                <motion.div variants={authFadeInUpVariants} >
                    <Row gutter={[10, 10]}>
                        <Col span={8}>
                            <DescriptionsItem title="用户昵称：" content={itemData.user_name} />
                        </Col>
                        <Col span={8}>
                            <DescriptionsItem title="手机号码：" content={itemData.user_phone} />
                        </Col>
                        <Col span={8}>
                            <DescriptionsItem title="留言时间：" content={itemData.create_time} />
                        </Col>
                        <Col span={8}>
                            <DescriptionsItem title="点赞数量：" content={itemData.good} />
                        </Col>
                        <Col span={24}>
                            <DescriptionsItem title="留言内容：" content={itemData.message} />
                        </Col>
                        <Col span={7}
                            style={{
                                width: 200,
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            {
                                itemData.message_type === '书刊' && itemData.content &&
                                <div>
                                    <Image
                                        onClick={onBookClick}
                                        width={120}
                                        className="book_img"
                                        src={itemData.content.book_image}
                                        preview={false}
                                    />
                                    <BookDetail
                                        itemData={itemData.content}
                                        isShow={isContentDetailShow}
                                        setIsShow={onContentClose}
                                    />
                                </div>
                            }
                            {
                                itemData.message_type === '书单' && itemData.content &&
                                <div>
                                    <Card onClick={onBookClick}>
                                        <p>{itemData.content.collection_name}</p>
                                    </Card>
                                    <BookCollectionDetail
                                        itemID={itemData.content._id}
                                        isShow={isContentDetailShow}
                                        setIsShow={onContentClose}
                                    />
                                </div>
                            }
                        </Col>
                    </Row>
                </motion.div>
                <motion.div variants={authFadeInUpVariants} style={{ "marginTop": "10px" }} >
                    <Col span={24}>
                        <List
                            size="small"
                            header={
                                <Row>
                                    <Col span={12}>
                                        <div>评论</div>
                                    </Col>
                                    <Col span={1} push={11}>
                                        <Button type="link" onClick={addChat} icon={<FormOutlined />} />
                                    </Col>
                                </Row>
                            }
                            bordered
                            dataSource={itemData.chat}
                            renderItem={(item) =>

                                <List.Item
                                    actions={[
                                        <div style={{ textAlign: 'left' }}>{item.user_name}：
                                            {!item.fake ?
                                                item.content
                                                :
                                                <Input style={{
                                                    border: 'none',
                                                    display: 'inline',
                                                    width: '70%'
                                                }}
                                                    onPressEnter={onEnter}
                                                    defaultValue={item.content}
                                                    placeholder="请输入你的评论"
                                                />
                                            }
                                        </div>
                                    ]}
                                    extra={
                                        <Popconfirm title="是否删除该评论?" onConfirm={() => updateChat(item, '删除')}>
                                            <Button type="link" icon={<CloseOutlined />} />
                                        </Popconfirm>
                                    }
                                />
                            }
                        />
                    </Col>
                </motion.div>
            </motion.div>


        </Drawer >
    )
}

export default Detail