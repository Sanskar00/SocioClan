import { createSelector } from "reselect";

const selectUser=state=>state.user;

export const selectCurrentUser=createSelector(
    [selectUser],
    (user)=>user.currentUser
)
export const selectMenuStatus=createSelector(
    [selectUser],
    (user)=>user.menuStatus
)
export const selectLoadingStatus=createSelector(
    [selectUser],
    user=>user.loading
)