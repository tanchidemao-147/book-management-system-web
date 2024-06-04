import './Search.scss'
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Form, Input, Space, Button, Select, DatePicker } from 'antd';


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const HomeSearch = (props) => {
    const { onSearch, onReset, onAdd, onExport, typeOptions } = props;
    const [form] = Form.useForm();
    const [publicationDate, setPublicationDate] = useState([])
    const onFinish = (values) => {
        values.search_value = values.search_value ? values.search_value.trim() : '';
        values['book_publication_date'] = publicationDate.join()
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
                <Form.Item name="search_value" label="全部搜索"  >
                    <Input allowClear placeholder='请输入' />
                </Form.Item>
                <Form.Item name="book_type" label="类型" >
                    <Select
                        placeholder='请选择'
                        allowClear
                        style={{
                            width: 180,
                        }}
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={typeOptions}
                    />
                </Form.Item>
                <Form.Item name="book_publication_date" label="出版日期" >
                    <RangePicker
                        format={dateFormat}
                        onChange={(dates, dateStrings) => {
                            setPublicationDate(dateStrings)
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
                    <Button type="primary" htmlType="button" onClick={onAdd}>
                        新增
                    </Button>
                    <Button icon={<DownloadOutlined />} type="primary" htmlType="button" onClick={onExportButton}>
                        导出
                    </Button>
                </Space>
            </div>
        </div>
    )
}
export default HomeSearch