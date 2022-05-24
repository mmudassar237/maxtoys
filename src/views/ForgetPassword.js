import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
//--------------formick-------------------
import { useFormik } from "formik";
import * as yup from "yup";
import './CSS.css';
import Swal from "sweetalert2";


const theme = createTheme();

function ForgetPassword() {
  let history = useHistory();
  const [Loading, setLoading] = React.useState(false);

  // ----------------------axios Api--------------------------------
  const handleSubmit = async (email, password, Cpassword) => {
      if(password !== Cpassword){
          return NotificationManager.error("confirm password not match");
      }
    try {
      setLoading(true);
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      const response = await axios({
        method: "post",
        url: "http://97.74.83.195/maxtoys/reset_password.php",
        data: form,
      });
      if (response.status === 200) {
        await Swal.fire(
          'Password saved',
          '',
          'success'
        )
        history.push("/login");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      error.response
        ? NotificationManager.error(error.response.statusText)
        : NotificationManager.error(error.message);
    }
    // ----------------------axios Api--------------------------------
  };
  //-------------------------------------------------formick validation---------------------
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
    Cpassword: yup
      .string("Enter your confirm password")
      .required("Confirm password is required"),
  });

  // const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      Cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password, Cpassword } = values;
      handleSubmit(email, password, Cpassword );
    },
  });
  // }

  const loginFunc =()=>{
    history.push("/login");
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <NotificationContainer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetIcon sx={{ fontSize:'35px', paddingRight:'2px'}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Cpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              value={formik.values.Cpassword}
              onChange={formik.handleChange}
              error={formik.touched.Cpassword && Boolean(formik.errors.Cpassword)}
              helperText={formik.touched.Cpassword && formik.errors.Cpassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {Loading === true ? "Reseting" : "Reset Password"}
            </Button>
            <span className="loginBTNhover" onClick={()=>loginFunc()}> Login </span>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ForgetPassword;
