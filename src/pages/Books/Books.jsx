import './Books.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getBooks, addModifiedBook, delBook, borrowBook } from '../../api/book'
import { getLibraryInfo } from '../../api/map'
import Table from '../../components/HomeComponents/BookTable'
import { notificationStart, exportExcel } from '../../redux/auth/auth.actions'
import HomeSearch from '../../components/HomeComponents/Search/Search'
import DetailDrawer from '../../components/HomeComponents/Detail/Detail'
import BorrowModal from '../../components/HomeComponents/Borrow/Borrow'
import AddModified from '../../components/HomeComponents/AddModified/AddModified'

const Books = () => {
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState({
        search_value: '',
        book_type: '',
        page: 1,
        pageSize: 10,
    })
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [typeOptions, setTypeOptions] = useState([

        {
            value: '搞笑',
            label: '搞笑',
        },
        {
            value: '悬疑',
            label: '悬疑',
        }
    ])
    const [isDetailShow, setDetailShow] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [detailItemData, setDetailItemData] = useState({})
    const [addModifiedData, setAddModifiedData] = useState({})
    const [borrowModalData, setBorrowModalData] = useState({})
    const [isAddModifiedShow, setAddModifiedShow] = useState(false)
    const [isBorrowModalShow, setBorrowModalShow] = useState(false)
    const [addModifiedModalTitle, setAddModifiedModalTitle] = useState('')
    const [borrowModalConfirmLoading, setBorrowModalConfirmLoading] = useState(false)
    const [addModifiedConfirmLoading, setAddModifiedConfirmLoading] = useState(false)

    const onFind = async () => {
        setTableLoading(true)
        const { data } = await getBooks(searchData)
        const res = await getLibraryInfo()


        if (!data.code) return
        setTypeOptions(res.data.data.tags)
        setDataSource(data.data.records)
        setTotal(data.data.total)
        setTableLoading(false)
    }
    useEffect(() => {
        onFind()
    }, [searchData])
    /**
     * 添加
     */
    const onAdd = () => {
        setAddModifiedModalTitle('新增')
        setAddModifiedData({})
        setAddModifiedShow(true)
    }
    /**
     * 修改
     */
    const onUpdate = (values = {}) => {
        setAddModifiedModalTitle('修改')
        setAddModifiedData(values)
        setAddModifiedShow(true)
    }
    /**
     * 修改确认
     */
    const addModifiedConfirm = async (values = {}) => {
        setAddModifiedConfirmLoading(true)
        console.log('新增数据', values._id);
        const { data } = await addModifiedBook(values)
        setAddModifiedShow(false)
        setAddModifiedConfirmLoading(false)
        if (!data.code) return

        dispatch(notificationStart({ message: `${addModifiedModalTitle}成功`, type: 'success' }))
        onFind()

    }
    /**
     * 详情
     */
    const onDetail = (values = {}) => {
        setDetailItemData(values)
        setDetailShow(true)
    }
    /**
     * 删除
     */
    const onDelete = async (values = {}) => {
        console.log(values);
        const { data } = await delBook({ _id: values._id })
        if (!data.code) return
        dispatch(notificationStart({ message: `删除成功`, type: 'success' }))
        onFind()
    }
    /**
     * 导出
     */
    const onExport = () => {
        dispatch(exportExcel({ exportType: 'book' }))
    }
    /**
     * 借阅
     */
    const onBorrow = (values = {}) => {
        setBorrowModalData(values)
        setBorrowModalShow(true)
        console.log(values);
    }
    /**
     * 借阅确认
     */
    const borrowModalConfirm = async (values = {}) => {
        setBorrowModalConfirmLoading(true)
        // console.log('借阅数据', values);
        const { data } = await borrowBook(values)
        setBorrowModalShow(false)
        setBorrowModalConfirmLoading(false)
        if (!data.code) return

        dispatch(notificationStart({ message: '借阅成功', type: 'success' }))
        onFind()

    }
    /**
     * 重置
     */
    const onReset = () => {
        setSearchData({
            ...searchData,
            ...{
                search_value: '',
                book_type: '',
            }
        })
    }
    /**
     * 搜索
     */
    const onSearch = (values = {}) => {
        setSearchData({
            ...searchData,
            ...values
        })
    }
    /**
     * 分页
     */
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
                setIsShow={() => { setDetailShow(false) }}
            />
            <BorrowModal
                handleOk={borrowModalConfirm}
                modalTitle={"借阅"}
                bookData={borrowModalData}
                isShow={isBorrowModalShow}
                confirmLoading={borrowModalConfirmLoading}
                handleCancel={() => { setBorrowModalShow(false) }}
            />
            <AddModified
                typeOptions={typeOptions}
                handleOk={addModifiedConfirm}
                itemData={addModifiedData}
                isShow={isAddModifiedShow}
                confirmLoading={addModifiedConfirmLoading}
                modalTitle={addModifiedModalTitle}
                handleCancel={() => { setAddModifiedShow(false) }}
            />
            <HomeSearch
                typeOptions={typeOptions}
                onSearch={onSearch}
                onReset={onReset}
                onExport={onExport}
                onAdd={onAdd}
            />
            <Table
                dataSource={dataSource}
                total={total}
                loading={tableLoading}
                onDetail={onDetail}
                onUpdate={onUpdate}
                onDelete={onDelete}
                paginationChange={paginationChange}
                onBorrow={onBorrow}
            />
        </motion.div>
    )
}
export default Books