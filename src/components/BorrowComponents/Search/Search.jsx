import './Search.scss'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react'
import { Form, Input, Space, Button, Select, DatePicker } from 'antd';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const HomeSearch = (props) => {
    const { onSearch, onReset, onExport, options } = props;
    const [form] = Form.useForm();
    const [borrowDate, setBorrowDate] = useState([]);
    const [borrowReturnDate, setBorrowReturnDate] = useState([]);


    const onFinish = (values) => {
        values['borrow_date'] = borrowDate
        values['borrow_return_date'] = borrowReturnDate
        onSearch(values);
    };
    const onResetButton = () => {
        form.resetFields();
        onReset()
    };
    const onExportButton = () => {
        onExport()
    };
    return (
        <div
            className='search_box'
        >
            <Form
                layout="inline"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Form.Item name="search_value" label="全部搜索" >
                    <Input allowClear placeholder='搜索关键字' />
                </Form.Item>
                <Form.Item name="borrow_status" label="借阅状态" >
                    <Select
                        placeholder='请选择'
                        allowClear
                        style={{
                            width: 180,
                        }}
                        options={options}
                    />
                </Form.Item>
                <Form.Item name="borrow_date" label="借阅时间" >
                    <RangePicker format={dateFormat}
                        onChange={(dates = []) => {
                            if (!dates) return setBorrowDate([])
                            const s = (new Date(dates[0].$d)).setHours(0, 0, 0, 0)
                            const e = (new Date(dates[1].$d)).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1
                            setBorrowDate([s, e])
                        }}
                    />
                </Form.Item>
                <Form.Item name="borrow_return_date" label="归还时间" >
                    <RangePicker
                        format={dateFormat}
                        onChange={(dates, dateStrings) => {
                            setBorrowReturnDate(dateStrings)
                        }}
                    />
                </Form.Item>
                <Form.Item >
                    <Space>
                        <Button type="primary" htmlType="submit" >
                            搜索
                        </Button>
                        <Button htmlType="button" onClick={onResetButton}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <div className='but_box'>
                <Space>
                    <Button icon={<DownloadOutlined />} type="primary" htmlType="button" onClick={onExportButton}>
                        导出
                    </Button>
                </Space>
            </div>
        </div>
    )
}
export default HomeSearch