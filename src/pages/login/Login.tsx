import {
  Alert,
  Button,
  Card,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import a from "../../assets/images/login/apple-logo.png";
import g from "../../assets/images/login/google.png";
import oh from "../../assets/images/login/Group (4).png";
import f from "../../assets/images/login/icons8-facebook-nouveau-48.png";
import medimo from "../../assets/images/login/MEDIMEMO.png";
import { validateForm, validationField } from "../../utils/Validation";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationField(fieldName, value);
    if (!error) {
      setErrors((prevState) => ({ ...prevState, [fieldName]: "" }));
    } else {
      setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
    }

    setCredentials((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const errors = validateForm(credentials);
      if (Object.keys(errors).length === 0) {
        const result = await fetch("http://localhost:3000/users");
        const datas = await result.json();

        const test = datas.some(
          (item) =>
            item.username === credentials.username &&
            item.password === credentials.password
        );
        if (test) {
          setCredentials({ username: "", password: "" });
          navigate("/dashboard");
        } else {
          setSnackbarMessage("Email or password incorrect");
          setCredentials({ username: "", password: "" });
          setOpenSnackbar(true);
        }
      } else {
        setErrors(errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="container">
        <div className="img">
          <img alt="title" src={oh} />
        </div>

        <div className="img">
          <img alt="title" src={medimo} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="container2">
            <div className="divTitle">
              <Typography fontWeight={700} fontSize={20}>
                Lets Sign You In
              </Typography>
            </div>
            <div className="container3">
              <div className="textfielddiv">
                <TextField
                  id="outlined-basic"
                  label="Email or Username"
                  variant="outlined"
                  color="error"
                  value={credentials.username}
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>

              <div className="textfielddiv">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  color="error"
                  value={credentials.password}
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>
            </div>
            <div className="divforgot">
              <Typography>
                <Link sx={{ color: "black" }}>Forgot Password</Link>
              </Typography>
            </div>
            <div className="divbutton">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold",
                  width: "80%",
                }}
                type="submit"
              >
                Login
              </Button>
            </div>

            <div>
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                Dont have an account?
                <span>
                  <Typography>
                    <Link sx={{ color: "red" }}>Sign up!</Link>
                  </Typography>
                </span>
              </Typography>
            </div>
            <div className="divor">
              <span>
                <hr />
              </span>
              <span>or</span>
              <span>
                <hr />
              </span>
            </div>

            <div className="divimage">
              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="apple" src={a} />
              </Card>

              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="google" src={g} />
              </Card>
              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="facebook" src={f} />
              </Card>
            </div>
          </div>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={8000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Login;
