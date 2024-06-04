import { useEffect, useState } from 'react';
import './Tree.scss'
import { getCommunity, setCommunity } from '../../../api/map'
import { Drawer, Space, Button, Tree, Skeleton, notification } from 'antd';


const CommunityTree = ({ isShow, setIsShow, mask, treeData, loading }) => {

    const [getContainer, setContainer] = useState(null)
    const [baseTreeData, setBaseTreeData] = useState([])
    const [isTreeLoading, setTreeLoading] = useState(loading)
    const [api, contextHolder] = notification.useNotification();
    const [defaultCheckedKeys, setDefaultCheckedKeys] = useState([])

    useEffect(() => {
        setContainer(document.querySelector('.layout'))
        onSearch()
    }, [isShow])

    useEffect(() => {
        setTreeLoading(loading)
        setBaseTreeData(treeData)
    }, [treeData, loading])

    const onSearch = async () => {
        setTreeLoading(true)
        const res = await getCommunity()
        if (!res.data.code) return;
        setBaseTreeData(res.data.data.community_list)
        setDefaultCheckedKeys(res.data.data.community_delivery_list)
        setTreeLoading(false)
    }

    const onClose = () => {
        setIsShow();
    }

    const onCheck = (checkedKeys, info) => {
        setDefaultCheckedKeys(checkedKeys)
        // console.log('onCheck', checkedKeys, info);
    };
    const onConfirm = async () => {
        const res = await setCommunity({
            community_list: baseTreeData,
            community_delivery_list: defaultCheckedKeys
        })
        if (!res.data.code) return;
        api.success({ message: '修改成功' })
        onClose()
    }
    return (
        <Drawer
            title='配送小区'
            mask={mask}
            width={500}
            rootStyle={{ position: 'absolute' }}
            placement="right"
            getContainer={getContainer}
            onClose={onClose}
            open={isShow}
            extra={
                <Space>
                    <Button onClick={onClose}>取消</Button>
                    <Button type="primary" onClick={onConfirm}>
                        确定
                    </Button>
                </Space>
            }
        >
            {contextHolder}
            <Skeleton active loading={isTreeLoading} >
                <Tree
                    checkable
                    defaultCheckedKeys={defaultCheckedKeys}
                    defaultExpandAll={true}
                    onCheck={onCheck}
                    treeData={baseTreeData}
                />
            </Skeleton>
        </Drawer>
    )
}

export default CommunityTree