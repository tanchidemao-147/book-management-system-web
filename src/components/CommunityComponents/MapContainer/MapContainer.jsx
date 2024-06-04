import "./MapContainer.scss";
import CommunityTree from '../Tree/Tree'
import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Space, Drawer, notification } from 'antd';
import { selectThemeState } from '../../../redux/auth/auth.selectors'
import { getAmapCommunity, getLibraryInfo, setCommunity } from '../../../api/map'

const key = 'a1cd6bacbe2e163af08fe9ce10584c5e'

export default function MapContainer({ isShow, setIsShow }) {
    let map = null
    let polygonPath = useRef([])
    const [treeData, setTreeData] = useState([])
    const themeState = useSelector(selectThemeState)
    const [isTreeShow, setTreeShow] = useState(false)
    const [polyEditor, setPolyEditor] = useState(null);
    const [getContainer, setContainer] = useState(null)
    const [isTreeLoading, setTreeLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [centerCoordinate, setCenterCoordinate] = useState([121.215619, 31.318207]);

    const onClose = () => {
        setTreeShow(false)
        setIsShow();
    }
    const openEditor = () => {
        console.log('开启')
        if (polyEditor) polyEditor.open();
        setTreeShow(true)
    }
    const closeEditor = () => {
        if (polyEditor) polyEditor.close();
    }

    /**
     * 地图配置加载
     */
    const onMapload = async () => {
        AMapLoader.load({
            key, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.PolygonEditor"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等

        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "2D", // 是否为3D地图模式
                    center: centerCoordinate, // 初始化地图中心点位置
                    mapStyle: `amap://styles/${themeState}`, //设置地图的显示样式
                });
                // console.log(polygonPath)
                const polygon = new AMap.Polygon({
                    path: polygonPath.current,
                    strokeColor: "#b69860",
                    strokeWeight: 2,
                    strokeOpacity: .5,
                    fillOpacity: 0.2,
                    fillColor: '#b69860',
                    zIndex: 50,
                    bubble: true,
                })
                const marker = new AMap.Marker({
                    position: centerCoordinate
                });
                map.add([polygon, marker])
                // 缩放地图到合适的视野级别
                map.setFitView([polygon, marker])
                setPolyEditor(i => {
                    i = new AMap.PolygonEditor(map, polygon);
                    i.on('end', queryCommunity)
                    return i
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const onConfirm = async () => {
        const res = await setCommunity({ community_list: treeData, library_scope: polygonPath.current })
        if (!res.data.code) return;
        api.success({ message: '修改成功' })
        onClose()
    }

    const queryCommunity = async ({ target }) => {
        const path = target._opts.path
        if (path.length === 0) return;
        setTreeLoading(true)
        polygonPath.current = path
        const res = await getAmapCommunity({ path })
        if (!res.data.code) return;
        let arr = []
        for (const i of res.data.data.pois) {
            let flag = false
            let tmp = {
                title: i.name,
                key: i.id,
                location: i.location,
            }
            for (const obj of arr) {
                if (obj.key === i.adcode) {
                    obj.children.push(tmp)
                    flag = true
                    break
                }
            }
            if (!flag) {
                arr.push({
                    title: i.adname,
                    key: i.adcode,
                    children: [tmp]
                })
            }
            flag = false
        }
        // console.log(res.data.data.pois)
        setTreeData(arr)
        setTreeLoading(false)
    }

    useEffect(() => {
        setContainer(document.querySelector('.layout'))
        getLibraryInfo().then(res => {
            if (!res.data.code) return;
            setCenterCoordinate(res.data.data.library_address)
            polygonPath.current = res.data.data.library_scope
            onMapload()
        })
        return () => {
            map?.destroy();
        };
    }, [isShow]);

    return (
        <Drawer
            title='配送范围'
            width={1000}
            rootStyle={{ position: 'absolute' }}
            placement="left"
            getContainer={getContainer}
            onClose={onClose}
            forceRender={true}
            open={isShow}
            push={false}
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
            <div className="map_box">
                <div className="map_but_box">
                    <Space>
                        <Button type="primary" onClick={openEditor}>
                            开始编辑
                        </Button>
                        <Button type="primary" onClick={closeEditor}>
                            关闭编辑
                        </Button>
                    </Space>
                </div>
                <div id="container" style={{ height: "100%" }}></div>
            </div>
            <CommunityTree
                isShow={isTreeShow}
                treeData={treeData}
                loading={isTreeLoading}
                mask={false}
                setIsShow={() => { setTreeShow(false) }}
            />
        </Drawer>
    );
}
