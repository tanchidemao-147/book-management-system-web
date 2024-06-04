import { authActionTypes } from './auth.types'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    theme: 'light',
    resumeCount: 0,
    resumeData: [],
    taskResume: false,
    taskID: null,
    notification: null
}
const auth = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case authActionTypes.SIGN_OUT_START:
        case authActionTypes.SIGN_IN_START:
            return {
                ...state,
                loading: true
            }
        case authActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                error: null
            }
        case authActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: null,
                resumeCount: 0,
                resumeData: [],
                taskResume: false,
                taskID: null
            }
        case authActionTypes.SIGN_OUT_FAILURE:
        case authActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case authActionTypes.LOADING_IN_CANCEL:
            return {
                ...state,
                loading: false
            }
        case authActionTypes.LOADING_IN_START:
            return {
                ...state,
                loading: true
            }
        case authActionTypes.NOTIFICATION_IN_SUCCESS:
            return {
                ...state,
                notification: action.payload,
            }
        case authActionTypes.THEME_TOGGLE_END:
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            }
        case authActionTypes.RESUME_LINK_SSE_SUCCESS:
            return {
                ...state,
                resumeData: action.payload,
                resumeCount: action.payload.length,
            }

        case authActionTypes.TASK_RESUME_OPEN:
            return {
                ...state,
                taskResume: true,
                taskID: action.payload
            }
        case authActionTypes.TASK_RESUME_CANCEL:
            return {
                ...state,
                taskResume: false,
                taskID: null
            }
        default:
            return state
    }
}

export default auth