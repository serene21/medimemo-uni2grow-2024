import React, { useEffect } from "react";
import "./AppNavigation.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, Link, Typography } from "@mui/material";
import { ItemNavigation, dataItem } from "../../utils/navigationData";

export function AppNavigation() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  const [activepage, setActivePage] = useState<string>(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
      <div className="menuBot">
        {dataItem.map((item: ItemNavigation) => (
          <div
            key={item.path}
            className="menuBottomItem"
            onClick={() => setActivePage(item.path)}
          >
            <div
              className={
                activepage === item.path ? "iconClickMiddle" : "iconClick"
              }
            >
              <IconButton component={Link} href={item.path}>
                <img
                  src={activepage === item.path ? item.activeIcon : item.icon}
                  alt="Home Health"
                />
              </IconButton>
            </div>
            <Typography
              className={
                activepage === item.path
                  ? "menuBotIconName-over"
                  : "menuBotIconName"
              }
            >
              {item.name}
            </Typography>
          </div>
        ))}
      </div>
  );
}
