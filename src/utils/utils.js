
import { store } from '../redux/store'
import { taskResumeOpen } from '../redux/auth/auth.actions'

export const deepClone = (target) => { // WeakMap作为记录对象Hash表（用于防止循环引用） 
    const map = new WeakMap()
    // 判断是否为object类型的辅助函数，减少重复代码 
    function isObject(target) {
        return (typeof target === 'object' && target) || typeof target === 'function'
    }
    function clone(data) {
        // 基础类型直接返回值 
        if (!isObject(data)) {
            return data
        }
        // 日期或者正则对象则直接构造一个新的对象返回 
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }
        // 处理函数对象 
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }
        // 如果该对象已存在，则直接返回该对象 
        const exist = map.get(data)
        if (exist) { return exist }
        // 处理Map对象 
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝 
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }
        // 处理Set对象 
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝 
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }
        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性） 
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述 
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝 
        const result = Object.create(Object.getPrototypeOf(data), allDesc)
        // 新对象加入到map中，进行记录 
        map.set(data, result)
        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝 
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝 
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }
    return clone(target)
}

//时间戳转yyyy-MM-dd格式
export const timeToYMD = (time) => {
    let date = new Date(Number(time))
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    return `${Y}-${(M < 10 ? "0" + M : M)}-${(D < 10 ? "0" + D : D)}`
}

//深度判断两个数组对象是否相同
export const deepEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false
    //循环判断两个数组内的对象是否相同
    for (let i = 0; i < arr1.length; i++) {
        for (let k in arr1[i]) {
            if (arr1[i][k] !== arr2[i][k]) return false
        }
    }
    return true
}

//浏览器Notification通知调用
export const notificationANDAccredit = (title, options) => {
    let n
    if (Notification.permission === 'granted') {
        n = new Notification(title, options)
        n.onclick = function ({ currentTarget }) {
            store.dispatch(taskResumeOpen(currentTarget.data))
            n.close();
        }
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                n = new Notification(title, options)
                n.onclick = function ({ currentTarget }) {
                    store.dispatch(taskResumeOpen(currentTarget.data))
                    n.close();
                }
            }
        })
    }

}
export const taskReminder = (arr) => {
    arr.forEach(item => {
        notificationANDAccredit('上门提醒', {
            body: `${item.borrow_user_location}的${item.borrow_user_name}用户借阅了一本《${item.book_name}》复本`,
            icon: "../images/logo.png",
            data: item._id
        })
    })
}


export const downLoadFile = (fileData, fileName, callBack) => {
    // 创建Blob实例  fileData 接受的是一个Blob
    let blob = new Blob([fileData], {
        type: 'applicationnd.ms-excel',
    })
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
        // 创建a标签
        const link = document.createElement('a')
        // 隐藏a标签
        link.style.display = 'none'
        // 在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 指定源 object的内容
        // 或者说(link.href 得到的是一个地址，你可以在浏览器打开。指向的是文件资源)
        link.href = URL.createObjectURL(blob)
        // console.log('link.href指向的是文件资源', link.href)
        //设置下载为excel的名称
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        // 模拟点击事件
        link.click()
        // 移除a标签
        document.body.removeChild(link)
        // 回调函数，表示下载成功
        callBack(true)
    }
}