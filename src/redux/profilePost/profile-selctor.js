import { createSelector } from "reselect";
import profilePost from "../../components/profilePost/profilePost";

const selectUser=state=>state.profilePost;

// export const selectModalStatus =createSelector(
//     [selectUser],
//     profilePost=>profilePost.modalStatus
// )
// export const selectPostImage=createSelector(
//     [selectUser],
//     profilePost=>profilePost.postImage
// )
// export const selectPostUuid=createSelector(
//     [selectUser],
//     profilePost=>profilePost.postUuid
// )
export const selectModalStatus=createSelector(
    [selectUser],
    profilePost=>profilePost.modalStatus
)