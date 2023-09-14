import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    blogs: [],
    readHistory: [],
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CONTENT:
            return {
                ...state,
                blogs: action.payload
            }
        case actionTypes.READ_BLOG:
            if (action.payload) {
                const newHistory = state.readHistory.filter((blog) => blog._id !== action.payload._id)
                return {
                    ...state,
                    readHistory: [...newHistory, action.payload]
                }
            }
            return state;
        default:
            return state
    }
}

export default blogReducer;

