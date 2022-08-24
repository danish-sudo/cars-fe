import * as React from "react";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

export default function CarsConfig() {
  const CarsSchema = Yup.object().shape({
    color: Yup.string().required("Field is required"),
    model: Yup.string().required("Field is required"),
    make: Yup.string().required("Field is required"),
    reg_no: Yup.string().required("Field is required"),
  });
  const token = useSelector((state) => state.user.value.token);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  const formik = useFormik({
    initialValues: {
      color: "",
      model: "",
      make: "",
      reg_no: "",
    },
    validationSchema: CarsSchema,
    onSubmit: async () => {
      const response = await axios.post(
        `http://localhost:1338/api/cars`,
        formik.values,
        { headers }
      );
      if (response.data.success) {
        navigate("/dashboard/cars/list");
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
    <FormikProvider value={formik}>
      <Helmet>
        <title>Car Configuration</title>
      </Helmet>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Car Model"
              {...getFieldProps("model")}
              error={Boolean(touched.model && errors.model)}
              helperText={touched.model && errors.model}
              autoComplete="off"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Car Make"
              {...getFieldProps("make")}
              error={Boolean(touched.make && errors.make)}
              helperText={touched.make && errors.make}
              autoComplete="off"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="color"
              label="Car Color"
              {...getFieldProps("color")}
              error={Boolean(touched.color && errors.color)}
              helperText={touched.color && errors.color}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Car Registration Number"
              {...getFieldProps("reg_no")}
              error={Boolean(touched.reg_no && errors.reg_no)}
              helperText={touched.reg_no && errors.reg_no}
              autoComplete="off"
            />
          </Grid>
        </Grid>
        <Button size="large" type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Car
        </Button>
      </Form>
    </FormikProvider>
  );
}
