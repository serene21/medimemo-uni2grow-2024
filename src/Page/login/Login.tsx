import { React, useState } from "react";
import "./Login.css";
import {
  Button,
  TextField,
  Link,
  Typography,
  Divider,
  Alert,
  CircularProgress
} from "@mui/material";

import { ValidateForm, ValidateField } from "../../utils/ValidationForm.jsx";

import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import oH from "../../assets/images/Group.png";
import memo from "../../assets/images/MEDIMEMO.png";

import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userName: "",
    passWord: ""
  });
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    // validate field
    const errMessage = ValidateField(fieldName, fieldValue);

    if (!errMessage) {
      setError((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    } else {
      setError((prevState) => ({ ...prevState, [fieldName]: "" }));
    }

    setCredentials((prevState) => {
      setlogin("");
      return { ...prevState, [fieldName]: fieldValue };
    });
  };

  const [error, setError] = useState({
    userName: "",
    passWord: ""
  });
  const [login, setlogin] = useState("");
  const [circularProgress, setCircularProgress] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = ValidateForm(credentials);


      if (Object.keys(error).length === 0) {
        // when you fetch a URL in JS the fetch  will return a promise which is an object with method " then "

        const result = await fetch("http://localhost:3000/users");
        const data = await result.json();
        console.log(data);
        const isThere = data.some((item) => {
          return (
            item.name === credentials.userName &&
            item.password === credentials.passWord
          );
        });
        if (isThere) {
          navigate("/logged");
          //   setlogin("login");
        } else {
          //   navigate("/logged");
          setlogin("login");
        }
      } else {
        setError(error);
      }
    } catch (er) {
      // console.error(er)
    }

    // console.log(error);
  };

  return (
    <>
      <div className="background">
        <div className="logo_container">
          <img className="logo" src={oH} alt={oH} />
          <img className="appName" src={memo} alt={memo} />
        </div>

        <div className="panel">
          <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
            Let's Sign You in!
          </Typography>

          {login ? (
              <Alert
                style={{ marginTop: "5px" }}
                variant="outlined"
                severity="error"
              >
                Email or password incorect!!
              </Alert>
            ) : (
              ""
            )}

          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="userName"
              margin="normal"
              fullWidth
              label="Email or Username"
              variant="outlined"
              value={credentials.userName}
              error={!!error.userName}
              helperText={error.userName}
            />
            <TextField
              onChange={handleChange}
              name="passWord"
              margin="normal"
              padding="10px"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={credentials.passWord}
              type="password"
              error={!!error.passWord}
              helperText={error.passWord}
            />
            <Typography marginBottom={5} textAlign="right">
              <Link
                marginBottom={7}
                style={{ color: "black" }}
                href="#"
                underline="always"
              >
                {"Forget Password"}
              </Link>
            </Typography>
           
            <Button
              type="submit"
              style={{ backgroundColor: "#f00" }}
              fullWidth
              variant="contained"
            >
              Login
            </Button>

           
          </form>
          <Typography
            textAlign="center"
            margin={7}
            paddingBottom={7}
            fontWeight={500}
            fontSize={15}
          >
            Don't have an account ?
            <Link style={{ color: "#f00" }} href="#" underline="always">
              {"Sign up!"}
            </Link>
          </Typography>

          <Divider>Or</Divider>
          <div className="foot">
            <div className="icons" border-color="aliceblue">
              <AppleIcon style={{ color: "black" }} />
            </div>
            <div className="icons">
              <GoogleIcon />
            </div>
            <div className="icons">
              <FacebookRoundedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
