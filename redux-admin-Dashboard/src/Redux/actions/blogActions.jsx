import { actionTypes } from "../actionTypes/actionTypes"

export const loadBlog = (data) => {
    return {
        type: actionTypes.GET_CONTENT,
        payload: data
    }
}
export const readBlog = (data) => {
    return {
        type: actionTypes.READ_BLOG,
        payload: data
    }
}