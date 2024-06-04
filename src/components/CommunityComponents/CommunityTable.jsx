import TableBase from '../TableBase/TableBase'
import { Space, Tag, Button, Popconfirm } from 'antd'

const CommunityTable = ({ onDetail, onDelete, dataSource, loading, total, paginationChange }) => {
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
            title: '用户昵称',
            align: 'center',
            dataIndex: 'user_name',
            width: 170,
            key: 'user_name',
        },
        {
            title: '手机号',
            align: 'center',
            width: 170,
            dataIndex: 'user_phone',
            key: 'user_phone',
        },
        {
            title: '分享类型',
            align: 'center',
            width: 170,
            dataIndex: 'message_type',
            key: 'message_type',
        },
        {
            title: '留言内容',
            align: 'center',
            key: 'message',
            width: 300,
            dataIndex: 'message',
        },
        {
            title: '留言时间',
            align: 'center',
            key: 'create_time',
            width: 170,
            dataIndex: 'create_time',
        },
        {
            title: '操作',
            align: 'center',
            key: '操作',
            width: 390,
            render: (item) => (
                <Space size="middle">
                    <Button onClick={() => { onDetail(item) }}>详情</Button>
                    <Popconfirm title="是否删除?" onConfirm={() => onDelete(item)}>
                        <Button type="primary" danger>删除</Button>
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

export default CommunityTable