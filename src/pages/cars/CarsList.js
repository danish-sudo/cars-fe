import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import Helmet from "react-helmet";
import { Delete, Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function CarsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = useCallback(async (page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:1338/api/cars?page=${page}&limit=${perPage}`,
      {
        headers,
      }
    );
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  });

  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const handleSort = async (column, sortDirection) => {
    // simulate server sort
    const response = await axios.get(
      `http://localhost:1338/api/cars?page=${0}&limit=${perPage}&sort=${
        column.sortField
      }&order=${sortDirection}`,
      {
        headers,
      }
    );
    setData(response.data.data);
    setTotalRows(response.data.total);

    setLoading(false);

    // instead of setTimeout this is where you would handle your API call.
  };
  const token = useSelector((state) => state.user.value.token);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:1338/api/cars?page=${page}&limit=${perPage}`,
      {
        headers,
      }
    );
    setData(response.data.data);
    setTotalRows(response.data.total);

    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(0); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      name: "Car Make",
      selector: (row) => row.make,
      sortable: true,
      sortField: "make",
    },
    {
      name: "Car Model",
      selector: (row) => row.model,
      sortable: true,
      sortField: "model",
    },
    {
      name: "Registration Number",
      selector: (row) => row.reg_no,
      sortable: true,
      sortField: "reg_no",
    },
    {
      name: "Car Color",
      selector: (row) => <Box sx={{ bgcolor: row.color, p: 2 }} />,
      sortable: true,
      sortField: "color",
    },
    {
      name: "Car Category",
      selector: (row) => row.cat_id,
      sortable: true,
      sortField: "cat_id",
    },
    {
      name: "Added On",
      selector: (row) => (
        <Typography variant="caption">{formatDate(row.createdAt)} </Typography>
      ),
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Updated On",
      selector: (row) => (
        <Typography variant="caption">{formatDate(row.updatedAt)} </Typography>
      ),
      sortable: true,
      sortField: "updatedAt",
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const navigate = useNavigate();
  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      if (
        window.confirm(
          `Are you sure you want to delete Cars with Make/s:\r ${selectedRows.map(
            (r) => r.make
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        selectedRows.forEach(async (element) => {
          console.log(element);
          await axios.delete(`http://localhost:1338/api/cars/${element._id}`, {
            headers,
          });
        });
        fetchUsers(0);
      }
    };
    const handleUpdate = async () => {
      navigate(`/dashboard/cars/edit/${selectedRows[0]._id}`);
    };

    return (
      <>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
        <IconButton onClick={handleUpdate}>
          <Update />
        </IconButton>
      </>
    );
  }, [fetchUsers, headers, navigate, selectedRows, toggleCleared]);
  return (
    <>
      <Helmet>
        <title>Cars List</title>
      </Helmet>
      <DataTable
        title="Cars List"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        sortServer
        persistTableHead
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        onSort={handleSort}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
}
