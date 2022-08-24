import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function CatsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page) => {
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
  };

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
  return (
    <DataTable
      title="Car Categories"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      sortServer
      persistTableHead
      onSort={handleSort}
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
}
