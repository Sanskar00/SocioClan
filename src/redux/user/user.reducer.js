import { UserActionTypes } from "./user.actionType";
const INTIAL_STATE = {
    loading:false,
    currentUser: null,
    menuStatus:null
}

const userReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                loading:true
            }
        case UserActionTypes.SET_MENU_STATUS:
            return{
                ...state,
                menuStatus:action.payload
            }
        case UserActionTypes.SET_LOADING:
            return{
                ...state,
                loading:action.payload
            }
        default:
            return state;

    }
}
export default userReducer;