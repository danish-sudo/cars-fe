import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import { IconButton } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CatsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = useCallback(async (page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:1338/api/cats?page=${page}&limit=${perPage}`,
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
      `http://localhost:1338/api/cats?page=${0}&limit=${perPage}&sort=${
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

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:1338/api/cats?page=${page}&limit=${perPage}`,
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
      name: "Category Type",
      selector: (row) => row.type,
      sortable: true,
      sortField: "type",
    },
    {
      name: "Added On",
      selector: (row) => row.createdAt,
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Updated On",
      selector: (row) => row.updatedAt,
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
          `Are you sure you want to delete Cats with Type/s:\r ${selectedRows.map(
            (r) => r.type
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        selectedRows.forEach(async (element) => {
          console.log(element);
          await axios.delete(`http://localhost:1338/api/cats/${element._id}`, {
            headers,
          });
        });
        fetchUsers(0);
      }
    };
    const handleUpdate = async () => {
      navigate(`/dashboard/categories/edit/${selectedRows[0]._id}`);
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
        <title>Categories List</title>
      </Helmet>
      <DataTable
        title="Categories List"
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
