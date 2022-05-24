import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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



const theme = createTheme();

function LoginPage() {
  let history = useHistory();
  const [Loading, setLoading] = React.useState(false);

  // ----------------------axios Api--------------------------------
  const handleSubmit = async (email, password) => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      const response = await axios({
        method: "post",
        // url: "http://qboid.herokuapp.com/login.php",
        url: "http://97.74.83.195/maxtoys/login.php",
        data: form,
      });
      if (response.status === 200) {
        sessionStorage.setItem(
          "MAXTOYS",
          JSON.stringify({ user: "abcdef", time: new Date() })
        );
        history.push("/admin/dashboard");
        // history.push("/maxtoys/admin/");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      error.response
        ? NotificationManager.error(error.response.data.message)
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
  });

  // const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      handleSubmit(email, password);
    },
  });
  // }

const forgetFunc =()=>{
  history.push("/forgetPassword");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {Loading === true ? "Singing In" : "Sign In"}
            </Button>
            <span className="loginBTNhover" onClick={()=>forgetFunc()}> Forget Password </span>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default LoginPage;
