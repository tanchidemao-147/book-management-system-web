import { motion } from 'framer-motion'
import './Users.scss'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUserList, userWriteOff } from '../../api/users'
import Table from '../../components/UsersComponents/UsersTable'
import { notificationStart, exportExcel } from '../../redux/auth/auth.actions'
import Search from '../../components/UsersComponents/Search/Search'
import DetailDrawer from '../../components/UsersComponents/Detail/Detail'

const Users = () => {
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState({
        search_value: '',
        create_date: [],
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
        const { data } = await getUserList(searchData)
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
    const onDelete = async (values = {}) => {

        const { data } = await userWriteOff(values)
        if (!data.code) return
        onFind()
        dispatch(notificationStart({ message: `注销成功`, type: 'success' }))
        console.log(values);
    }
    const onExport = () => {
        dispatch(exportExcel({ exportType: 'users' }))
    }

    const onReset = () => {
        setSearchData({
            ...searchData,
            ...{
                search_value: '',
                create_date: [],
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
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <DetailDrawer
                itemData={detailItemData}
                isShow={isDetailShow}
                setIsShow={() => { setDetailShow(false) }}
            />
            <Search
                onSearch={onSearch}
                onReset={onReset}
                onExport={onExport}
            />
            <Table
                total={total}
                loading={tableLoading}
                dataSource={dataSource}
                onDetail={onDetail}
                // onUpdate={onUpdate}
                onDelete={onDelete}
                paginationChange={paginationChange}
            />
        </motion.div>
    )
}
export default Users