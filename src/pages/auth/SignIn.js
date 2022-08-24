import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import { setCars } from "../../redux/cars";
import Helmet from "react-helmet";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be 6 characters at minimum"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const response = await axios.post(
        `http://localhost:1338/api/users/login`,
        formik.values
      );
      if (response.data.success) {
        dispatch(
          setUser({ email: formik.values.email, token: response.data.token })
        );
        dispatch(setCars({ total: response.data.totalCars }));
        // localStorage.setItem("token", response.data.token);
        navigate("/dashboard/home");
      } else {
        if (response.data.error === 403) {
          alert("Invalid Email/Passowrd");
        } else {
          alert("Unknown Error Occured, Please Try Again");
        }
      }
    },
  });
  const {
    errors,
    touched,
    // setSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Box
        sx={{
          marginTop: 8,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                autoComplete="off"
              />
              <TextField
                fullWidth
                type={"password"}
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                autoComplete="off"
              />

              <Button fullWidth size="large" type="submit" variant="contained">
                Sign In
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            onClick={() => {
              navigate("/register");
            }}
            variant="body2"
          >
            Dont have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
