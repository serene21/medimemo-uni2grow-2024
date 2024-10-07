import React from "react";

import "../../components/head/Head.css";

import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import moreI from "../../assets/images/head/more_vert.svg";

interface HeadProps {
  backButton?: boolean;
  title?: string;
  showRightButton?: boolean;
  RightButton?: React.ReactNode;
  handleBack?: () => void;
  handleRightClick?: () => void;
}

function Head(props: HeadProps): JSX.Element {
  return (
    <div className="containHead">
      <Button
        sx={{ width: "24px", height: "24px" }}
        variant="text"
        onClick={props.handleBack}
        disabled={!props.backButton}
      >
        {props.backButton && <ArrowBackIcon sx={{ color: "black" }} />}
      </Button>
      {
        <Typography
          sx={{
            textAlign: "center",
            // fontFamily: "Open Sans",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 14
          }}
        >
          {props.title}
        </Typography>
      }
      <Button
        sx={{ width: "24px", height: "24px" }}
        variant="text"
        onClick={props.handleRightClick}
        disabled={!props.showRightButton}
      >
        {(props.showRightButton || props.RightButton) && (
          <img src={moreI} alt=" more" />
        )}
      </Button>
    </div>
  );
}
export default Head;
