import axios from "axios";
import { store } from '../redux/store'
import { signOutStart, notificationStart } from '../redux/auth/auth.actions'

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:3000/',
    baseURL: 'http://175.24.174.157:3000/',
    timeout: 10000
})

//请求拦截
instance.interceptors.request.use(function (config) {
    // console.log(config)
    if (store.getState().auth.currentUser) {
        config.headers['Authorization'] = store.getState().auth.currentUser.token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

//响应拦截
instance.interceptors.response.use(function (response) {
    // console.log(response.data)
    //token过期
    if (response.data.status === 401) {
        store.dispatch(signOutStart())
    }
    if (response.data.code === 0)
        store.dispatch(notificationStart({ type: 'error', message: response.data.message }))

    return response
}, function (error) {
    // console.log(error.message)
    store.dispatch(notificationStart({ type: 'error', message: error.message }))
    return Promise.reject(error)
})

export default instance