import { UserActionTypes } from "./user.actionType"
export const setCurrentUser=user=>({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
})