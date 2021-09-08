import { UserActionTypes } from "./user.actionType";
const INTIAL_STATE = {
    currentUser: null,
    menuStatus:null
}

const userReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SET_MENU_STATUS:
            return{
                ...state,
                menuStatus:action.payload
            }
        default:
            return state;

    }
}
export default userReducer;