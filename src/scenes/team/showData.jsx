import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
];

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        setData(
          json.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
          }))
        )
      );
  }, []);

  return (
    <Box m="20px">
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default MyComponent;






import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

const MyComponent2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    // Add edit functionality here
    console.log(`Editing item with ID ${id}`);
  };

  const columns: GridColumnss = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: ({ row }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(row.id)}
          >
            Modifier
          </Button>{" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(row.id)}
          >
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default MyComponent2;