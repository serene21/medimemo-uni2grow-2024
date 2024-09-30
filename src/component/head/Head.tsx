import React from "react";
import "./Head.css";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";


interface HeadProps{
   arrow: boolean;
   title: string;
   create: boolean;
}


export function Head({ arrow= false, title, create=false } : HeadProps) {
  return (
    <div className="Head">
      {arrow ? <ArrowBackIcon /> : ""}
      <Typography
        textAlign="center"
        fontSize="20"
        fontStyle="normal"
        fontWeight={700}
      >
        {title}
      </Typography>
      {create ? <CreateOutlinedIcon /> : ""}
    </div>
  );
}
