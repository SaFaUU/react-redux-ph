import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Redux Products</a>
            </div>
            <div className="flex-none space-x-2">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/reading-history">Reading History</Link></li>
                </ul>
                <div className="avatar">
                    <div className="w-7 h-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_645/1af1c2e6be7b3955c79f76a65dd07a13.jpg" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NavBar;