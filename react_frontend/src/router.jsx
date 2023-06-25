import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import MainPage from "./views/MainPage";
import Singup from "./views/Singup";
import Login from "./views/Login";
import Marketplace from "./views/Marketplace";
import MainUserProfile from "./views/MainUserProfile";

const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound></NotFound>,
    },
    {
        path: "/",
        element: <DefaultLayout></DefaultLayout>,
        children:[
            {
                path:'/',
                element:<Navigate to={'/main'}></Navigate>
            },
            {
                path:'/main',
                element:<MainPage></MainPage>
            },
            {
                path:'/marketplace',
                element:<Marketplace></Marketplace>
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/singup",
                element: <Singup></Singup>,
            },
            {
                path: "/profile",
                element: <MainUserProfile></MainUserProfile>
            },
        ]
    },
]);

export default router;
