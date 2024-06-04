import request from '../utils/requests'

export const adminLogin = (data) => request.post('users/adminLogin', data)

export const adminOutLogin = (data) => request.post('users/adminOutLogin', data)

export const getUserList = (params) => request.get('users/getUserList', { params })

export const userWriteOff = (data) => request.post('users/userWriteOff', data)