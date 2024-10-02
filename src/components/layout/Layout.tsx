import React from "react";
import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout() {
  const location = useLocation();
  return (
    <div className="container">
      <div className="panel">
        <Outlet />
      </div>
      {location.pathname!=="/layout/medications/details" && <AppNavigation />}
    </div>
  );
}
