import request from '../utils/requests'

export const getBooks = (params) => request.get('getBooks', { params })

export const getBookDetail = (params) => request.get('getBookDetail', { params })

export const delBook = (data) => request.post('delBook', data)

export const getBorrowBooks = (params) => request.get('getBorrowBooks', { params })

export const addModifiedBook = (data) => request.post('addModifiedBook', data)

export const borrowBook = (data) => request.post('borrowBook', data)

export const giveBackBook = (data) => request.post('giveBackBook', data)

export const getResumeLinkSse = (data) => request.get('getResumeLinkSse', data)

export const communityDelivery = (data) => request.post('communityDelivery', data)

export const delCommunityMessage = (data) => request.post('delCommunityMessage', data)

export const deleteItemChat = (data) => request.post('deleteItemChat', data)

export const getBookCollection = (params) => request.get('getBookCollection', { params })

export const getBookCollectionDetail = (params) => request.get('getBookCollectionDetail', { params })

export const getCommunityList = (params) => request.get('getCommunityList', { params })

export const exportExcel = (params) => request.get('exportExcel', { params, responseType: 'arraybuffer' })


export const getUserStatistics = (params) => request.get('getUserStatistics', { params })
export const getBorrowStatistics = (params) => request.get('getBorrowStatistics', { params })
export const getBorrowBookStatistics = (params) => request.get('getBorrowBookStatistics', { params })