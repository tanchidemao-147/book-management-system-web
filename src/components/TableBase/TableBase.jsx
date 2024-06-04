import { useState, memo } from 'react'
// import './TableBase.scss'
import { Table } from 'antd'

const TableComponents = (props) => {
    const { dataSource, total, paginationChange, columns, loading, pagination = true, doubleClick } = props;
    const [table, setTable] = useState({
        current: 1,
        pageSize: 10,
    })

    return (
        <div
            className='table_box'
        >
            <Table
                align='center'
                scroll={{ y: 400, x: 'max-content' }}
                loading={loading}
                pagination={pagination && {
                    current: table.current,
                    pageSize: table.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '500'],
                    total: total,
                    showTotal: (total) => `总共 ${total} 条`,
                    onChange: (current, pageSize) => {
                        setTable({ current, pageSize })
                        paginationChange({ current, pageSize })
                    },
                }}
                onRow={(record) => {
                    return {
                        onDoubleClick: (event) => {
                            doubleClick(record)
                        },
                    };
                }}
                size='small'
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={dataSource}
            />

        </div>
    )
}
export default memo(TableComponents)