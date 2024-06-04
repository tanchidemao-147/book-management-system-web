import './BorrowTaskModal.scss'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskResumeCancel, notificationStart, resumeLinkSseStart } from '../../redux/auth/auth.actions'
import { BorrowDetailModal } from '../BorrowComponents/Detail/Detail'
import { Drawer, Collapse, Empty, Button, Row, Col, Modal, Divider } from 'antd';
import { communityDelivery } from '../../api/book'
import { selectTaskResume, selectTaskID, selectResumeData } from '../../redux/auth/auth.selectors'

const BorrowTaskModal = () => {
    const dispatch = useDispatch()
    const handleTaskID = useSelector(selectTaskID)
    const listData = useSelector(selectResumeData)
    const [getContainer, setContainer] = useState(null)
    const taskResumeType = useSelector(selectTaskResume)
    const [collapseData, setCollapseData] = useState([])
    const [submitCommunity, setsubmitCommunity] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDetailShow, setDetailShow] = useState(false)
    const [detailItemData, setDetailItemData] = useState({})



    const onSubmit = (param) => {
        setIsModalOpen(true)
        setsubmitCommunity(param)
    }

    /** 提交数据 */
    const confirmSubmit = async () => {
        const borrowIDs = listData.filter((item) => item.borrow_community === submitCommunity).map((item) => item._id)
        await communityDelivery(borrowIDs)
        setIsModalOpen(false)
        dispatch(resumeLinkSseStart());
        dispatch(notificationStart({ message: '提交完成', type: 'success' }))
    }

    const onDetail = (item) => {
        setDetailItemData(item)
        setDetailShow(true)
    }

    const BorrowTaskList = ({ listData }) => {
        return (
            <div className='list'>
                {
                    listData && listData.map((item, index) =>
                        <Row key={index} >
                            <Col onClick={() => { onDetail(item) }} className={item._id === handleTaskID ? 'active' : ''}>
                                {item.status_type}<br />
                                《{item.book_name}》<br />
                                用户：{item.borrow_user_name} <br />
                                {item.borrow_user_location}  <br />

                            </Col>
                            <Divider />
                        </Row>
                    )
                }
            </div>
        )
    }

    const collapseDataInit = () => {
        let data = []
        for (let i = 0; i < listData.length; i++)
            if (!data.includes(listData[i].borrow_community))
                data.push({
                    key: i + 1,
                    label:
                        <Row>
                            <Col span={20}>
                                {listData[i].borrow_community}
                            </Col>
                            <Col span={4}>
                                <Button type="link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        onSubmit(listData[i].borrow_community)
                                    }}>
                                    完 成
                                </Button>
                            </Col>
                        </Row>,
                    children:
                        <BorrowTaskList
                            listData={listData.filter(item => item.borrow_community === listData[i].borrow_community)}
                        />
                });
        setCollapseData(data)
    }

    const onClose = () => {
        dispatch(taskResumeCancel())
    }
    const detailClose = () => {
        dispatch(resumeLinkSseStart());
        setDetailShow(false)
    }
    useEffect(() => {
        //解决 ant-drawer-body 内字体颜色不跟随主题的问题 
        //指定 Drawer 挂载到layout的节点上
        setContainer(document.querySelector('.layout'))

        //检查是否有点击通知
        if (handleTaskID) onDetail(listData.filter(i => i._id === handleTaskID)[0]);
        collapseDataInit()
    }, [taskResumeType, handleTaskID])
    return (
        <Drawer
            title='上门任务'
            mask={false}
            width={300}
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={taskResumeType}
        >
            <BorrowDetailModal
                itemData={detailItemData}
                isShow={isDetailShow}
                setIsShow={detailClose}
            />
            <Modal title="提示" open={isModalOpen} onOk={confirmSubmit} onCancel={() => { setIsModalOpen(false) }}>
                <p>是否已完成该社区配送任务？</p>
            </Modal>
            {collapseData.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {collapseData.length > 0 && <Collapse defaultActiveKey={collapseData.map(i => i.key)} ghost items={collapseData} />}
        </Drawer>
    )
}

export default BorrowTaskModal