import request from '../utils/requests'

export const getAmapCommunity = (data) => request.post('getAmapCommunity', data)

export const getCommunity = (data) => request.post('getCommunity', data)

export const setCommunity = (data) => request.post('setCommunity', data)

export const getLibraryInfo = (data) => request.post('getLibraryInfo', data)
