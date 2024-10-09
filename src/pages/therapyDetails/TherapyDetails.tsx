import React, { useState } from "react";
import "./TherapyDetails.css";
import { Box, Typography, Divider, Menu, MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../../components/header/Header";
import stethoscope from "../../assets/images/contact/stethoscope.svg";
import { useNavigate } from "react-router-dom";
import { Close, Edit } from "@mui/icons-material";

function TherapyDetails() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit  = () => {

  }
  const open = Boolean(anchorEl);
  return (
    <>
      <Header
        title="Conjunctivits"
        showBackButton={true}
        showRightButton={true}
        onBackButtonClick={handleBack}
        onRightButtonClick={()=>handleMenu}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEdit} sx={{gap:2}} ><Edit width="24px" height="24px" /> Edit</MenuItem>
        <MenuItem onClick={handleClose} sx={{gap:2}} ><Close width="24px" height="24px"/> Close</MenuItem>
        
      </Menu>
      <div className="details-container">
        <div className="details-element">
          <Box className="details-element-title">Medecines</Box>
          <Box className="details-element-container">
            <Typography className="details-element-content">
              DROP Sept
            </Typography>
            <ArrowForwardIosIcon width="24px" height="24px" />
          </Box>
        </div>
        <Divider className="divider" />
        <div className="details-element">
          <Box className="details-element-title">Doctor</Box>
          <Box className="details-element-container">
            <img src={stethoscope} width="24px" height="24px" />
            <Typography className="details-element-content">
              Dr. Laura Thompson
            </Typography>
            <ArrowForwardIosIcon width="24px" height="24px" />
          </Box>
        </div>

        <div className="details-element">
          <Box className="details-element-title">Notes</Box>
          <Box className="details-element-container">
            <Box className="note"></Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default TherapyDetails;
