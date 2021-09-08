import { ProfilePostTypes } from "./profilePost.action.type"
export const setModalStatus=modalStatus=>({
    type:ProfilePostTypes.SET_MODAL_SATATUS,
    payload:modalStatus
})
export const setPostImage=postImage=>({
    type:ProfilePostTypes.SET_POST_IMAGE,
    payload:postImage
})

export const setPostUuid=uuid=>({
    type:ProfilePostTypes.SET_POST_UUID,
    payload:uuid
})

export const setLikeStatus=like=>({
    type:ProfilePostTypes.SET_LIKE_STATUS,
    payload:like
})
export const setUploadStatus=upload=>({
    type:ProfilePostTypes.SET_UPLOAD_STATUS,
    payload:upload
})