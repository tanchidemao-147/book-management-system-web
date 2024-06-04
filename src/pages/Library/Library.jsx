import './Library.scss'
import { setCommunity, getLibraryInfo } from '../../api/map'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import ClassComp from '../../components/LibraryComponents/Class/ClassComp'
import Announcement from '../../components/LibraryComponents/Announcement/Announcement'
import { notificationStart } from '../../redux/auth/auth.actions'


const Library = () => {

    const dispatch = useDispatch()
    const [tag, setTags] = useState([])
    const [slideshow, setSlideshow] = useState([])

    const init = async () => {
        const res = await getLibraryInfo()
        if (!res.data.code) return;
        setTags(res.data.data.tags)
        setSlideshow(res.data.data.swiper_list)
    }

    const setClass = async (tags) => {
        const res = await setCommunity({ tags })
        if (!res.data.code) return;
        setTags(tags)
        dispatch(notificationStart({ message: `修改成功`, type: 'success' }))
    }

    const setLibrary = async (swiper_list) => {
        console.log(JSON.stringify({ swiper_list }))
        const res = await setCommunity({ swiper_list })
        if (!res.data.code) return;
        init()
        dispatch(notificationStart({ message: `修改成功`, type: 'success' }))
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div>
                <motion.h3>
                    图书馆公告
                </motion.h3>
                <motion.div>
                    <Announcement slideshow={slideshow} setSlideshow={setLibrary} />
                </motion.div>
            </motion.div>
            <motion.div>
                <motion.h3>
                    图书类型
                </motion.h3>
                <motion.div>
                    <ClassComp
                        tags={tag}
                        setTags={setClass}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )

}
export default Library