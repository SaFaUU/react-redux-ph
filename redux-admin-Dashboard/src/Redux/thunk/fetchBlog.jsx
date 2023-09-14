import { loadBlog } from "../actions/blogActions"

const fetchBlogData = () => {
    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:5000/get-blogs')
        const data = await res.json()

        if (data.length) {
            console.log(data)
            dispatch(loadBlog(data))
        }
    }
}

export default fetchBlogData;