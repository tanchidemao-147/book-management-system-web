import { motion } from 'framer-motion'
import './Borrow.scss'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getBorrowBooks, getBookDetail, borrowBook, giveBackBook } from '../../api/book'
import Table from '../../components/BorrowComponents/BorrowTable'
import { notificationStart, exportExcel } from '../../redux/auth/auth.actions'
import Search from '../../components/BorrowComponents/Search/Search'
import BorrowModal from '../../components/HomeComponents/Borrow/Borrow'
import { BorrowDetailDrawer } from '../../components/BorrowComponents/Detail/Detail'

const Borrow = () => {
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState({
        search_value: '',
        borrow_status: '',
        borrow_date: [],
        borrow_return_date: [],
        page: 1,
        pageSize: 10,
    })
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [statusOptions, setStatusOptions] = useState([
        {
            value: '待上门',
            label: '待上门',
        },
        {
            value: '借阅中',
            label: '借阅中',
        },
        {
            value: '已归还',
            label: '已归还',
        }
    ])
    const [bookData, setBookData] = useState({})
    const [borrowData, setBorrowData] = useState({})
    const [isDetailShow, setDetailShow] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [detailItemData, setDetailItemData] = useState({})
    const [isBorrowModalShow, setBorrowModalShow] = useState(false)
    const [borrowModalConfirmLoading, setBorrowModalConfirmLoading] = useState(false)


    const onFind = async () => {

        setTableLoading(true)
        const { data } = await getBorrowBooks(searchData)
        if (!data.code) return
        setDataSource(data.data.records)
        setTotal(data.data.total)
        setTableLoading(false)

    }
    useEffect(() => {
        onFind()
    }, [searchData])

    const onDetail = (values = {}) => {
        setDetailItemData(values)
        setDetailShow(true)
    }
    const onUpdate = async (values = {}) => {
        const { data } = await getBookDetail({ _id: values.book_id })
        setBookData(data.data)
        setBorrowData(values)
        setBorrowModalShow(true)
    }
    /**
     * 修改确认
     */
    const borrowModalConfirm = async (values = {}) => {

        setBorrowModalConfirmLoading(true)
        const { data } = await borrowBook(values)
        setBorrowModalShow(false)
        setBorrowModalConfirmLoading(false)
        if (!data.code) return

        dispatch(notificationStart({ message: '修改成功', type: 'success' }))
        onFind()

    }
    const onGiveBack = async (values = {}) => {
        const { data } = await giveBackBook(values)
        if (!data.code) return
        onFind()
        dispatch(notificationStart({ message: `归还成功`, type: 'success' }))
        // console.log(values);
    }
    const onExport = () => {
        dispatch(exportExcel({ exportType: 'borrow' }))
    }


    const onReset = () => {
        setSearchData({
            ...searchData,
            ...{
                search_value: '',
                borrow_status: '',
                borrow_date: [],
                borrow_return_date: [],
            }
        })
    }
    const onSearch = (values = {}) => {
        // console.log(values);
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
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <BorrowDetailDrawer
                itemData={detailItemData}
                isShow={isDetailShow}
                setIsShow={() => { setDetailShow(false) }}
            />
            <BorrowModal
                handleOk={borrowModalConfirm}
                modalTitle={"修改"}
                bookData={bookData}
                itemData={borrowData}
                isShow={isBorrowModalShow}
                confirmLoading={borrowModalConfirmLoading}
                handleCancel={() => { setBorrowModalShow(false) }}
            />
            <Search
                onSearch={onSearch}
                onReset={onReset}
                onExport={onExport}
                options={statusOptions}
            />
            <Table
                total={total}
                loading={tableLoading}
                dataSource={dataSource}
                onDetail={onDetail}
                onUpdate={onUpdate}
                onGiveBack={onGiveBack}
                paginationChange={paginationChange}
            />
        </motion.div>
    )
}
export default Borrow