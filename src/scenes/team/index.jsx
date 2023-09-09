import { Box, Typography, useTheme, Modal, ModalTitle, TextField, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
// import { Button,  } from "react-bootstrap";
import ReactModal from 'react-modal';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddIcon from '@mui/icons-material/Add';
const Team = () => {

  const [data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [id, setId] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        setData(
          json.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            age: item.age,
            phone: item.phone,
          }))
        )
      );
  }, []);
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(response => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => console.log(error));
  // }, []);


  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };

  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const handleEdit = (id) => {
    // Add edit functionality here
    console.log(`Editing item with ID ${id}`);
  };


  const handleView = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };



  // Fonction pour fermer le formulaire modal
  const closeModal = () => {
    setOpenModal(false);
  };


  const [selectedUser, setSelectedUser] = useState(null);
  const [modifiedUser, setModifiedUser] = useState({
    name: '',
    // username: '',
    email: '',
    // phone: '',
    // website: ''
  });

  const handleInputChange = (event) => {
    setModifiedUser({
      ...modifiedUser,
      [event.target.name]: event.target.value
    });
  }


  const [open, setOpen] = useState(false);
  const [openModif, setOpenmodif] = useState(false);
  // const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };


  const handleOpenModif = (params) => {
    setSelectedUser(params.row);
    setModifiedUser(params.row)
    setOpenmodif(true);
  };

  const handleCloseAdd = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenmodif(false);
  };



  const selectedData = data.find((d) => d.id === selectedId);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row }) => {



    //     return (
    //       <Box
    //         width="20%"
    //         m="0 auto"
    //         p="2px"
    //         display="flex"
    //         justifyContent="center"
    //         // backgroundColor={
    //         //   access === "admin"
    //         //     ? colors.greenAccent[600]
    //         //     : access === "manager"
    //         //     ? colors.greenAccent[700]
    //         //     : colors.greenAccent[700]
    //         // }
    //         borderRadius="2px"
    //       >
    //         {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />} */}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {/* {access} */}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },

    {
      field: "   Voir |     Modifier   |  Supprimer",
      headerName: " Voir  |  Modifier  |  Supprimer",
      flex: 1,

      renderCell: ({ row }) => {
        return (
          <>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleView(row.id)}
                style={{ marginRight: "10px" }}
              >
                <VisibilityOutlinedIcon />



              </Button>

            </Box>

            <Button
              variant="contained"
              color="secondary"
              // onClick={() => handleEdit(row.id)}
              onClick={handleOpenModif}            >
              < EditOutlinedIcon />
            </Button>{" "}

            <Button
              variant="outlined"
              color="error"

              onClick={() => handleDelete(row.id)}
              style={{ marginLeft: "10px" }}

            >
              < DeleteOutlinedIcon />
            </Button>

          </>
        );
      },
    },
  ];
  // const App = () => {
  // const [openModal, setOpenModal] = useState(false);




  // DEBUT formulaire d'Ajout
  const AddModal = () => {
    return (
      <Box>
        {/* <Button variant="contained" onClick={handleOpen}>
          Ouvrir Modal
        </Button> */}
        <Modal
          open={open}
          onClose={handleCloseAdd}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              // height: 500,
              bgcolor: theme.palette.background.paper,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h5" component="h2">
              Ajouter un Utilisateur
            </Typography>
            <TextField id="name" label="Name" variant="outlined" fullWidth margin="normal" />
            <TextField id="role" label="Role" variant="outlined" fullWidth margin="normal" />
            <TextField id="role" label="Type" variant="outlined" fullWidth margin="normal" />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* <Button variant="contained" color="primary" fullWidth onClick={handleClose}> */}
              <Button variant="contained" color="error" onClick={handleClose}>

                Annuler
              </Button>
              <Button variant="contained" color="success">
                Valider
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  //Fin de formulaire d'Ajout

  // DEBUT formulaire d'Ajout
  const ViewModal = () => {
    return (
      <Box>
        {/* <Button variant="contained" onClick={handleOpen}>
          Ouvrir Modal
        </Button> */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              // height: 500,
              bgcolor: theme.palette.background.paper,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h5" component="h2">
              afficher un Utilisateur
            </Typography>
            <br>
            </br>
            <Typography variant="h5">{`Phone: ${selectedData?.phone}`}</Typography>
            <Typography variant="body1">
              {`Âge : ${selectedData?.age}`}
            </Typography>
            <Typography variant="body1">
              {`email : ${selectedData?.email}`}
            </Typography>
            <Typography variant="body1">
              {`name : ${selectedData?.name}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* <Button variant="contained" color="primary" fullWidth onClick={handleClose}> */}
              <Button variant="contained" color="error" onClick={handleCloseModal}>

                Annuler
              </Button>
              {/* <Button variant="contained" color="success">
                Valider
              </Button> */}
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  //Fin de formulaire d'Ajout



  // formulaire  de Modification
  const ModifiedeModal = () => {
    return (
      <Box>
        {/* <Button variant="contained" onClick={handleOpen}>
          Ouvrir Modal
        </Button> */}
        <Modal
          open={openModif}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: theme.palette.background.paper,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Modifier un Utilisateur
            </Typography>
            <TextField id="name" label="Name" variant="outlined" fullWidth margin="normal"
            // name="name" value={modifiedUser.name} onChange={handleInputChange}
            />

            {/* <TextField id="username" label="Role" variant="outlined" fullWidth margin="normal"
              name="username" value={modifiedUser.username} onChange={handleInputChange} /> */}

            <TextField id="email" label="Type" variant="outlined" fullWidth margin="normal"
            // name="email" value={modifiedUser.email} onChange={handleInputChange} 
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* <Button variant="contained" color="primary" fullWidth onClick={handleClose}> */}
              <Button variant="contained" color="error" onClick={handleClose}>

                Annuler
              </Button>
              <Button variant="contained" color="success">
                Valider
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  //End Formulaire de  Modification

  return (
    <Box m="20px">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpen}>
          Ajouter un Utilisateur
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckBox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* permettre la generation   du dataTable pour afficher les data  */}
        <DataGrid checkBoxSelection rows={data} columns={columns} />

      </Box>

      {/* <FormulaireModal openModal={openModal} closeModal={closeModal} /> */}
      <AddModal />
      <ModifiedeModal />
      <ViewModal />


    </Box>
  );
};

export default Team;
