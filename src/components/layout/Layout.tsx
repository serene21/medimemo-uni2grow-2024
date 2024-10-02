import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout() {
  return (
    <div className="container">
      <div className="panel">
        <Outlet />
      </div>
      <AppNavigation />
    </div>
  );
}
