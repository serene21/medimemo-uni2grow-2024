import React from "react";
import { Outlet } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout(){
    return(
        <div className="layout-container">
            <Outlet/>
            <AppNavigation/>
        </div>
    )
}