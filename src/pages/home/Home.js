import { Alert, Grid } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import Summary from "../../components/Summary";

export default function Home() {
  const email = useSelector((state) => state.user.value.email);
  return (
    <>
      <Grid container justifyContent="center">
        <Alert severity="info" sx={{ mb: 2 }} variant="outlined">
          Hi there, <strong>{email}</strong>
        </Alert>
      </Grid>

      <Summary />
    </>
  );
}
