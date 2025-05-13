import HomeNavigation from "../components/HomeNavigation.jsx";
import Home from "../Home.jsx";
import {Outlet} from "react-router-dom";

export default function PublicLayout(){
    return(
        <>
            <HomeNavigation/>
            <Outlet/>
        </>
    )
}