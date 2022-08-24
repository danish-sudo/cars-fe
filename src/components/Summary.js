import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Button, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const cars = useSelector((state) => state.cars.value.total);
  const navigate = useNavigate();
  const viewAll = () => {
    navigate("/dashboard/cars/list");
  };
  return (
    <Card>
      <CardContent>
        <Title>Registered Cars</Title>
        <Typography variant="h4" color={"text.secondary"}>
          {cars}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on <strong>{new Date().toISOString().split("T")[0]} </strong>
        </Typography>
        <Button variant="outlined" color="secondary" onClick={viewAll}>
          View All
        </Button>
      </CardContent>
    </Card>
  );
}
