import AppNavigation from "../components/AppNavigation.jsx";
import Stories from "../components/Stories.jsx";
import {Outlet} from "react-router-dom";

export default function PublicLayout(){
    return(
        <>
            <AppNavigation/>
            <Outlet/>
        </>
    )
}