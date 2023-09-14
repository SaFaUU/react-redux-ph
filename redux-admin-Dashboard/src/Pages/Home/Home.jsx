import { useEffect } from "react";
import BlogCard from "./component/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import fetchBlogData from "../../Redux/thunk/fetchBlog";

const Home = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    useEffect(() => {
        dispatch(fetchBlogData())
    }, [dispatch])

    return (
        <div className="mt-20">
            <div className="flex justify-end">
                <div>
                    <select className="select w-full max-w-xs border-black text-xs">
                        <option disabled selected>Sort by</option>
                        <option>No Sort</option>
                        <option>Last Upload</option>
                        <option>First Upload</option>
                    </select>
                </div>
            </div>
            <div className="space-y-4">
                {
                    blogs?.map((blog, index) => <BlogCard key={index} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default Home;