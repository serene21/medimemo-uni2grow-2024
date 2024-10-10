import React, { useState, useEffect } from "react";
import "./TherapyDetails.css";
import { Box, Typography, Divider, Menu, MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../../components/header/Header";
import stethoscope from "../../assets/images/contact/stethoscope.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { Close, Edit } from "@mui/icons-material";
import { ITherapy } from "../../models/Therapy";
import { IMedicine } from "../../models/Medicine";
import { IPrescription } from "../../models/Prescription";
import { IContact } from "../../models/Contact";

function TherapyDetails() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [therapy, setTherapy] = useState<ITherapy>({
    id: 0,
    name: "",
    userId: 0,
    contact: 0,
  });
  const [error, setError] = useState<string>("");
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [doctor, setDoctor] = useState<IContact>({
    id: 0,
    name: "",
    notes: "",
    qualification: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { value } = location.state;

  const getTherapy = async (id: number) => {
    try {
      const result = await fetch(`http://localhost:80/therapies?id=${id}`);
      const data = await result.json();
      setTherapy(data[0]);
      getDoctor(data[0].contact);
    } catch {
      setError("Something are wrong  when therapy are find, try againt ");
    }
  };

  const getPrescriptionsWithTherapyId = async (id: number) => {
    try {
      const prescriptions = await fetch(
        `http://localhost:80/prescriptions?therapy=${id}`
      );
      const data = await prescriptions.json();
      setPrescriptions(data);
      getMedicines(data);
    } catch {
      setError("Something are wrong when prescriptions are found,try againt");
    }
  };

  const getMedicines = async (prescript: IPrescription[]) => {
    let med: IMedicine[]= [];
    try {
      const medicines = await fetch(`http://localhost:80/medicines`);
      const data = await medicines.json();
      prescript.forEach((item) => {
        const filtered = data.filter((med: IMedicine) => med.id == item.medicine)
        const [tempMed] = filtered; 
        med = [...med, tempMed];
      });
      setMedicines(med);
    } catch {
      setError("Something are wrong when medicines are found, try againt");
    }
  };

  const getDoctor = async (id: number) => {
    try {
      const doctor = await fetch(`http://localhost:80/contacts?id=${id}`);
      const data = await doctor.json();
      setDoctor(data[0]);
    } catch {
      setError("Something are wrong when doctor are found, try againt");
    }
  };

  useEffect(() => {
    getTherapy(value);
    getPrescriptionsWithTherapyId(value);
  }, []);
  const handleBack = () => {
    navigate(-1);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {};

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {};
  const open = Boolean(anchorEl);
  return (
    <>
      <Header
        title={therapy.name}
        showBackButton={true}
        showRightButton={true}
        onBackButtonClick={handleBack}
        onRightButtonClick={() => {handleMenu}}
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
        <MenuItem onClick={handleEdit} sx={{ gap: 2 }}>
          <Edit width="24px" height="24px" /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 2 }}>
          <Close width="24px" height="24px" /> Delete
        </MenuItem>
      </Menu>
      <div className="details-container">
        {medicines.map((item) => {
          return (
            <div key={item.id} className="details-element">
              <Box className="details-element-title">Medecines</Box>
              <Box className="details-element-container">
                <Typography className="details-element-content">
                  {item.name}
                </Typography>
                <ArrowForwardIosIcon width="24px" height="24px" />
              </Box>
            </div>
          );
        })}
        <Divider className="divider" />
        <div className="details-element">
          <Box className="details-element-title">Doctor</Box>
          <Box className="details-element-container">
            <img src={stethoscope} width="24px" height="24px" />
            <Typography className="details-element-content">
              {doctor.qualification}. {doctor.name}
            </Typography>
            <ArrowForwardIosIcon width="24px" height="24px" />
          </Box>
        </div>

        <div className="details-element">
          <Box className="details-element-title">Notes</Box>
          <Box className="details-element-container">
            <Box className="note">{therapy.notes}</Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default TherapyDetails;
