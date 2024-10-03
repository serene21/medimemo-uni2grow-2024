// import React from "react";
import { useNavigate } from "react-router-dom";

import "./Contact.css";
import { Head } from "../../components/head/Head";

import addButton from "../../assets/images/contact/add_circle.svg";
import stetoscope from "../../assets/images/contact/stethoscope.svg";

import { IconButton, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

export function Contact(): JSX.Element {
  const navigate = useNavigate();

  interface Contact {
    id: string;
    name: string;
    qualification: string;
    profession: string;
    phone: number;
    email: string;
    address: string;
    notes: string;
  }

  const [contact, setContact] = useState<Contact[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // This function will run once when the component is mounted
    fetch("http://localhost:3000/contacts") // Replace with your API URL
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        setContact(data); // Save data in state
      });
  }, []); // Empty array to run this effect only once (on mount)

  // implementation de la recherche
  const filteredContacts = contact?.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Safe check for name
      contact.profession?.toLowerCase().includes(searchQuery.toLowerCase()) // Safe check for profession
  );

  return (
    <div className="contactContainer">
      <div className="containerHead">
        <Head arrow={false} title="Contacts" more={false} />
      </div>

      <div className="seperateContact">
        <div className="contactPanel">
          <div className="search">
            <InputBase
              fullWidth
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Doctor"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>

          <div className="contactContent">
            {filteredContacts?.map((item) => (
              <div className="contacts" key={item.id}>
                <div className="contact">
                  <img src={stetoscope} alt="stetoscope" />
                  <div className="DoctorVocation">
                    <Typography fontWeight="700" textAlign="left">
                      {" "}
                      {item.qualification}. {item.name}
                    </Typography>
                    <Typography
                      sx={{ color: "#444" }}
                      fontWeight="400"
                      fontSize="10px"
                      //   lineHeight={14}
                    >
                      {item.profession}
                    </Typography>
                  </div>
                </div>
                <IconButton
                  onClick={() => {
                    navigate(`/viewContact/${item.id}`);
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="boxBounding">
        <img src={addButton} width="60px" height="60px" />
      </div>
    </div>
  );
}
