import { Outlet } from "react-router-dom";
import SideNav from "./component/SideNav";

const Dashboard = () => {
    return (
        <div className="flex mt-14">
            <SideNav></SideNav>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;