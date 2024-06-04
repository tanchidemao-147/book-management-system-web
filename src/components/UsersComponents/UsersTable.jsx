import TableBase from '../TableBase/TableBase'
import { Space, Tag, Button, Popconfirm } from 'antd'

const UserTable = ({ onDetail, onUpdate, onDelete, dataSource, loading, total, paginationChange }) => {
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
            key: 'user_name',
        },
        {
            title: '手机号',
            align: 'center',
            dataIndex: 'user_phone',
            key: 'user_phone',
        },
        {
            title: '注册时间',
            align: 'center',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '小区',
            align: 'center',
            key: 'user_community',
            dataIndex: 'user_community',
        },
        {
            title: '操作',
            align: 'center',
            key: '操作',
            render: (item) => (
                <Space size="middle">
                    <Button onClick={() => { onDetail(item) }}>详情</Button>
                    {/* <Button type="primary" onClick={() => { onUpdate(item) }}>修改</Button> */}
                    <Popconfirm title="是否注销?" onConfirm={() => onDelete(item)}>
                        <Button type="primary" danger>注 销</Button>
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

export default UserTable