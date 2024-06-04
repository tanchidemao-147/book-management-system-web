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
    const { onSearch, onReset, onExport, showMap, showTree } = props;
    const [form] = Form.useForm();
    const [createDate, setCreateDate] = useState([]);

    const onFinish = (values) => {
        if (values.createDate)
            values['leave_date'] = createDate
        else values['leave_date'] = []
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
                <Form.Item name="message_type" label="分享类型" >
                    <Select
                        placeholder='请选择'
                        allowClear
                        style={{
                            width: 180,
                        }}
                        options={[

                            {
                                value: '1',
                                label: '书刊',
                            },
                            {
                                value: '2',
                                label: '书单',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="createDate" label="留言时间" >
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
                    <Button type="primary" onClick={showMap}>查看地图</Button>
                    <Button type="primary" onClick={showTree}>配送小区</Button>
                    <Button icon={<DownloadOutlined />} type="primary" htmlType="button" onClick={onExportButton}>
                        导出
                    </Button>
                </Space>
            </div>
        </div>
    )
}
export default Search