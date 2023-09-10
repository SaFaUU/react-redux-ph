import NavBar from '../Home/component/NavBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    );
};

export default Main;