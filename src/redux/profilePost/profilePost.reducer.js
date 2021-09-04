import { ProfilePostTypes } from "./profilePost.action.type";
const INTIAL_STATE = {
    modalStatus: false,
    postImage:null,
    postUuid:null,
    like:null
}
const profilePostReducer=(state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ProfilePostTypes.SET_MODAL_SATATUS:
            return {
                ...state,
                modalStatus: action.payload
            }
        case ProfilePostTypes.SET_POST_IMAGE:
            return{
                ...state,
                postImage:action.payload
            }
        case ProfilePostTypes.SET_POST_UUID:
            return{
                ...state,
                postUuid:action.payload
            }
        default:
            return state;

    }
}
export default profilePostReducer