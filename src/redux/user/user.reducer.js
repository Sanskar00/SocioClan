import { UserActionTypes } from "./user.actionType";
const INTIAL_STATE = {
    currentUser: null,
    modalStatus: false,
    postImage:null,
    postUuid:null
}

const userReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        // case UserActionTypes.SET_MODAL_SATATUS:
        //     return {
        //         ...state,
        //         modalStatus: action.payload
        //     }
        // case UserActionTypes.SET_POST_IMAGE:
        //     return{
        //         ...state,
        //         postImage:action.payload
        //     }
        // case UserActionTypes.SET_POST_UUID:
        //     return{
        //         ...state,
        //         postUuid:action.payload
        //     }
            
        default:
            return state;

    }
}
export default userReducer;