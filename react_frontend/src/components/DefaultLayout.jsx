import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Header from "../views/comp/Header";
import Footer from "../views/comp/Footer";



export default function DefaultLayout(props) {

    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}


