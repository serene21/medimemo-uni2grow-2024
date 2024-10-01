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

  const getMedication = async (): Promise<void> => {
    const result = await fetch("http://localhost:3000/doses");
    const datas: Dose[] = await result.json();
    setMedications(datas);
  };

  useEffect(() => {
    getMedication();
  }, []);

  const handleToggle = async (medication: Dose) => {
    medication.taken = !medication.taken
    const currentIndex = checked.findIndex((x) => x.id === medication.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(medication);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medication)
    };

    const result = await fetch("http://localhost:3000/doses/1", requestOptions)

    console.log(result)
  }

  return (
    <div className="background">
      <div className="head-container">
        <Avatar src={logo} alt="Avatar" sx={{ width: 75, height: 75 }} />
        <div className="title">
          <Typography variant="h6">Hi, Francesca</Typography>
          <Typography variant="subtitle1">Your Medicines Reminders for today!</Typography>
        </div>
      </div>
      <div className="panel">
        <Typography variant="h6">Monday, 5th August 2024</Typography>

        <div className="all-list">
          <div className="first-list">
            <List
              disablePadding
              dense
              sx={{
                width: "100%",
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {medications.map((item) => {
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
            </List>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Medication;
