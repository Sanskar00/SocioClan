import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import profilePostReducer from "./profilePost/profilePost.reducer";

export default combineReducers({
    user:userReducer,
    profilePost:profilePostReducer
})