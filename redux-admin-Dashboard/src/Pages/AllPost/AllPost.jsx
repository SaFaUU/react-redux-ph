import { useSelector } from "react-redux";

const AllPost = () => {
    const blogs = useSelector((state) => state.blogs);
    return (
        <div className="overflow-x-auto w-full">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Created at</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map((blog, index) =>
                            <tr className="" key={index}>
                                <th>{index + 1}</th>
                                <td>{blog.title}</td>
                                <td>{blog.time}</td>
                                <td className="px-0"><button className="btn bg-indigo-500 text-white me-0">Edit</button></td>
                                <td className="px-0"><button className="btn btn-secondary ">Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllPost;