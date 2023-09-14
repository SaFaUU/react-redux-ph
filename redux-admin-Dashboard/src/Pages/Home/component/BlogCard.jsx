import { useDispatch } from "react-redux";
import { readBlog } from "../../../Redux/actions/blogActions";

const ProductCard = ({ blog }) => {
    const dispatch = useDispatch()
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <img src={blog.image} alt="Album" className="object-fill h-56" />
            <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p className="text-left">{blog.content.slice(0, 200)}</p>
                <div className="card-actions justify-end" onClick={() => dispatch(readBlog(blog))}>
                    <button className="btn btn-primary">Read</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;