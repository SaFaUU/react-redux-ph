import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    blogs: [],
    readHistory: [],
    sort: ""
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
        case actionTypes.DELETE_CONTENT:
            return {
                ...state,
                blogs: state.blogs.filter((blog) => blog._id !== action.payload._id)
            }
        case actionTypes.UPDATE_CONTENT:
            return {
                ...state,
                blogs: state.blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog)
            }
        case actionTypes.SET_SORT:
            return {
                ...state,
                sort: action.payload
            }
        default:
            return state
    }
}

export default blogReducer;

