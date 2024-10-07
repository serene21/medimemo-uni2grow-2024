import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import SaveIcon from "@mui/icons-material/Save";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import "./AddEditTherapie.css";

function AddEditTherapie() {
  const [therapyName, setTherapyName] = useState("");
  const [medication, setMedication] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Therapy saved:", therapyName, medication);
    // Logique pour enregistrer la thérapie
  };

  const handleBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <>
      <div className="therapy-page">
        <IconButton>
          {" "}
          <WestIcon />
        </IconButton>
        <div className="therapyContent">
          <Box className="element" sx={{ gap: "20" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              New therapy
            </Box>
            <TextField
              label="New therapy"
              className="therapieField"
              sx={{ width: "100%" }}
              margin="normal"
            />
          </Box>
          <Box className="element" sx={{ gap: "20" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              Select one ore more therapy
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select one or more medicines</InputLabel>
              <Select
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                label="Select one or more medicines"
              >
                <MenuItem value="med1">Medicine 1</MenuItem>
                <MenuItem value="med2">Medicine 2</MenuItem>
                <MenuItem value="med3">Medicine 3</MenuItem>
              </Select>
            </FormControl>
            <div className="panel-element">
              <div className="medecine-name">
                <div className="medecine-name-title">
                  <Box className="medecine-title">Drop SEPT</Box>
                </div>
                <div className="medecine-title-button">
                  <ArrowForwardIosIcon />
                </div>
              </div>
              <div className="aline-button">
                <div className="medecine-name-button">
                  <Typography className="medecine-button">REMOVE</Typography>
                </div>
                <div className="medecine-name-button">
                  <Typography className="medecine-button">
                    ADD PROGRAM
                  </Typography>
                </div>
              </div>
            </div>
          </Box>
          <Box
            component="section"
            sx={{
              p: 2,
              border: "1px dashed grey",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              gap: 1,
            }}
          >
            <ControlPointIcon /> ADD ANOTHER MEDICATION
          </Box>
          <Box className="element" sx={{ gap: "20" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              Select a doctor
            </Box>
            <TextField
              label="Select a doctor"
              className="therapieField"
              sx={{ width: "100%" }}
              margin="normal"
            />
          </Box>
          <Box className="element" sx={{ gap: "20" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              Notes
            </Box>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              className="therapieField"
              sx={{ width: "100%", height: "83px" }}
              margin="normal"
            />
          </Box>
        </div>
        <div className="bottom-page">
          <Button
            className="bottom-button"
            sx={{
              backgroundColor: "#F00",
              color: "white",
              width: "100%",
            }}
          >
            <SaveIcon /> Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddEditTherapie;
