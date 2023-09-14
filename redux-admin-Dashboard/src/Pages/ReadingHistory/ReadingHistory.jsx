import { useSelector } from "react-redux";
import BlogCard from "../Home/component/BlogCard";

const ReadingHistory = () => {
    const readHistory = useSelector((state) => state.readHistory)
    return (
        <div className="mt-20">

            {
                readHistory.length ?
                    <>
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
                                readHistory?.map((blog, index) => <BlogCard key={index} blog={blog}></BlogCard>)
                            }
                        </div>
                    </>
                    :
                    <p>There is currently no history</p>
            }
        </div>
    );
};

export default ReadingHistory;