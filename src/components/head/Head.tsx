import React from "react";

import "../../components/head/Head.css";

import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import moreI from "../../assets/images/head/more_vert.svg";

interface HeadProps {
  arrow?: boolean;
  title?: string;
  more?: boolean;
}

function Head({ arrow = false, title, more = false }: HeadProps): JSX.Element {
  return (
    <div className="containHead">
      {arrow ? <ArrowBackIcon /> : null}
      {
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 14,
           
          }}
        >
          {title}
        </Typography>
      }
      {more ? <img src={moreI} alt=" more" /> : null}
    </div>
  );
}
export default Head;
