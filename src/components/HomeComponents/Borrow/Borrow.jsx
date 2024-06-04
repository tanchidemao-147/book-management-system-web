import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './Borrow.scss'
import { motion } from 'framer-motion'
import DescriptionsItem from '../DescriptionsItem';
import { staggerOne, authFadeInUpVariants } from '../../../utils/motion'
import { Form, Modal, Input, Row, Col, InputNumber, DatePicker, Image, Tag, Divider } from 'antd';


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const BorrowModal = ({ itemData = null, bookData, isShow, handleOk, handleCancel, confirmLoading, modalTitle }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (itemData && isShow) {
            // console.log(itemData);
            itemData['borrow_date'] = [
                dayjs(Number(itemData.start_date)),
                dayjs(Number(itemData.end_date))
            ]
            form.setFieldsValue(itemData);
        }
    }, [isShow, itemData, form]);

    const onConfirm = () => {
        form.validateFields()
            .then(({ borrow_date, borrow_phone, borrow_user_name }) => {
                // console.log(borrow_date)
                form.resetFields();
                let start_date = new Date(borrow_date[0].format(dateFormat)).getTime()
                let end_date = new Date(borrow_date[1].format(dateFormat)).getTime()
                const params = {
                    _id: itemData && (itemData._id ?? ''),
                    book_name: bookData.book_name,
                    book_id: bookData._id,
                    borrow_return_date: '',
                    date_str: `${borrow_date[0].format('MM/DD')}-${borrow_date[1].format('MM/DD')}`,                //时间显示格式
                    book_surplus_quantity: bookData.book_surplus_quantity,
                    borrow_status: '借阅中',
                    borrow_user_location: '线下',
                    start_date,
                    end_date,
                    borrow_renew: 0,
                    borrow_phone,
                    borrow_user_name
                }
                handleOk(params)
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            width={1000}
            title={modalTitle}
            open={isShow}
            onOk={onConfirm}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <motion.div variants={staggerOne} className='form_box'>
                <motion.div variants={authFadeInUpVariants} className='book_info'>
                    <Row >
                        <Col span={4} push={2}>
                            <Image
                                width={125}
                                className="book_img"
                                src={bookData.book_image}
                                placeholder={
                                    <Image
                                        preview={false}
                                        src={bookData.book_image}
                                        fallback="data:image/png;base64,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"
                                    />
                                }
                            />
                        </Col>
                        <Col span={16} push={2}>
                            <Row>
                                <Col span={24}>
                                    <DescriptionsItem title="书名：" content={bookData.book_name} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="作者：" content={bookData.book_auth} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="出版社：" content={bookData.book_press} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="ISBN：" content={bookData.book_number} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="出版日期：" content={bookData.book_publication_date} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="类型：" content={
                                        bookData.book_type && bookData.book_type.map((type) => {
                                            return (
                                                <Tag color="orange" key={type}>
                                                    {type}
                                                </Tag>
                                            );
                                        })
                                    }
                                    />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="总数量：" content={bookData.book_count} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="剩余数量：" content={bookData.book_surplus_quantity} />
                                </Col>
                                <Col span={24}>
                                    <DescriptionsItem title="位置：" content={bookData.book_position} />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </motion.div>
                <motion.div variants={authFadeInUpVariants} >
                    <Divider orientation="center" plain >
                        借阅人信息
                    </Divider>
                </motion.div>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    form={form}
                    name="borrowForm"
                >
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="borrow_user_name" label="借阅用户"
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
                                <Form.Item name="borrow_phone" label="用户电话"
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
                        </Row>
                    </motion.div>
                    <motion.div variants={authFadeInUpVariants}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="borrow_date" label="借阅日期"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <RangePicker
                                        style={{
                                            width: '100%'
                                        }}
                                        allowClear
                                        format={dateFormat}
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

export default BorrowModal;