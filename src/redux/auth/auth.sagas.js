import { takeLatest, all, put, call } from "redux-saga/effects";
import { store } from '../store'
import { deepEqual, taskReminder, downLoadFile } from '../../utils/utils'
import { authActionTypes } from './auth.types'
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    themeToggleEnd,
    // loadingInStart,
    // loadingInCancel,
    resumeLinkSseSuccess,
    notificationSuccess,
    notificationStart
} from './auth.actions'
import { adminLogin } from '../../api/users'
import { getResumeLinkSse, exportExcel } from '../../api/book'

export function* signAdminLogin(value) {
    try {
        const res = yield adminLogin(value.payload)
        // console.log('res', res.data)
        if (!res.data.code) throw new Error("登录失败");
        res.data.data['token'] = res.data.token
        yield put(signInSuccess(res.data.data))
        // yield put(signInSuccess({ id: 1, token: '123123' }))
    } catch (e) {

        yield put(signInFailure(e.message))
    }
}
export function* signOut() {
    try {
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailure(e.message))
    }
}
export function* themeToggle() {

    // yield put(loadingInStart())
    yield put(themeToggleEnd())
    // yield put(loadingInCancel())
}
export function* resumeLinkSse() {
    try {
        const res = yield getResumeLinkSse()
        const { resumeData } = store.getState().auth
        if (res.status === 200 && res.data.code && !deepEqual(resumeData, res.data.data)) {
            const arr3 = res.data.data.filter(v => resumeData.every(e => e._id != v._id));
            taskReminder(arr3)
            yield put(resumeLinkSseSuccess(res.data.data))
        }
    } catch (error) {
        console.log("sseError========", error);
    }
}

export function* notificationStartFun(value) {
    yield put(notificationSuccess(value.payload))
}

export function* doExportExcel(value) {
    try {
        const res = yield exportExcel(value.payload)
        yield put(notificationStart({ message: `导出成功`, type: 'success' }))
        // console.log('res', res)
        downLoadFile(res.data, 'excel.xlsx', () => { })
    } catch (error) {
        yield put(notificationStart({ message: `导出失败`, type: 'error' }))
        console.log("Error========", error);
    }

}


/**
 * 登录
 */
export function* onSignInStart() {
    yield takeLatest(authActionTypes.SIGN_IN_START, signAdminLogin);
}
/**
 * 退出登录
 */
export function* onSignOutStart() {
    yield takeLatest(authActionTypes.SIGN_OUT_START, signOut);
}
/**
 * 主题切换
 */
export function* onThemeToggleStart() {
    yield takeLatest(authActionTypes.THEME_TOGGLE_START, themeToggle);
}
/**
 * 数据提醒
 */
export function* onResumeLinkSseStart() {
    yield takeLatest(authActionTypes.RESUME_LINK_SSE_START, resumeLinkSse);
}

export function* onNotificationStart() {
    yield takeLatest(authActionTypes.NOTIFICATION_IN_START, notificationStartFun);
}

export function* onExportExcel() {
    yield takeLatest(authActionTypes.EXPORT_EXCEL, doExportExcel);
}




export function* authSagas() {
    yield all([
        call(onSignInStart),
        call(onSignOutStart),
        call(onThemeToggleStart),
        call(onResumeLinkSseStart),
        call(onNotificationStart),
        call(onExportExcel),
    ]);
}