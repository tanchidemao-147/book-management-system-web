import './Home.scss'
import * as echarts from 'echarts';
import CountUp from 'react-countup';
import { motion } from 'framer-motion'
import { useSelector } from "react-redux";
import { Row, Col, Statistic } from 'antd'
import { deepClone } from '../../utils/utils'
import { useState, useEffect, useRef } from 'react'
import { getUserStatistics, getBorrowStatistics, getBorrowBookStatistics } from '../../api/book'
import { authPageFadeInVariants } from '../../utils/motion'
import { selectThemeState } from '../../redux/auth/auth.selectors'

const Home = () => {
    const themeState = useSelector(selectThemeState)
    let oneEcharts = useRef(null)
    let towEcharts = useRef(null)
    let threeEcharts = useRef(null)
    const [userTotal, setUserTotal] = useState(0)
    const [borrowTotal, setBorrowTotal] = useState(0)
    const [communityTotal, setCommunityTotal] = useState(0)
    const [doDayTotal, setDoDayTotal] = useState(0)
    const [oneOption, setOneOption] = useState({
        title: {
            text: '注册用户'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '注册人数',
                type: 'line',
                stack: 'Total',
                areaStyle: {
                    normal: {
                        color: '#f5f2e6' //改变区域颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#b69860', //改变折线点的颜色
                        lineStyle: {
                            color: '#b69860' //改变折线颜色
                        }
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
            },
        ]
    })
    const [towOption, setTowOption] = useState({
        barWidth: 20,
        title: {
            text: '借阅书籍类型'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
            {
                name: '借阅数量',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230],
                itemStyle: {
                    normal: {
                        color: '#c2af86',
                    }
                },
            },
        ]
    })
    const [threeOption, setThreeOption] = useState({
        barWidth: 20,
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['product', '配送', '线下'],
            source: []
        },
        grid: {
            top: '10%',
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#c2af86',
                }
            },
        }, { type: 'bar' }]
    })
    const formatter = (value) => <CountUp end={value} separator="," />;

    const initOne = async () => {
        let temp = JSON.parse(JSON.stringify(oneOption))
        const res = await getUserStatistics()
        setUserTotal(res.data.data.total)
        if (temp.hasOwnProperty('series')) {
            temp.series = [
                {
                    name: '注册人数',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {
                        normal: {
                            color: themeState === 'dark' ? '#211d18' : '#f5f2e6' //改变区域颜色
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#b69860', //改变折线点的颜色
                            lineStyle: {
                                color: '#b69860' //改变折线颜色
                            }
                        }
                    },
                    data: res.data.data.data
                },
            ]
        }

        setOneOption(temp)
        var myChart = echarts.init(oneEcharts.current);
        myChart.setOption(temp);
    }

    const initTow = async () => {

        let temp = JSON.parse(JSON.stringify(towOption))
        const res = await getBorrowStatistics()

        temp.yAxis.data = res.data.data.typeData
        temp.series[0].data = res.data.data.data

        setBorrowTotal(res.data.data.total)
        var myChart = echarts.init(towEcharts.current);
        setTowOption(temp)
        myChart.setOption(temp);
    }

    const initThree = async () => {
        let temp = JSON.parse(JSON.stringify(threeOption))
        const res = await getBorrowBookStatistics()
        temp.dataset.source = res.data.data.data

        setDoDayTotal(res.data.data.doDayBorrowTotal)
        setCommunityTotal(res.data.data.communityTotal)
        var myChart = echarts.init(threeEcharts.current);
        setThreeOption(temp)
        myChart.setOption(temp);
    }
    useEffect(() => {

        initOne()
        initTow()
        initThree()

    }, [themeState])

    return (
        <motion.div
            className='page_box'
            variants={authPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Row >
                <Col span={8}>
                    <div ref={oneEcharts} style={{ height: '300px' }}></div>

                </Col>
                <Col span={11}>
                    <div ref={towEcharts} style={{ height: '300px' }}></div>
                </Col>
                <Col span={5} style={{ textAlign: 'center', marginTop: '80px' }}>
                    <Row gutter={[16, 40]}>
                        <Col span={12}>
                            <Statistic title="总借阅数量：" value={borrowTotal} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="今日借阅数量：" value={doDayTotal} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="社区分享数量：" value={communityTotal} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="APP用户：" value={userTotal} formatter={formatter} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div ref={threeEcharts} style={{ height: '300px' }}></div>
                </Col>
            </Row>
        </motion.div >
    )
}
export default Home