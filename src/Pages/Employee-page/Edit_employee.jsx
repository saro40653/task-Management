import {
  Alert,
  Autocomplete,
  Button,
  Grid
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import {
  editEmployee,
  getEmployee,
} from "../../Service/Employee_Service/Employee_service";

const EditEmployee = () => {
  const [open, setOpen] = React.useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
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
      field: "isManager",
      headerName: "Manager",
      type: "boolean",
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
  ]);
  const { value, setValue } = useContext(AppContext);

  const addValue = (key, newValue) => {
    setValue((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };

  useEffect(() => {
    EmpDetails();
    addValue("id", localStorage.getItem("Id"));
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

  const Id = localStorage.getItem("Id");
  console.log("ID", Id);
  async function EmpDetails() {
    const employee = getEmployee(Id);
    employee.then(function (resUserData) {
      if ("error" in resUserData) {
        console.log(resUserData);
      } else {
        console.log(resUserData);
        const EmpValue = resUserData.filter((data) => data.id == Id);
        console.log(EmpValue[0]);
        setValue(EmpValue[0]);
      }
    });
  }
  console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = editEmployee(value);
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
            {employeeData.map((index) => {
              const detail = _.property(index.field)(value);
              return (
                <Grid item xs key={index}>
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
                      value={detail}
                    />
                  )}
                  {index.comptype == "dropdown" && (
                    <Autocomplete
                      disableClearable
                      id="combo-box-demo"
                      options={
                        index.field === "role"
                          ? Role
                          : index.field === "isManager"
                          ? Manager
                          : ""
                      }
                      value={detail}
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
              );
            })}
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
          Update
        </Button>
      </Box>
    </div>
  );
};

export default EditEmployee;
