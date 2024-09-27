import React from "react";
import "./Head.css";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

export function Head({ arrow, title, create }) {
  return (
    <div className="Head">
      {!!arrow ? <ArrowBackIcon /> : ""}
      <Typography
        textAlign="center"
        fontSize="20"
        fontStyle="normal"
        fontWeight={700}
      >
        {title}
      </Typography>
      {!!create ? <CreateOutlinedIcon /> : ""}
    </div>
  );
}
