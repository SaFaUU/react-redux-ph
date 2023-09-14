import { useSelector } from "react-redux";
import Modal from "./components/modal";
import { useState } from "react";

const AllPost = () => {
    const blogs = useSelector((state) => state.blogs);
    const [modalBlog, setModalBlog] = useState({})
    const handleModal = (blog) => {
        setModalBlog(blog)
        document.getElementById('my_modal_1').showModal()
    }
    return (
        <div className="overflow-x-auto w-full">
            <Modal modalBlog={modalBlog}></Modal>
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
                                <td className="px-0"><button className="btn bg-indigo-500 text-white me-0" onClick={() => handleModal(blog)}>Edit</button></td>
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