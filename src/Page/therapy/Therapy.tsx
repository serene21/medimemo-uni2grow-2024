import React from "react";
import { useNavigate } from "react-router-dom";

import "./Therapy.css";
import {Head} from "../../component/head/Head";

import addButton from "../../assets/icons/therapy/add_circle.svg";

import { IconButton, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function Therapy() {
  const navigate = useNavigate();

  return (
    <div className="therapyContainer">
      <div className="containerHead">
        <Head arrow={false} title="My Therapies" create={false} />
      </div>
      <div className="therapyPanel">
        <div className="search">
          <InputBase
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Therapy"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>

        <div className="therapies">
          <div className="therapy">
            <Typography> Conjunctivitis</Typography>
          </div>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className="therapies">
          <div className="therapy">
            <Typography> Muscle Pain</Typography>
          </div>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
      <div onClick={() => navigate("/addTherapy")} className="addTherapy">
        <img src={addButton} width="60px" height="60px" />
      </div>
    </div>
  );
}
