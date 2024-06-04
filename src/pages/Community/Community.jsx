import './Community.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getCommunityList, delCommunityMessage, deleteItemChat } from '../../api/book'
import { notificationStart, exportExcel } from '../../redux/auth/auth.actions'
import { selectCurrentUser } from '../../redux/auth/auth.selectors'
import Search from '../../components/CommunityComponents/Search/Search'
import Table from '../../components/CommunityComponents/CommunityTable'
import CommunityTree from '../../components/CommunityComponents/Tree/Tree'
import DetailDrawer from '../../components/CommunityComponents/Detail/Detail'
import MapContainer from '../../components/CommunityComponents/MapContainer/MapContainer'


const Community = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser);
    const [isMapShow, setMapShow] = useState(false)
    const [isTreeShow, setTreeShow] = useState(false)
    const [searchData, setSearchData] = useState({
        search_value: '',
        leave_date: [],
        page: 1,
        pageSize: 10,
    })
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [isDetailShow, setDetailShow] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [detailItemData, setDetailItemData] = useState({})


    const onFind = async () => {

        setTableLoading(true)
        const { data } = await getCommunityList(searchData)
        if (!data.code) return
        setDataSource(data.data.records)
        setTotal(data.data.total)
        setTableLoading(false)

    }
    useEffect(() => {
        onFind()
    }, [searchData])
    /**
     * 点击详情
     */
    const onDetail = (values = {}) => {
        setDetailItemData(values)
        setDetailShow(true)
    }
    /**
     * 删除新增评论 
     */
    const updateChat = async (values = {}, type) => {

        let newChat = values.chat

        if (type == '评论')
            newChat.forEach(item => {
                delete item['fake']
            });

        if (type == '删除')
            newChat = detailItemData.chat.filter(i => i !== values)

        const { data } = await deleteItemChat({
            ...detailItemData,
            chat: newChat,
            type
        })
        if (!data.code) return
        setDetailItemData(data.data)
        dispatch(notificationStart({ message: `${type}成功`, type: 'success' }))
    }
    /**
     * 删除留言
     */
    const onDelete = async (values = {}) => {

        const { data } = await delCommunityMessage(values)
        if (!data.code) return
        onFind()
        dispatch(notificationStart({ message: `删除成功`, type: 'success' }))
        console.log(values);
    }

    const addChat = () => {
        let data = JSON.parse(JSON.stringify(detailItemData))
        console.log()
        try {
            let type = data.chat[data.chat.length - 1]['fake'] || false
            if (!type) {
                data.chat.push({
                    user_name: '管理员',
                    content: '',
                    user_id: currentUser._id,
                    fake: true
                })
            }
        } catch (e) {
            data.chat.push({
                user_name: '管理员',
                content: '',
                user_id: currentUser._id,
                fake: true
            })
        }

        setDetailItemData(data)
    }
    const onExport = () => {
        dispatch(exportExcel({ exportType: 'community' }))
    }
    const onReset = () => {
        setSearchData({
            ...searchData,
            ...{
                search_value: '',
                leave_date: [],
            }
        })
    }
    const onSearch = (values = {}) => {
        setSearchData({
            ...searchData,
            ...values
        })
    }
    const paginationChange = (params) => {
        setSearchData({
            ...searchData,
            ...params
        })
    }

    return (
        <motion.div
            className='page_box'
        >

            <DetailDrawer
                itemData={detailItemData}
                isShow={isDetailShow}
                updateChat={updateChat}
                addChat={addChat}
                setIsShow={() => { setDetailShow(false) }}
            />
            <MapContainer
                isShow={isMapShow}
                setIsShow={() => { setMapShow(false) }}
            />
            <CommunityTree
                mask={true}
                isShow={isTreeShow}
                setIsShow={() => { setTreeShow(false) }}
            />
            <Search
                onSearch={onSearch}
                onReset={onReset}
                onExport={onExport}
                showMap={() => { setMapShow(true) }}
                showTree={() => { setTreeShow(true) }}
            />
            <Table
                total={total}
                loading={tableLoading}
                dataSource={dataSource}
                onDetail={onDetail}
                onDelete={onDelete}
                paginationChange={paginationChange}
            />
        </motion.div>
    )
}
export default Community