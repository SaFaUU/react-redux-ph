import { useEffect } from "react";
import BlogCard from "./component/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import fetchBlogData from "../../Redux/thunk/fetchBlog";
import { setSort } from "../../Redux/actions/blogActions";

const Home = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const sort = useSelector((state) => state.sort)
    useEffect(() => {
        dispatch(fetchBlogData())
    }, [dispatch])
    const handleDropDown = (e) => {
        console.log(e.target.value);
        dispatch(setSort(e.target.value))
    }

    let content;

    if (sort == "Last Upload") {
        content = blogs?.sort((a, b) => new Date(b.time) - new Date(a.time))
    }
    else if (sort === "First Upload") {
        content = blogs?.sort((a, b) => new Date(a.time) - new Date(b.time))
    }
    else {
        content = blogs;
    }

    return (
        <div className="mt-20">
            <div className="flex justify-end">
                <div>
                    <select className="select w-full max-w-xs border-black text-xs" defaultValue={"Sort by"} onChange={handleDropDown}>
                        <option disabled value="Sort by">Sort by</option>
                        <option value="Last Upload">Last Upload</option>
                        <option value="First Upload">First Upload</option>
                    </select>
                </div>
            </div>
            <div className="space-y-4">
                {
                    content?.map((blog, index) => <BlogCard key={index} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default Home;