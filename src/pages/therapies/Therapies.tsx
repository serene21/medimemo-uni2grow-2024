import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import "./Therapies.css";

import { useEffect, useState } from "react";
import search from "../../assets/images/therapy/Icon.svg";
import add from "../../assets/images/therapy/add_circle.svg";
import arrowBack from "../../assets/images/therapy/arrow_forward_ios.svg";
import { ITherapy } from "../../models/Therapy";

function Therapies() {
  const [therapies, setTherapies] = useState<ITherapy[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getTherapies = async (): Promise<void> => {
    try {
      const result = await fetch("http://localhost:3000/therapies");
      const datas: ITherapy[] = await result.json();
      setTherapies(datas);
    } catch (error) {
      setError("failed to load Therapies");
    }
  };

  useEffect(() => {
    getTherapies();
  }, []);

  const filteredTherapies = therapies?.filter((therapy: ITherapy) =>
    therapy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function emptyTherapies(therapies: ITherapy[]): boolean {
    return therapies.length === 0;
  }
  function isNull(error: string): boolean {
    return error === "";
  }

  return (
    <>
      <Typography className="typography">My Therapies</Typography>
      <div className="searchContainer">
        <Paper
          component="div"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
            borderRadius: 20,
            backgroundColor: "#FFEFEF",
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search therapy"
            inputProps={{ "aria-label": "search therapy" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <img src={search} alt="search icon" />
          </IconButton>
        </Paper>

        <div className="listTherapy">
          {!isNull(error) ? (
            <Typography sx={{ color: "red" }}>{error}</Typography>
          ) : emptyTherapies(therapies) ? (
            <Typography>No therapy available</Typography>
          ) : (
            filteredTherapies.map((therapy: ITherapy) => (
              <Paper
                key={therapy.id}
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-between",
                  backgroundColor: "#F4F4F4",
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                }}
              >
                <div className="therapyName">
                  <Typography
                    sx={{ fontSize: 17, fontWeight: 700 }}
                    className="typography1"
                  >
                    {therapy.name}
                  </Typography>
                </div>

                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="arrowBack"
                >
                  <img src={arrowBack} alt="arrowBack icon" />
                </IconButton>
              </Paper>
            ))
          )}
        </div>
      </div>

      <div className="addContainer">
        <img src={add} alt="add icon" />
      </div>
    </>
  );
}

export default Therapies;
