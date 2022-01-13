import {combineReducers} from "redux";

// reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";

export default combineReducers({ // combine reducers for root reducer
    auth: authReducer,
    errors: errorReducer,
    post: postReducer
});