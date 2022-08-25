import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { useEffect, useState } from "react";

export default function CarsConfig() {
  let { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [editCar, setEditCar] = useState({});
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    setLoading(true);
    if (id) {
      const car = (
        await axios.get(`http://localhost:1338/api/cars/${id}`, {
          headers,
        })
      ).data.data;
      setFieldValue("make", car.make);
      setFieldValue("model", car.model);
      setFieldValue("color", car.color);
      setFieldValue("reg_no", car.reg_no);
      setFieldValue("cat_id", car.cat_id);
    }

    const response = await axios.get(`http://localhost:1338/api/cats`, {
      headers,
    });
    const temp = [{}];
    response.data.data.forEach((element) => {
      temp.push({ value: element._id, label: element.type });
    });
    setCats(temp);
    setLoading(false);
  };
  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
    setFieldValue("cat_id", event.target.value);
  };
  console.log(editCar.model);
  const formik = useFormik({
    initialValues: {
      color: "",
      model: "",
      make: "",
      reg_no: "",
      cat_id: "",
    },
    validationSchema: CarsSchema,
    onSubmit: async () => {
      let response = null;
      if (id) {
        response = await axios.put(
          `http://localhost:1338/api/cars/${id}`,
          formik.values,
          { headers }
        );
      } else {
        response = await axios.post(
          `http://localhost:1338/api/cars`,
          formik.values,
          { headers }
        );
      }
      if (response.data.success) {
        navigate("/dashboard/cars/list");
      }
    },
  });
  const { errors, touched, setFieldValue, handleSubmit, getFieldProps } =
    formik;
  return (
    <>
      {!loading ? (
        <FormikProvider value={formik}>
          <Helmet>
            <title>Car Configuration</title>
          </Helmet>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
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
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={currency}
                  onChange={handleChange}
                  helperText="Please select your currency"
                >
                  {cats.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Button
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {!id ? <>Add Car</> : <>Update Car</>}
            </Button>
          </Form>
        </FormikProvider>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
