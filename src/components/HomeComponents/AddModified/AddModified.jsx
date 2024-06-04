import React, { useEffect, useState, useRef } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'
import { notificationStart } from '../../../redux/auth/auth.actions'
import { Form, Modal, Input, Row, Col, Select, Upload, InputNumber, DatePicker } from 'antd';
const { TextArea } = Input;


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};



const AddModified = ({ itemData, isShow, handleOk, handleCancel, confirmLoading, modalTitle, typeOptions }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [bookImage, setbookImage] = useState(null)
    let formData = {
        _id: '',
        book_press: '',
        book_position: '',
        book_number: '',
        book_name: '',
        book_image: '',
        book_auth: '',
        book_count: '',
        book_intro: '',
        book_type: [],
        book_publication_date: '',
        ...itemData
    }

    useEffect(() => {
        if (isShow) {
            formData = {
                ...formData,
                ...itemData,
            }

            setbookImage(itemData.book_image)
            form.setFieldsValue(formData);
            // console.log(itemData);
        }
    }, [isShow, itemData, form]);
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (file && !isJpgOrPng) {
            console.log('You can only upload JPG/PNG file!');
            dispatch(notificationStart({ message: '只能上传 JPG/PNG 文件!', type: 'warning' }))
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (file && !isLt2M) {
            dispatch(notificationStart({ message: '最大上传5MB!', type: 'warning' }))
        }
        return isJpgOrPng && isLt2M;
    };

    const onConfirm = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                values._id = itemData._id
                values.book_image = bookImage
                if (modalTitle == '新增')
                    values.book_surplus_quantity = itemData.book_count
                handleOk(values)
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const uploadBookImg = (info) => {
        setLoading(true);
        getBase64(info.file, (url) => {
            setLoading(false);
            setbookImage(url)
        });

    };

    return (
        <Modal
            width={1000}
            destroyOnClose={true}
            title={modalTitle}
            open={isShow}
            onOk={onConfirm}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <motion.div variants={staggerOne} className='form_box'>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    form={form}
                    initialValues={formData}
                    name="AddModifiedForm"
                >
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={24} >
                                <Form.Item
                                    labelCol={{
                                        span: 2,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请上传图书封面'
                                        },
                                    ]}
                                    name="book_image" label="图书封面">
                                    <Form.Item>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            customRequest={uploadBookImg}
                                        >
                                            {bookImage ? (
                                                <img
                                                    src={bookImage}
                                                    alt="封面图片"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="book_name" label="书名"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input allowClear placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="book_auth" label="作者"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input allowClear placeholder="请输入" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="book_count" label="总数量"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{
                                            width: '100%',
                                        }}
                                        controls={false} placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="book_press" label="出版社"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input allowClear placeholder="请输入" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="book_number" label="ISBN"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >

                                    <InputNumber
                                        style={{
                                            width: '100%'
                                        }}
                                        controls={false} placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="book_publication_date" label="出版日期"

                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    getValueFromEvent={(...[, dateString]) => dateString}
                                    getValueProps={(value) => ({
                                        value: value ? dayjs(value) : undefined
                                    })}
                                >
                                    <DatePicker
                                        format='YYYY-MM-DD'
                                        style={{
                                            width: '100%'
                                        }} allowClear placeholder="请选择日期" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="book_type" label="类型"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        mode="tags"
                                        placeholder="请选择"
                                        style={{
                                            width: '100%',
                                        }}
                                        showSearch
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={typeOptions}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="book_position" label="位置"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input allowClear placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{
                                        span: 2,
                                    }}
                                    name="book_intro" label="内容简介"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="请输入"
                                        style={{
                                            height: 150,
                                            resize: 'none',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>
                </Form>
            </motion.div>
        </Modal >
    )
}

export default AddModified;