import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarsList from "./CarsList";

export default function Cars() {
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.value.token);

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    setLoading(true);

    const response = await axios.get(`http://localhost:1338/api/cars`, {
      headers,
    });
    console.log(response.data);
    setRows(response.data.data);
    setLoading(false);
  };
  return <>{!loading && <CarsList nodes={rows} />}</>;
}
