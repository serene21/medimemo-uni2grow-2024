import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function SubLayout() {
  const location = useLocation();
  return (
    <div className="container">
      <div className="panel">
        <Outlet />
      </div>
      {location.pathname!=="/medications/details" && <AppNavigation /> }
    </div>
  );
}