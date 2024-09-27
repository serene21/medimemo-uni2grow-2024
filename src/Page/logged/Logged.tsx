import React from "react";

import {
  Typography,
  Avatar,
  Button,
  TextField,
  InputAdornment
} from "@mui/material";

import monAvatar from "../../assets/images/Avatar/3d_avatar_12.png";

import "./Logged.css";
import {Head} from "../../component/head/Head.jsx";

import allergies from "../../assets/icons/logged/allergies.svg";
import universal_currency from "../../assets/icons/logged/universal_currency.svg";
import call from "../../assets/icons/logged/call.svg";
import home from "../../assets/icons/logged/home.svg";
import mail from "../../assets/icons/logged/mail.svg";

export function Logged() {
  return (
    <div className="ContainProfile">
      <Head arrow={true} title="My profile" create={true} />
      <div className="profilePannel">
        <div className="allProfile">
          <Avatar alt="" src={monAvatar} />
          <div className="profile">
            <Typography fontWeight={700} lineHeight={3}>
              Francesca Greco
            </Typography>

            <TextField
              fullWidth
              label="Medical ID"
              placeholder="GRCFNCXXXXXXXXXXXX"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={universal_currency} alt="universal_currency" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="allergies"
              placeholder="No allergies"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={allergies} alt="Allergies" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="phone number"
              placeholder="(555) 123-4567"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={call} alt="Call" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Email"
              placeholder="francesca.greco@example.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={mail} alt="Mail" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Adress"
              placeholder="123 Vision Lane, Suite 200, Cityville, ST 12345"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={home} alt="Home" />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <div>
          <Button
            style={{ color: "white", backgroundColor: "red", width: " 500px" }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
