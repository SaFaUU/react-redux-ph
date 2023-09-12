import BlogCard from "./component/BlogCard";

const Home = () => {
    return (
        <div className="">
            <div className="flex justify-end">
                <div>
                    <select className="select w-full max-w-xs border-black text-xs">
                        <option disabled selected>Sort by</option>
                        <option>Last Upload</option>
                        <option>First Upload</option>
                    </select>
                </div>
            </div>
            <div className="mt-20">
                <BlogCard></BlogCard>
            </div>
        </div>
    );
};

export default Home;