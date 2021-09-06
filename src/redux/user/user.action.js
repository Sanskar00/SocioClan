import { UserActionTypes } from "./user.actionType"
export const setCurrentUser=user=>({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
})
export const setMenuStaus=menu=>({
    type:UserActionTypes.SET_MENU_STATUS,
    payload:menu
})
// export const setModalStatus=modalStatus=>({
//     type:UserActionTypes.SET_MODAL_SATATUS,
//     payload:modalStatus
// })
// export const setPostImage=postImage=>({
//     type:UserActionTypes.SET_POST_IMAGE,
//     payload:postImage
// })

// export const setPostUuid=uuid=>({
//     type:UserActionTypes.SET_POST_UUID,
//     payload:uuid
// })