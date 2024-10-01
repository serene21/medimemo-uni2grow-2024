import React, { useEffect } from "react";
import "./AppNavigation.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, Link, Typography } from "@mui/material";
import contacts from "../../assets/images/appNavigation/contacts.png";
import contactsRed from "../../assets/images/appNavigation/contactsRed.png";
import homeHealth from "../../assets/images/appNavigation/home_health.png";
import homeHealthRed from "../../assets/images/appNavigation/home_healthred.png";
import prescription from "../../assets/images/appNavigation/prescriptions.png";
import prescriptionRed from "../../assets/images/appNavigation/prescriptionsRed.png";

const navItems = [
  {
    path: "/medications",
    name: "Medications",
    icon: homeHealth,
    activeIcon: homeHealthRed,
  },
  {
    path: "/therapies",
    name: "Therapies",
    icon: prescription,
    activeIcon: prescriptionRed,
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: contacts,
    activeIcon: contactsRed,
  },
];

export function AppNavigation() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  const [activepage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="mytherapie">
      <div className="menuBot">
        {navItems.map(({ path, name, icon, activeIcon }) => (
          <div key={path} className="menuBottomItem">
            <div
              className={activepage === path ? "iconClickMiddle" : "iconClick"}
            >
              <IconButton
                component={Link}
                href={path}
                onClick={() => setActivePage(path)}
              >
                <img
                  src={activepage === path ? activeIcon : icon}
                  alt="Home Health"
                />
              </IconButton>
            </div>
            <Typography
              className={
                activepage === path ? "menuBotIconName-over" : "menuBotIconName"
              }
            >
              {name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
