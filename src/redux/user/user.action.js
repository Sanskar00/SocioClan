import { UserActionTypes } from "./user.actionType"

export const setCurrentUser=user=>({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
})

export const setMenuStaus=menu=>({
    type:UserActionTypes.SET_MENU_STATUS,
    payload:menu
})

export const setLoading=loading=>({
    type:UserActionTypes.SET_LOADING,
    payload:loading
})
