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
// export const selectModalStatus =createSelector(
//     [selectUser],
//     user=>user.modalStatus
// )
// export const selectPostImage=createSelector(
//     [selectUser],
//     user=>user.postImage
// )
// export const selectPostUuid=createSelector(
//     [selectUser],
//     user=>user.postUuid
// )