import ReactEcharts from "echarts-for-react"
import echarts from "echarts";
import { motion } from 'framer-motion'


const echartsContent = ({ option }) => {

    return (
        <ReactEcharts option={option} />
    )
}
export default echartsContent