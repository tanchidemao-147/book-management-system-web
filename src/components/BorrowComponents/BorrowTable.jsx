import TableBase from '../TableBase/TableBase'
import { timeToYMD } from '../../utils/utils'
import { Space, Tag, Button, Popconfirm } from 'antd'

const BorrowTable = ({ onDetail, onUpdate, onGiveBack, dataSource, loading, total, paginationChange }) => {
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
            title: '书名',
            align: 'center',
            dataIndex: 'book_name',
            key: 'book_name',
        },
        {
            title: '借阅人',
            align: 'center',
            dataIndex: 'borrow_user_name',
            key: 'borrow_user',
        },
        {
            title: '借阅人联系方式',
            align: 'center',
            dataIndex: 'borrow_phone',
            key: 'borrow_phone',
        },
        {
            title: '借阅时间',
            align: 'center',
            key: 'start_date',
            dataIndex: 'start_date',
            render: (item) => timeToYMD(item)
        },
        {
            title: '预计归还时间',
            align: 'center',
            width: 150,
            key: 'end_date',
            dataIndex: 'end_date',
            render: (item) => timeToYMD(item)
        },
        {
            title: '实际归还时间',
            align: 'center',
            width: 150,
            key: 'borrow_return_date',
            dataIndex: 'borrow_return_date',
            render: (item) => item ? item : '—————'
        },
        {
            title: '借阅状态',
            align: 'center',
            key: 'borrow_status',
            dataIndex: 'borrow_status',
            render: (item) => (
                <>
                    <Tag color="orange" key={item}>
                        {item}
                    </Tag>
                </>
            ),
        },
        {
            title: '操作',
            align: 'center',
            key: '操作',
            render: (item) => (
                <Space size="middle">
                    <Button onClick={() => { onDetail(item) }}>详情</Button>
                    <Button type="primary" onClick={() => { onUpdate(item) }}>修改</Button>
                    <Popconfirm title="确实已归还?" onConfirm={() => onGiveBack(item)}>
                        <Button type="primary"  >归还</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    return (
        <TableBase
            columns={columns}
            dataSource={dataSource}
            total={total}
            paginationChange={paginationChange}
            loading={loading}
        />
    )
}

export default BorrowTable