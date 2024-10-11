import { useNavigate } from "react-router-dom";
import FileSave from "../../../assets/images/medications/drug/file_save.svg";
import Header from "../../../components/header/Header";
import "./drug.css";
import Button from "@mui/material/Button";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Drug {
  dosage: string;
  methodOfAdministraion: string;
  contraindications: string;
  warning: string;
  sideEffects: string;
  interactions: string;
  storage: string;
}

const data: Drug = {
  dosage: "30 mg/tablet, 1 tablet daily",
  methodOfAdministraion: `- For ophtalmic use only
   - Shake the bottle well defore use
   - Tilt head back, pull down the lowed eyelid, and apply drops
   - Avoid touching the dropper tip to any surface, including the eye`,
  contraindications: "none",
  warning: "none",
  sideEffects: "none",
  interactions: "none",
  storage: "room temperature",
};

function DrugSpecifications() {
  const navigate = useNavigate();
  const drug: Drug = data;
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleClick = (key: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [key]: !prevOpenItems[key],
    }));
  };
  return (
    <div className="drug-container">
      <Header
        title="DROP Sept"
        showBackButton={true}
        onBackButtonClick={() => navigate(-1)}
      />
      <div className="drug-secondary">
        <div className="drug-title">
          <Button
            variant="text"
            sx={{ bgcolor: "#F00", px: "20px", py: "10px" }}
          >
            <img src={FileSave} alt="File Save" />
            <Typography
              color="initial"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              &nbsp;Information leaflet
            </Typography>
          </Button>
          <Typography
            color="initial"
            sx={{
              textTransform: "none",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "25px",
            }}
          >
            Ophthalmic solution with anti-inflammatory activity suitable for
            cases of eye burning and conjunctivitis.
          </Typography>
        </div>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {Object.entries(drug).map(([key, value]) => (
            <div key={key} className="drug-element">
              <ListItemButton onClick={() => handleClick(key)}>
                <ListItemText
                disableTypography
                  primary={key}
                  sx={{
                    fontFamily: "sans-serif",
                    textTransform: "capitalize",
                    display: "flex",
                    justifyContent: "space-arround",
                    alignItems: "center",
                    flex: 1,
                  }}
                />
                {openItems[key] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={value
                        .split("\n")
                        .map((line: string, index: React.Key) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default DrugSpecifications;
