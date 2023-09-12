import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Main from "../Pages/Layout/main";
import ReadingHistory from "../Pages/ReadingHistory/ReadingHistory";
import CreateBlog from "../Pages/CreateBlog/CreateBlog";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: "",
                        element: <CreateBlog></CreateBlog>
                    },
                    {
                        path: "create-post",
                        element: <CreateBlog></CreateBlog>
                    }
                ]
            },
            {
                path: "/reading-history",
                element: <ReadingHistory></ReadingHistory>
            },
        ]
    },

])