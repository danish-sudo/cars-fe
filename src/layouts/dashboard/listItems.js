import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard/home">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Cars
    </ListSubheader>

    <Link to="/dashboard/cars/list">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="List" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/cars/add">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Add" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const categoryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Categories
    </ListSubheader>
    <Link to="/dashboard/categories/list">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="List" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/categories/add">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Add" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
