import { ProfilePostTypes } from "./profilePost.action.type";
const INTIAL_STATE = {
    modalStatus: false,
    postImage:null,
    postUuid:null,
    like:null,
    uploadStatus:false,
    likeModalStatus:false
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
        case ProfilePostTypes.SET_LIKE_STATUS:
            return{
                ...state,
                like:action.payload
            }
        case ProfilePostTypes.SET_UPLOAD_STATUS:
            return{
                ...state,
                uploadStatus:action.payload

            }
        case ProfilePostTypes.LIKE_MODAL_STATUS:
            return{
                ...state,
                likeModalStatus:action.payload
            }
        default:
            return state;
            

    }
}
export default profilePostReducer