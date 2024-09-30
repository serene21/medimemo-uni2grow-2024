// 



import { useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";
import {
  Button,
  TextField,
  Link,
  Typography,
  Divider,
  Alert,
  // CircularProgress
} from "@mui/material";

import { ValidateForm, ValidateField } from "../../utils/ValidationForm";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import oH from "../../assets/images/Group.png";
import memo from "../../assets/images/MEDIMEMO.png";

import { useNavigate } from "react-router-dom";

// interface Credentials,ErrorState and User for all objects of the type credentials, 
interface Credentials {
  userName: string;
  passWord: string;
}

interface ErrorState {
  userName?: string;
  passWord?: string;
}

interface User{
  
    id : number;
    name : string;
    password : string;
    lastName : string;
    image: string;
    allergies : string;
    phone : number;
    email : string;
    address : String;
  
}

export function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    userName: "",
    passWord: ""
  });

  const [error, setError] = useState<ErrorState>({
    userName: "",
    passWord: ""
  });

  const [login, setLogin] = useState<string>("");
  // const [circularProgress, setCircularProgress] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof Credentials;
    const fieldValue = e.target.value;
    
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
      setLogin("");
      return { ...prevState, [fieldName]: fieldValue };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const error = ValidateForm(credentials);

    if (Object.keys(error).length === 0) {
      try {
        const result = await fetch("http://localhost:3000/users");
        const data = await result.json();

        const isThere = data.some((item: User) => {
          return (
            (item.name === credentials.userName) &&
            (item.password === credentials.passWord)
          );
        });

        if (isThere) {
          navigate("/therapy");
        } else {
          setLogin("login");
        }
      } catch (er) {
        
      }
    } else {
      setError(error);
    }
  };

  return (
    <>
      <div className="background">
        <div className="logo_container">
          <img className="logo" src={oH} alt="Logo" />
          <img className="appName" src={memo} alt="App Name" />
        </div>

        <div className="panel">
          <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
            Let's Sign You in!
          </Typography>

          {login && (
            <Alert
              style={{ marginTop: "5px" }}
              variant="outlined"
              severity="error"
            >
              Email or password incorrect!
            </Alert>
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
              <Link style={{ color: "black" }} href="#" underline="always">
                Forget Password
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

          <Typography textAlign="center" margin={7} fontWeight={500} fontSize={15}>
            Don't have an account? 
            <Link style={{ color: "#f00" }} href="#" underline="always">
              Sign up!
            </Link>
          </Typography>

          <Divider>Or</Divider>

          <div className="foot">
            <div className="icons">
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
