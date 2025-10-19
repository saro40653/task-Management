import { styled } from "@mui/material/styles";
import * as React from "react";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../Service/Employee_Service/Employee_service";

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

function NewEmployee() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const [listData, setListData] = useState([]);
  const firstInputRef = useRef(null);

 const [refreshKey, setRefreshKey] = useState(0);

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
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
        setRefreshKey((prev) => prev + 1);
        toggleDrawer(false);
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
      <Button
        className="w-32 gap-2 leading-0 max-sm:w-full"
        variant="contained"
        size="small"
        color="success"
        onClick={toggleDrawer(true)}
      >
        <LuUserPlus className="mb-[3px]" /> Create
      </Button>
      <div>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 400,
              boxSizing: "border-box",
            },
          }}
        >
          <div className="flex flex-col gap-2 items-center justify-between max-h-screen min-h-screen w-full">
            <div className="w-full py-4 border-b flex items-center justify-center bg-[#3b3b41] text-white">
              <h4 className="w-full text-center font-bold">Create Employee</h4>
            </div>
            <div className="px-2 flex flex-col w-full items-center h-full gap-2 overflow-y-auto">
              <label className=" text-start font-semibold w-full">
                Employee ID
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "employeeID")
                }
                placeholder="Employee ID"
                fullWidth
                size="small"
                inputRef={firstInputRef}
              />

              <label className=" text-start font-semibold w-full">
                First Name
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "firstName")
                }
                placeholder="First Name"
                fullWidth
                size="small"
                inputRef={firstInputRef}
              />

              <label className=" text-start font-semibold w-full">
                Last Name
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "lastName")
                }
                placeholder="Last Name"
                fullWidth
                size="small"
                inputRef={firstInputRef}
              />

              <label className=" text-start font-semibold w-full">
                Department
              </label>
              <TextField
                onChange={(event) =>
                  handleChange(event.target.value, "department")
                }
                placeholder="Department"
                fullWidth
                size="small"
                inputRef={firstInputRef}
              />
              <label className=" text-start font-semibold w-full">Role</label>
              <Autocomplete
                fullWidth
                size="small"
                disableClearable
                id="combo-box-demo"
                options={Role}
                onChange={(event, newValue) =>
                  handleChange(newValue?.label, "role")
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder={"Role"} />
                )}
              />
              <label className=" text-start font-semibold w-full">Email</label>
              <TextField
                placeholder="Email"
                fullWidth
                size="small"
                onChange={(event) => handleChange(event.target.value, "email")}
                inputRef={firstInputRef}
              />
              <label className=" text-start font-semibold w-full">
                Password
              </label>
              <TextField
                placeholder="Password"
                fullWidth
                size="small"
                onChange={(event) =>
                  handleChange(event.target.value, "password")
                }
                inputRef={firstInputRef}
              />
              <label className=" text-start font-semibold w-full">
                Manager
              </label>
              <Autocomplete
                fullWidth
                size="small"
                disableClearable
                id="combo-box-demo"
                options={Manager}
                onChange={(event, newValue) =>
                  handleChange(newValue?.value, "isManager")
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder={"Manager"} />
                )}
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
                submit
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
export default NewEmployee;
