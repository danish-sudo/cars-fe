import * as React from "react";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CarsConfig() {
  const CatsSchema = Yup.object().shape({
    type: Yup.string().required("Field is required"),
  });
  const token = useSelector((state) => state.user.value.token);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  const formik = useFormik({
    initialValues: {
      type: "",
    },
    validationSchema: CatsSchema,
    onSubmit: async () => {
      const response = await axios.post(
        `http://localhost:1338/api/cats`,
        formik.values,
        { headers }
      );
      if (response.data.success) {
        navigate("/dashboard/categories/list");
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
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1}>
          <TextField
            fullWidth
            label="Add New Car Category"
            {...getFieldProps("type")}
            error={Boolean(touched.type && errors.type)}
            helperText={touched.type && errors.type}
            autoComplete="off"
          />{" "}
        </Grid>
        <Button size="large" type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Category
        </Button>
      </Form>
    </FormikProvider>
  );
}
