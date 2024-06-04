import { Space, Tag, Button, Popconfirm } from 'antd'
import TableBase from '../TableBase/TableBase'

const TableComponents = ({ dataSource, total, onDetail, onUpdate, onDelete, paginationChange, onBorrow, loading }) => {
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
            title: '作者',
            align: 'center',
            dataIndex: 'book_auth',
            key: 'book_auth',
        },
        {
            title: '剩余数量',
            width: 100,
            align: 'center',
            dataIndex: 'book_surplus_quantity',
            key: 'book_surplus_quantity',
        },
        {
            title: '出版社',
            align: 'center',
            dataIndex: 'book_press',
            key: 'book_press',
        },
        {
            title: 'ISBN',
            align: 'center',
            dataIndex: 'book_number',
            key: 'book_number',
        },
        {
            title: '出版日期',
            align: 'center',
            dataIndex: 'book_publication_date',
            key: 'book_publication_date',
        },
        {
            title: '类型',
            align: 'center',
            key: 'book_type',
            dataIndex: 'book_type',
            render: (types) => (
                <>
                    {types.map((type) => {
                        return (
                            <Tag color="orange" key={type}>
                                {type}
                            </Tag>
                        );
                    })}
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
                    <Button type="primary" onClick={() => { onBorrow(item) }}>借阅</Button>
                    <Popconfirm title="确定删除?" onConfirm={() => onDelete(item)}>
                        <Button type="primary" danger >删除</Button>
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
export default TableComponents