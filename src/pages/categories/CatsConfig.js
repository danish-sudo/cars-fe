import * as React from "react";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CatsConfig() {
  let { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    setLoading(true);
    if (id) {
      const cat = (
        await axios.get(`http://localhost:1338/api/cats/${id}`, {
          headers,
        })
      ).data.data;
      setFieldValue("type", cat.type);
    }
  };
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
      let response = null;
      if (id) {
        response = await axios.put(
          `http://localhost:1338/api/cats/${id}`,
          formik.values,
          { headers }
        );
      } else {
        response = await axios.post(
          `http://localhost:1338/api/cats`,
          formik.values,
          { headers }
        );
      }
      if (response.data.success) {
        navigate("/dashboard/categories/list");
      }
    },
  });
  const { errors, touched, setFieldValue, handleSubmit, getFieldProps } =
    formik;
  return (
    <>
      {loading ? (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1}>
              <TextField
                fullWidth
                label={`${!id ? "Add New Car Category" : "Update Category"}`}
                {...getFieldProps("type")}
                error={Boolean(touched.type && errors.type)}
                helperText={touched.type && errors.type}
                autoComplete="off"
              />{" "}
            </Grid>
            <Button
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {!id ? <>Add Category</> : <>Update Category</>}
            </Button>
          </Form>
        </FormikProvider>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
