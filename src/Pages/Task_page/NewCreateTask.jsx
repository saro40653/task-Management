import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { LuFilePlus2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "../../Service/Employee_Service/Employee_service";
import { createTask } from "../../Service/Task_Service/Task_service";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function NewCreateTask() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const [listData, setListData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [refreshKey, setRefreshKey] = useState(0);

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
    closureComments: "",
  });

  const priorityOptions = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];
  const categoryOptions = [
    { label: "Planning" },
    { label: "Operation" },
    { label: "Sales" },
  ];

  const handleChange = (event, field, event1, field1) => {
    const data = event === undefined ? null : event;
    console.log(taskvalue);
    if (event1 === undefined) {
      setTaskValue({ ...taskvalue, [field]: data });
    } else {
      setTaskValue({ ...taskvalue, [field]: event, [field1]: event1 });
    }
  };
  console.log(taskvalue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Task value before sending:", taskvalue);

      const response = await createTask(taskvalue);
      console.log("Task creation response:", response);

      if ("error" in response) {
        setErrorMessages([response.error]);
      } else if ("errors" in response) {
        setErrorMessages(response.errors);
      } else {
        setRefreshKey((prev) => prev + 1);
        toggleDrawer(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessages(["Failed to create task. Please try again."]);
    }
  };

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
  }, [refreshKey]);

  return (
    <div>
      <Button
        className="w-32 gap-2 leading-0 max-sm:w-full"
        variant="contained"
        size="small"
        color="success"
        onClick={toggleDrawer(true)}
      >
        <LuFilePlus2 className="mb-[3px]" /> Create
      </Button>
      <div>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 400,
              boxSizing: "border-box",
            },
          }}
        >
          <div className="flex flex-col gap-2 items-center justify-between max-h-screen min-h-screen w-full">
            <div className="w-full py-4 border-b flex items-center justify-center bg-[#3b3b41] text-white">
              <h4 className="w-full text-center font-bold">Create Task</h4>
            </div>
            <div className="px-2 flex flex-col w-full items-center justify-evenly gap-2 h-full overflow-y-auto">
              <label className="text-start font-semibold w-full">
                Task Name
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "taskName")
                }
                id="Task Name"
                placeholder="Task Name"
                fullWidth
                size="small"
              />
              <label className=" text-start font-semibold w-full">
                Assignee Name
              </label>
              <Autocomplete
                id="combo-box-demo"
                autoHighlight
                fullWidth
                options={listData.filter(
                  (option) =>
                    option.employeeID !== localStorage.getItem("EmpId")
                )}
                getOptionLabel={(option) =>
                  option === null ? "" : option.firstName
                }
                size="small"
                onChange={(event, option) => {
                  if (option === null && localStorage.getItem("EmpId")) {
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
                  <TextField {...params} placeholder="Assignee Name" />
                )}
              />
              <label className=" text-start font-semibold w-full">
                Category
              </label>
              <Autocomplete
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.label}
                onChange={(event, option) =>
                  handleChange(option ? option.label : "", "category")
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Category" size="small" />
                )}
              />

              <label className=" text-start font-semibold w-full">
                Priority
              </label>
              <Autocomplete
                fullWidth
                options={priorityOptions}
                getOptionLabel={(option) => option.label}
                onChange={(event, option) =>
                  handleChange(option ? option.label : "", "priority")
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Priority" size="small" />
                )}
              />

              <label className=" text-start font-semibold w-full">
                Description
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "description")
                }
                placeholder="Description"
                fullWidth
                size="small"
                multiline
                rows={4}
                helperText="Only accept maximum 120 character"
                inputProps={{ maxlength: 200 }}
              />
            </div>
            <div className="flex item-center justify-between w-full py-4 px-2 border-t">
              <button
                className="bg-[#d32f2f] text-white inline-flex px-3 py-2 w-fit rounded-md"
                onClick={toggleDrawer(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#2e7d32] text-white inline-flex px-3 py-2 w-fit rounded-md"
                onClick={handleSubmit}
              >
                Sumbit
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
export default NewCreateTask;
