import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getEmployee } from "../../Service/Employee_Service/Employee_service";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../Service/Task_Service/Task_service";
import _ from "lodash";
import dayjs from "dayjs";
import { editTask } from "../../Service/Task_Service/Task_service";
import { AppContext } from "../../App";

const EditTask = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [closureCommentError, setClosureCommentError] = useState("");
  const [listData, setListData] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
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
      field: "dueDate",
      headerName: "Due Date",
      type: "date",
      comptype: "datepicker",
      filter: "personalDetail",
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
    {
      field: "comments",
      headerName: "Comments",
      type: "text",
      filter: "employeeDetail",
    },
    {
      field: "closureComments",
      headerName: "Closure Comments",
      type: "text",
      filter: "employeeDetail",
    },
  ]);
  const { taskvalue, setTaskValue } = useContext(AppContext);

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

  const Manager = localStorage.getItem("isManager");
  const EmpId = localStorage.getItem("EmpId");
  console.log(listData);
  const Comment =
    taskvalue.status === "Initiated" || taskvalue.status === "Completed";
  const AssignedUser = taskvalue.assigneeID === EmpId;
  const ValidatedUser =
    Manager === "True" &&
    taskvalue.status === "Estimated" &&
    taskvalue.assigneeID !== EmpId;
  const CompletedUser = AssignedUser && taskvalue.status === "Initiated";
  const CompletedManager =
    Manager === "True" &&
    taskvalue.status === "Completed" &&
    taskvalue.assignerID == EmpId;

  useEffect(() => {
    pullData();
    addValue("taskID", localStorage.getItem("taskId"));
    taskDetails();
  }, []);

  const taskId = localStorage.getItem("TaskID");
  console.log("TASK", taskId);
  async function taskDetails() {
    const task = getTasks(taskId);
    task.then(function (resUserData) {
      if ("error" in resUserData) {
        console.log(resUserData);
      } else {
        console.log(resUserData);
        const taskvalue1 = resUserData.filter((data) => data.taskID === taskId);
        console.log(taskvalue1[0]);
        setTaskValue(taskvalue1[0]);
      }
    });
  }
  const handleChange = (event, field, event1, field1) => {
    console.log(event1 + " " + field1);
    if (event1 === undefined) {
      setTaskValue({ ...taskvalue, [field]: event });
    } else {
      setTaskValue({ ...taskvalue, [field]: event, [field1]: event1 });
    }
  };

  const handleSubmit = async (params) => {
    if (
      params === "Completed without Expectations" &&
      !taskvalue.closureComments
    ) {
      setClosureCommentError("Closure Comments are required.");
      return;
    }
    console.log(taskvalue.completedDate);
    if (AssignedUser && taskvalue.status === "Assigned") {
      taskvalue.status = "Estimated";
    } else if (ValidatedUser) {
      taskvalue.status = "Initiated";
    } else if (CompletedUser) {
      taskvalue.status = "Completed";
      taskvalue.completedDate = new Date().toISOString();
    } else {
      taskvalue.status = params; 
      console.log(params);
    }
    console.log(taskvalue);
    const response = editTask(taskvalue);
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
        localStorage.getItem("EmpId") == taskvalue.assigneeID ? navigate("/my-task") : navigate("/task")
      }
    });
  };

  const addValue = (key, newValue) => {
    setTaskValue((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };

  const handledate = (event, field) => {
    const date = new Date(event);
    date.setDate(date.getDate() + 1);
    console.log(date.toISOString());
    handleChange(date.toISOString(), field);
  };

  const Priority = [{ label: "Low" }, { label: "Medium" }, { label: "High" }];
  const Status = [
    { label: "Assigned" },
    { label: "Estimated" },
    { label: "Validated" },
    { label: "Initiated" },
    { label: "Completed" },
  ];
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
            {errorMessages.map((err) => (
              <li style={{ whiteSpace: "pre-wrap" }}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      {closureCommentError && (
        <Alert severity="error" variant="outlined">
          <Typography>{closureCommentError}</Typography>
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
              const detail = _.property(index.field)(taskvalue);
              return (
                <Grid item xs key={index.field}>
                  {index.type === "date" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          onChange={(event) => handledate(event, index.field)}
                          sx={{
                            margin: "1%",
                            width: "480px",
                          }}
                          readOnly={
                            taskvalue.status == "Initiated" ||
                            taskvalue.status == "Completed"
                          }
                          value={dayjs(detail)}
                          label={index.headerName}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                  {index.comptype === "textfield" && (
                    <TextField
                      inputProps={{
                        readOnly:
                          AssignedUser || ValidatedUser || CompletedManager,
                      }}
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
                  {index.field === "comments" && Comment && (
                    <TextField
                      inputProps={{
                        readOnly:
                          Manager === "True" && taskvalue.assigneeID !== EmpId,
                      }}
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
                  {index.field === "closureComments" &&
                    taskvalue.status == "Completed" && (
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
                  {index.comptype === "EmpName" && (
                    <Autocomplete
                      id="combo-box-demo"
                      disableClearable
                      autoHighlight
                      options={listData}
                      getOptionLabel={(options) =>
                        options == detail ? detail : options.firstName
                      }
                      sx={
                        AssignedUser || ValidatedUser || CompletedManager
                          ? {
                              width: "480px",
                              margin: "1%",
                              pointerEvents: "none",
                            }
                          : { width: "480px", margin: "1%" }
                      }
                      value={detail}
                      onChange={(event, options) => {
                        options == null
                          ? handleChange("", "assigneeName", "", "assigneeID")
                          : handleChange(
                              options.firstName,
                              "assigneeName",
                              options.employeeID,
                              "assigneeID"
                            );
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option == null ? "" : option.firstName}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          inputProps={{
                            ...params.inputProps,
                          }}
                          {...params}
                          label={index.headerName}
                        />
                      )}
                    />
                  )}
                  {index.comptype === "dropdown" && index.filter !== "name" && (
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      disableClearable
                      options={
                        index.field === "priority"
                          ? Priority
                          : index.field === "category"
                          ? Category
                          : ""
                      }
                      onChange={(event, newvalue) =>
                        handleChange(newvalue?.label, index.field)
                      }
                      sx={
                        AssignedUser || ValidatedUser || CompletedManager
                          ? {
                              width: "480px",
                              margin: "1%",
                              pointerEvents: "none",
                            }
                          : { width: "480px", margin: "1%" }
                      }
                      renderInput={(params) => (
                        <TextField {...params} label={index.headerName} />
                      )}
                      value={detail}
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
          href="/home"
        >
          Cancel
        </Button>
        {CompletedManager ? (
          <>
            <Button
              onClick={() => {
                handleSubmit("Completed with Expectations");
              }}
              variant="contained"
              size="small"
              color="success"
              sx={{ marginLeft: "1%", marginBottom: "1%", marginRight: "1%" }}
            >
              Completed with Expectations
            </Button>
            <Button
              onClick={() => {
                handleSubmit("Completed without Expectations");
              }}
              variant="contained"
              size="small"
              color="success"
              sx={{ marginLeft: "1%", marginBottom: "1%", marginRight: "1%" }}
            >
              Completed without Expectations
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleSubmit(taskvalue.status)}
            variant="contained"
            size="small"
            color="success"
            sx={{ marginLeft: "1%", marginBottom: "1%", marginRight: "1%" }}
          >
            {taskvalue.status == "Assigned" && taskvalue.assignerID == EmpId
              ? "Assign"
              : taskvalue.status == "Assigned"
              ? "Estimate"
              : taskvalue.status == "Estimated"
              ? "Initiate"
              : taskvalue.status == "Initiated"
              ? "Complete"
              : taskvalue.status}
          </Button>
        )}
      </Box>
    </div>
  );
};

export default EditTask;
