import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Autocomplete, Button, Grid } from "@mui/material";
import { getEmployee } from "../../Service/Employee_Service/Employee_service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTask } from "../../Service/Task_Service/Task_service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const CreateTask = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const [listData, setListData] = useState([]);
  const [employeeData, setEmployeeData] = useState([
    {
      field: "taskName",
      headerName: "Task Name",
      type: "text",
      comptype: "textfield",
      filter: "personalDetail",
    },
    {
      field: "assigneeName",
      headerName: "Assignee Name",
      type: "text",
      comptype: "EmpName",
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      comptype: "textfield",
      filter: "employeeDetail",
    },
    {
      field: "category",
      headerName: "Category",
      type: "text",
      comptype: "dropdown",
      filter: "contact",
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "text",
      comptype: "dropdown",
      filter: "employeeDetail",
    },
  ]);

  const [taskvalue, setTaskValue] = useState({
    taskName: "",
    description: "",
    assignerID: localStorage.getItem("EmpId"),
    assignerName: localStorage.getItem("UserName"),
    assigneeID: "",
    assigneeName: "",
    assignedDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    category: "",
    priority: "",
    status: "Assigned",
    comments: "No Comments",
    createdDate: "2024-07-01T04:48:28.134Z",
    updatedDate: "2024-07-01T04:48:28.134Z",
    completedDate: "2024-07-01T04:48:28.134Z",
    isDeleted: false,
    closureComments:""
  });

  useEffect(() => {
    const pullData = async () => {
      try {
        const data = await getEmployee();
        setListData(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    pullData();
  }, []);

  const handleChange = (event, field, event1, field1) => {
    if (event1 === undefined) {
      setTaskValue({ ...taskvalue, [field]: event });
    } else {
      setTaskValue({ ...taskvalue, [field]: event, [field1]: event1 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // taskvalue.status= "Assigned";
      console.log('Task value before sending:', taskvalue);

      const response = await createTask(taskvalue);
      console.log('Task creation response:', response);

      if ("error" in response) {
        setErrorMessages([response.error]);
      } else if ("errors" in response) {
        setErrorMessages(response.errors);
      } else {
        navigate("/task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessages(["Failed to create task. Please try again."]);
    }
  };

  const handledate = (event, field) => {
    const date = new Date(event);
    date.setDate(date.getDate() + 1);
    handleChange(date.toISOString(), field);
  };

  const Priority = [{ label: "Low" }, { label: "Medium" }, { label: "High" }];

  const Category = [
    { label: "Planning" },
    { label: "Operations" },
    { label: "Sales" },
  ];

  return (
    <div>
      {errorMessages.length > 0 && (
        <Alert severity="error" variant="outlined">
          <ul>
            {errorMessages.map((err, index) => (
              <li key={index} style={{ whiteSpace: "pre-wrap" }}>
                {err}
              </li>
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
            {employeeData.map((index) => (
              <Grid item xs key={index.field}>
                {index.type === "date" && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(event) => handledate(event, index.field)}
                      sx={{
                        margin: "1%",
                        width: "480px",
                      }}
                      label={index.headerName}
                    />
                  </LocalizationProvider>
                )}
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
                  />
                )}
            {index.comptype === "EmpName" && (
                    <Autocomplete
                      id="combo-box-demo"
                      autoHighlight
                      options={listData.filter(option => option.employeeID !== localStorage.getItem("EmpId"))}
                      getOptionLabel={(option) =>
                        option === null ? "" : option.firstName
                      }
                      sx={{ width: "480px", margin: "1%" }}
                      onChange={(event, option) => {
                        if (option === null && localStorage.getItem("EmpId") === index.assigneeID) {
                          handleChange("", "assigneeName", "", "assigneeID");
                        } else {
                          handleChange(
                            option.firstName,
                            "assigneeName",
                            option.employeeID,
                            "assigneeID"
                          );
                        }
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option === null ? "" : option.firstName}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label={index.headerName} />
                      )}
                    />
                  )}
                {index.comptype === "dropdown" && index.filter !== "name" && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={
                      index.field === "priority"
                        ? Priority
                        : index.field === "category"
                        ? Category
                        : []
                    }
                    onChange={(event, newTaskValue) =>
                      handleChange(newTaskValue?.label, index.field)
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
          href="/home"
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

export default CreateTask;
