import { createSelector } from "reselect";

const selectUser = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectUser],
    auth => auth.currentUser
);

export const selectLoadingState = createSelector(
    [selectUser],
    auth => auth.loading
);

export const selectThemeState = createSelector(
    [selectUser],
    auth => auth.theme
);

export const selectAuthErrors = createSelector(
    [selectUser],
    auth => auth.error
);

export const selectResumeCount = createSelector(
    [selectUser],
    auth => auth.resumeCount
);
export const selectNotificationState = createSelector(
    [selectUser],
    auth => auth.notification
);

export const selectTaskResume = createSelector(
    [selectUser],
    auth => auth.taskResume
);

export const selectTaskID = createSelector(
    [selectUser],
    auth => auth.taskID
);
export const selectResumeData = createSelector(
    [selectUser],
    auth => auth.resumeData
);