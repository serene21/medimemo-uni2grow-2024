import "./Medication.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import logo from "../../assets/images/avatar.svg";
import Avatar from "@mui/material/Avatar";
import pill from "../../assets/images/medications/pill.svg";
import { alpha, Typography } from "@mui/material";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Dose {
  id: number;
  therapyName: string;
  time: string;
  date: string;
  taken: boolean;
  therapy: number;
  prescriptionTime: number;
}

function Medication() {
  const [medications, setMedications] = useState<Dose[]>([]);
  const [checked, setChecked] = useState<Dose[]>(medications);
  const [error, setError] = useState<string>("");
  const [errorUpdate, setErrorUpdate] = useState<string>("");

  const getMedication = async (): Promise<void> => {
    try {
      setError("");
      const response = await fetch("http://localhost:3000/doses");
      const data = await response.json();
      setMedications(data);
    } catch {
      setError("Failed to load medications");
    }
  };

  useEffect(() => {
    getMedication();
  }, []);

  const handleToggle = async (medication: Dose) => {
    try {
      const dose: Dose = { ...medication };
      dose.taken = !dose.taken
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dose)
      };
      setErrorUpdate("");
      const result = await fetch("http://localhost:3000/doses/" + dose.id, requestOptions);
      if (result.ok) {
        medication.taken = !medication.taken;
        const currentIndex = checked.findIndex((x) => x.id === medication.id);
        const newChecked = [...checked];
        if (currentIndex === -1) {
          newChecked.push(medication);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
      }
    } catch {
      setErrorUpdate("Failed to update medication");
    }
  }

  function emptyDoses(doses: Dose[]): boolean {
    return doses.length === 0;
  }
  function isNull(error: string): boolean {
    return error === "";
  }

  const printDate = () => {
    const dateObj = new Date();
    return dateObj.toLocaleDateString("en-UK", { dateStyle: "full" });
  }

  return (
    <>
      <div className="head-container">
        <Avatar src={logo} alt="Avatar" sx={{ width: 75, height: 75 }} />
        <div className="title">
          <Typography variant="h6">Hi, Francesca</Typography>
          <Typography variant="subtitle1">Your Medicines Reminders for today!</Typography>
        </div>
      </div>
      <div className="seond-container">
        <Typography variant="h6" sx={{ mx: "20px", mt: "20px" }}>{printDate()}</Typography>

        <div className="all-list">
          {!isNull(error) ? (
            <Typography sx={{ color: "red" }}>{error}</Typography>
          ) : emptyDoses(medications) ? (
            <div className="empty-doses">
              <Typography sx={{ margin: "20px" }}>No Doses available</Typography>
            </div>
          ) : (
            <List
              disablePadding
              dense
              sx={{
                mx: "20px",
                mb: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              {errorUpdate && <Typography color="error">{errorUpdate}</Typography>}
              <div className="sub-list">
                {medications.filter((item) => item.taken).map((item) => {
                  const labelId = `checkbox-list-primary-label-${item.id}`;
                  return (
                    <ListItem
                      key={item.id}
                      disablePadding
                      sx={{ bgcolor: "#F4F4F4" }}
                    >
                      <ListItemButton
                        sx={{
                          backgroundColor: item.taken ? alpha("#4DD8A7", 0.1) : "transparent",
                        }}
                        role={undefined}
                        onClick={() => handleToggle(item)}
                        dense
                      >
                        <ListItemAvatar>
                          <Avatar alt="pill" src={pill} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="body2">{item.therapyName}</Typography>}
                          secondary={"conjunctivis"}
                        />
                        <div>
                          <Typography
                            variant="caption"
                            sx={{
                              p: "5px",
                              bgcolor: "white",
                              borderRadius: "15px",
                              cursor: "pointer"
                            }}
                          >{item.time}</Typography>
                          <Checkbox
                            icon={<CircleOutlined sx={{ color: "#4DD8A7" }} />}
                            checkedIcon={<CheckCircle sx={{ color: "#4DD8A7" }} />}
                            edge="end"
                            checked={item.taken}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </div>
              <div className="sub-list">
                {medications.filter((item) => !item.taken).map((item) => {
                  const labelId = `checkbox-list-secondary-label-${item.id}`;
                  return (
                    <ListItem
                      key={item.id}
                      disablePadding
                      sx={{ bgcolor: "#F4F4F4" }}
                    >
                      <ListItemButton
                        sx={{
                          backgroundColor: item.taken ? alpha("#4DD8A7", 0.1) : "transparent",
                        }}
                        role={undefined}
                        onClick={() => handleToggle(item)}
                        dense
                      >
                        <ListItemAvatar>
                          <Avatar alt="pill" src={pill} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="body2">{item.therapyName}</Typography>}
                          secondary={"conjunctivis"}
                        />
                        <div>
                          <Typography
                            variant="caption"
                            sx={{
                              p: "5px",
                              bgcolor: "white",
                              borderRadius: "15px",
                              cursor: "pointer"
                            }}
                          >{item.time}</Typography>
                          <Checkbox
                            icon={<CircleOutlined sx={{ color: "#4DD8A7" }} />}
                            checkedIcon={<CheckCircle sx={{ color: "#4DD8A7" }} />}
                            edge="end"
                            checked={item.taken}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </div>
            </List>)}
        </div>
      </div>
    </ >
  );
}

export default Medication;
