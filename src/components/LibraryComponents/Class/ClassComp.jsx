import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tag, Tooltip } from 'antd';


const ClassComp = ({ tags, setTags }) => {

    const [inputVisible, setInputVisible] = useState(false);
    const [closable, setClosable] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);


    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);


    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag.value !== removedTag);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, {
                label: inputValue,
                value: inputValue,
            }]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = {
            label: editInputValue,
            value: editInputValue,
        };
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };
    const tagInputStyle = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: 'top',
    };
    return (
        <div>
            <div style={{ marginBottom: 8 }}>
                <Button type='primary' size='small' onClick={() => { setClosable(!closable) }}>
                    {closable ? '取消编辑' : '编辑'}
                </Button>
            </div>
            <Space size={[0, 8]} wrap>
                {tags.map((tag, index) => {
                    if (editInputIndex === index && closable) {
                        return (
                            <Input
                                ref={editInputRef}
                                key={tag.value}
                                size="small"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.value.length > 20;
                    const tagElem = (
                        <Tag
                            color="orange"
                            key={tag.value}
                            closable={closable}
                            style={{
                                userSelect: 'none',
                            }}
                            onClose={() => handleClose(tag.value)}
                        >
                            <span
                                onDoubleClick={(e) => {
                                    setEditInputIndex(index);
                                    setEditInputValue(tag.value);
                                    e.preventDefault();
                                }}
                            >
                                {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag.value} key={tag.value}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                ) : (
                    <Tag color="orange" icon={<PlusOutlined />} onClick={showInput}>
                        新类型
                    </Tag>
                )}
            </Space>
        </div>
    );
};
export default ClassComp;