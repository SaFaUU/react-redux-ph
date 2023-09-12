import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div className="">
            <div className="">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-52 min-h-full bg-base-100 text-base-content text-base ">
                    <li><Link to="/all-post">All Post</Link></li>
                    <li><Link to="/dashboard">Create Post</Link></li>
                </ul>

            </div>
        </div >
    );
};

export default SideNav;