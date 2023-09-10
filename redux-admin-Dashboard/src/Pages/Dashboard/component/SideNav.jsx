const SideNav = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-52 min-h-full bg-base-100 text-base-content text-base ">
                    <li><a>Create Post</a></li>
                    <li><a>Update Post</a></li>
                    <li><a>Delete Post</a></li>
                </ul>

            </div>
        </div>
    );
};

export default SideNav;