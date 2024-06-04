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

const Search = (props) => {
    const { onSearch, onReset, onExport } = props;
    const [form] = Form.useForm();
    const [createDate, setCreateDate] = useState([]);

    const onFinish = (values) => {
        if (values.createDate)
            values['create_date'] = createDate
        else values['create_date'] = []
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
                <Form.Item name="createDate" label="注册时间" >
                    <RangePicker
                        format={dateFormat}
                        onChange={(dates, dateStrings) => {
                            setCreateDate(dateStrings)
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
export default Search