import React, { useContext, useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Autocomplete, Button, Grid } from "@mui/material";
import {
  getEmployee,
  createEmployee,
} from "../../Service/Employee_Service/Employee_service";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const CreateEmployee = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const [listData, setListData] = useState([]);
  const firstInputRef = useRef(null);  
  const [value, setValue] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
    createdDate: "2024-07-05T02:33:00.602Z",
    updatedDate: "2024-07-05T02:33:00.602Z",
    password: "",
    isManager: false,
    isDeleted: false,
  });

  const [employeeData, setEmployeeData] = useState([
    {
      field: "employeeID",
      headerName: "Employee ID",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "department",
      headerName: "Department",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      comptype: "dropdown",
      filter: "employeeDetail",
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "password",
      headerName: "Password",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "isManager",
      headerName: "Manager",
      type: "boolean",
      comptype: "dropdown",
      filter: "employeeDetail",
    },
  ]);

  async function pullData() {
    const data = getEmployee();
    data.then(function (resUserData) {
      if ("error" in resUserData) {
        console.log(resUserData);
      } else {
        console.log(resUserData);
        setListData(resUserData);
      }
    });
  }
  console.log(listData);

  useEffect(() => {
    pullData();
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (event, field, event1, field1) => {
    const data = event == undefined ? null : event;
    console.log(value);
    if (event1 == undefined) {
      setValue({ ...value, [field]: data });
    } else {
      setValue({ ...value, [field]: event, [field1]: event1 });
    }
  };
  console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = createEmployee(value);
    response.then(function (resUserData) {
      console.log(resUserData);
      if ("error" in resUserData) {
        console.log(resUserData.error);
        setErrorMessages([resUserData.error]);
      } else if ("errors" in resUserData) {
        console.log(resUserData);
        setErrorMessages(resUserData.errors);
      } else {
        console.log(resUserData);
        navigate("/employee");
      }
    });
  };
  console.log(errorMessages);

  const Role = [{ label: "Admin" }, { label: "User" }];
  const Manager = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <div>
      {errorMessages.length > 0 && (
        <Alert severity="error" variant="outlined">
          <ul>
            {errorMessages.map((err) => (
              <li style={{ whiteSpace: "pre-wrap" }}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Paper
        elevation={3}
        sx={{
          height: "50vh",
          width: "98%",
          display: "flex",
          margin: "1%",
        }}
      >
        <Box sx={{ flexGrow: 1, margin: "1%" }}>
          <Grid container spacing={1}>
            {employeeData.map((index, idx) => (
              <Grid container item spacing={1} xs key={index.field}>
                {index.comptype === "textfield" && (
                  <TextField
                    onChange={(event) =>
                      handleChange(event.target.value, index.field)
                    }
                    id="outlined-basic"
                    label={index.headerName}
                    variant="outlined"
                    sx={{
                      margin: "1%",
                      width: "480px",
                    }}
                    inputRef={idx === 0 ? firstInputRef : null}
                  />
                )}
                {index.comptype === "dropdown" && (
                  <Autocomplete
                    disableClearable
                    id="combo-box-demo"
                    options={
                      index.field === "role"
                        ? Role
                        : index.field === "isManager"
                        ? Manager
                        : []
                    }
                    onChange={(event, newValue) =>
                      handleChange(
                        index.field === "isManager"
                          ? newValue?.value
                          : newValue?.label,
                        index.field
                      )
                    }
                    sx={{ width: "480px" }}
                    renderInput={(params) => (
                      <TextField {...params} label={index.headerName} />
                    )}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ textAlign: "end", marginTop: "1%" }}>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ marginBottom: "1%" }}
          onClick={() => {
            navigate("/employee");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          color="success"
          sx={{ marginLeft: "1%", marginBottom: "1%", marginRight: "1%" }}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default CreateEmployee;
