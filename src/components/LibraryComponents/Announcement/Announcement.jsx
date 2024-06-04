import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Image, Upload, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { notificationStart } from '../../../redux/auth/auth.actions'
import { deepClone } from '../../../utils/utils'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const Announcement = ({ slideshow, setSlideshow }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [uploadIndex, setUploadIndex] = useState(-1)


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

    const uploadBookImg = (info) => {
        setLoading(true);
        getBase64(info.file, (url) => {
            let arr = deepClone(slideshow)
            arr[uploadIndex] = {
                ...arr[uploadIndex],
                url
            }
            setSlideshow(arr)
            setLoading(false);
        });

    };

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

    return (
        <Row>
            {/* <Col span={24} style={{ marginBottom: 8 }}>
                <Button type='primary' size='small'>新增</Button>
            </Col> */}
            {
                slideshow.map((item, index) => {
                    return (
                        <Col span={2} key={index}
                            onClick={() => {
                                setUploadIndex(index)
                            }}
                        >
                            <>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    customRequest={uploadBookImg}

                                >
                                    {item.url ? (
                                        <img
                                            src={item.url}
                                            alt="封面图片"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </>
                            <Col span={12}>
                                跳转页：{item.path}
                            </Col>
                        </Col>
                    );
                })
            }
        </Row>
    );
};
export default Announcement;