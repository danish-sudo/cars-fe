import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Helmet } from "react-helmet";

import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const response = await axios.post(
        `http://localhost:1338/api/users`,
        formik.values
      );
      if (response.data.success) {
        alert("Registraion Successfull");
        navigate("/login");
      } else {
        if (response.data.error === 11000) {
          alert("Email Already Exists, try another");
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
          Sign up
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
              <Alert>Random Generated Passoword will be emailed</Alert>

              <Button fullWidth size="large" type="submit" variant="contained">
                Register
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            onClick={() => {
              navigate("/login");
            }}
            variant="body2"
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
