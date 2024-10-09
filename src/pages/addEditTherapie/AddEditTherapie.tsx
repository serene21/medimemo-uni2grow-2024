import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import "./AddEditTherapie.css";
import {
  formError,
  validationTherapy,
  ITherapy,
  therapyForm,
  formValues,
  isNoEmpty,
} from "../../utils/Validation";
import Header from "../../components/header/Header";
import { IMedecine } from "../../models/Medecine";
import { IContact } from "../../models/Contact";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import InputAdornment from "@mui/material/InputAdornment";

function AddEditTherapie() {
  const [therapies, setTherapies] = useState<formValues>({
    name: "",
  });
  const [medicationError, setMedicationError] = useState<string>("");
  const [medicineSelected, setMedicineSelected] = useState<string[]>([]);
  const [medicines, setMedicines] = useState<IMedecine[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [doctorError, setDoctorError] = useState<string>("");
  const [doctors, setDoctors] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState<formError>({
    name: "",
  });

  const getMedication = async (): Promise<void> => {
    try {
      setMedicationError("");
      const response = await fetch("http://localhost:80/medicines");
      const data = await response.json();
      setMedicines(data);
    } catch {
      setMedicationError("Failed to load medicines");
    }
  };

  const getDoctor = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:80/contacts");
      const data = await response.json();
      setContacts(data);
    } catch {
      setDoctorError("Failed to load medecines");
    }
  };

  useEffect(() => {
    getMedication();
    getDoctor();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const error = validationTherapy(name, value);
    setErrors((prevState) => ({
      ...prevState,
      [name]: error || "",
    }));

    setTherapies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e:SelectChangeEvent<string>): void =>{
    const existMedicine = medicineSelected.filter((item)=> item === e.target.value);
    if(existMedicine.length === 0){
      setMedicineSelected([...medicineSelected, e.target.value])
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDoctor = (e: SelectChangeEvent<string>): void => {
    setDoctors(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      doctor: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validationErrors = therapyForm(therapies);
  
    if (Object.keys(validationErrors).length === 0) {
      
      if (medicineSelected.length !== 0 && doctors) {
        try{
          const newTherapy:ITherapy = {
            id:2,
            name: therapies.name,
            userId: 1,
            contact: 2,
            notes : "this is the notes"
          };
          const result = await fetch("http://localhost:80/therapies",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
  
            body: JSON.stringify(newTherapy),
          });
          if(!result.ok){
            setAddError("Add therapy failed");
          }
          handleBack();
        } catch {
          setAddError("Add  therapy failed");
        } 
        
      } else {
        console.log("l'erreur");
        setErrors((prevState) => ({
          ...prevState,
          doctor: "This field is required",
        }));
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form className="therapy-page" onSubmit={handleSubmit}>
        <Header title="" showBackButton onBackButtonClick={handleBack} />

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
              name="name"
              className="therapieField"
              sx={{ width: "100%" }}
              margin="normal"
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {medicineSelected.length !== 0 ? (
                        <HighlightOffIcon sx={{ color: "#F00" }} />
                      ) : null}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          {medicineSelected.length !== 0 ? (
            <>
              {medicineSelected.map((item, index) => (
                <Box className="element" key={index} sx={{ gap: "20" }}>
                  <div className="panel-element">
                    <div className="medecine-name">
                      <div className="medecine-name-title">
                        <Box className="medecine-title">{item}</Box>
                      </div>
                      <div className="medecine-title-button">
                        <ArrowForwardIosIcon />
                      </div>
                    </div>
                    <div className="aline-button">
                      <div
                        onClick={() =>
                          setMedicineSelected(
                            medicineSelected.filter((value) => value !== item)
                          )
                        }
                        className="medecine-name-button"
                      >
                        <Button
                          sx={{ color: "white" }}
                          className="medecine-button"
                        >
                          REMOVE
                        </Button>
                      </div>
                      <div className="medecine-name-button">
                        <Button
                          sx={{ color: "white" }}
                          className="medecine-button"
                        >
                          ADD PROGRAM
                        </Button>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}

              <Box className="element" sx={{ gap: "20" }}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  Add another medication
                </Box>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Search here your medecine</InputLabel>
                  <Select
                    value=""
                    onChange={handleSelect
                    }
                    label="Select one or more medicines"
                  >
                    {!medicationError ? (
                      medicines.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>{medicationError}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box className="element" sx={{ gap: "20" }}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  Select a doctor
                </Box>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Select a doctor</InputLabel>
                  <Select
                    value={doctors}
                    name="doctor"
                    label="Select a doctor"
                    onChange={handleDoctor}
                    error={!!errors.doctor}
                  >
                    {contacts.length !== 0 ? (
                      contacts.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>{doctorError}</MenuItem>
                    )}
                  </Select>
                  {errors.doctor && (
                    <p className="decoration">{errors.doctor}</p>
                  )}
                </FormControl>
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
                  label="Write your notes here"
                />
              </Box>
            </>
          ) : (
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
                  value=""
                  onChange={(e) =>
                    setMedicineSelected([...medicineSelected, e.target.value])
                  }
                  label="Select one or more medicines"
                >
                  {medicines.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </div>
        <div className="bottom-page">
          {medicineSelected.length === 0 ? (
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
          ) : (
            <Button
              className="bottom-button-active"
              sx={{
                backgroundColor: "#F00",
                color: "white",
                width: "100%",
              }}
              type="submit"
            >
              <SaveIcon /> Save
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default AddEditTherapie;
