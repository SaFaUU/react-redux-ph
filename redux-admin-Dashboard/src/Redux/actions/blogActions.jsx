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

export const deleteBlog = (data) => {
    return {
        type: actionTypes.DELETE_CONTENT,
        payload: data
    }
}

export const updateBlog = (data) => {
    return {
        type: actionTypes.UPDATE_CONTENT,
        payload: data
    }
}

export const setSort = (data) => {
    return {
        type: actionTypes.SET_SORT,
        payload: data
    }
}