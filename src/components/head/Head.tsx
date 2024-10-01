import React from "react";

import "../../components/head/Head.css";

import { Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import moreI from "../../assets/images/contact/more_vert.svg";

interface HeadProps {
  arrow?: boolean;
  title?: string;
  more?: boolean;
}

export function Head({
  arrow = false,
  title,
  more = false
}: HeadProps): JSX.Element {
  return (
    <div className="containHead">
      {arrow ? <ArrowBackIcon /> : null}
      {<Typography>{title}</Typography>}
      {more ? <img src={moreI} alt=" more" /> : null}
    </div>
  );
}
