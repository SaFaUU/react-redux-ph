import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div className="">
            <ul className="menu p-4 w-52 min-h-full bg-base-100 text-base-content text-base space-y-3">
                <li><Link to="/dashboard/all-post">All Post</Link></li>
                <li><Link to="/dashboard/create-post">Create Post</Link></li>
            </ul>
        </div>
    );
};

export default SideNav;