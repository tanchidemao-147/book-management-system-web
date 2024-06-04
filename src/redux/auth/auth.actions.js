
import { authActionTypes } from './auth.types'

/**
 * 登录start
*/
export const signInStart = userAndPassword => ({
    type: authActionTypes.SIGN_IN_START,
    payload: userAndPassword
})
export const signInSuccess = user => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: user
})
export const signInFailure = error => ({
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: error
})

/**
 * 登录end
 */

/**
 * 退出start
 */
export const signOutStart = () => ({
    type: authActionTypes.SIGN_OUT_START
})
export const signOutSuccess = () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
})
export const signOutFailure = (error) => ({
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: error
})
/**
 * 退出end
 */

/**
 * 启动加载框
 */
export const loadingInStart = () => ({
    type: authActionTypes.LOADING_IN_START
})

/**
 * 关闭加载框
 */
export const loadingInCancel = () => ({
    type: authActionTypes.LOADING_IN_CANCEL
})

/**
 * 主题切换start
 */
export const themeToggleStart = () => ({
    type: authActionTypes.THEME_TOGGLE_START
})
export const themeToggleEnd = () => ({
    type: authActionTypes.THEME_TOGGLE_END
})
/**
 * 主题切换end
 */

/**
 * 数据提醒start
 */
export const resumeLinkSseStart = () => ({
    type: authActionTypes.RESUME_LINK_SSE_START
})
export const resumeLinkSseSuccess = resumeData => ({
    type: authActionTypes.RESUME_LINK_SSE_SUCCESS,
    payload: resumeData
})
/**
 * 数据提醒end
 */

export const notificationStart = payload => ({
    type: authActionTypes.NOTIFICATION_IN_START,
    payload
})

export const notificationSuccess = payload => ({
    type: authActionTypes.NOTIFICATION_IN_SUCCESS,
    payload
})

/**
 * 打开任务窗口
 */
export const taskResumeOpen = payload => ({
    type: authActionTypes.TASK_RESUME_OPEN,
    payload
})
/**
 * 关闭任务窗口
 */
export const taskResumeCancel = () => ({
    type: authActionTypes.TASK_RESUME_CANCEL
})

export const exportExcel = exportType => ({
    type: authActionTypes.EXPORT_EXCEL,
    payload: exportType
})