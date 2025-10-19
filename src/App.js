import React, { useState, createContext, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login_page/Login_page";
import Home from "./Pages/Home_page/Home_page";
import Signup from "./Pages/Signup_page/Signup_page";
import ResponsiveBar from "./Components/ResponsiveBar";
import Employee from "./Pages/Employee-page/Employee_page";
import CreateEmployee from "./Pages/Employee-page/Create_employee";
import CreateTask from "./Pages/Task_page/Create_task";
import MyTask from "./Pages/Task_page/My_Task";
import EditTask from "./Pages/Task_page/Edit_task";
import EditEmployee from "./Pages/Employee-page/Edit_employee";
import Task from "./Pages/Task_page/Task_page";
import Test from "./Pages/Test";
import NewLogin from "./Pages/Login_page/NewLogin";
import NewEmployee from "./Pages/Employee-page/NewEmployee";
import NewCreateTask from "./Pages/Task_page/NewCreateTask";
// Create Context
export const AppContext = createContext();

function App() {
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
    isDeleted: true,
  });
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

  const contextValue = useMemo(
    () => ({ value, setValue, taskvalue, setTaskValue }),
    [value, taskvalue]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={< NewLogin/>} />
        <Route path="/signup" element={< Login />} />
        <Route
          path="/home"
          element={
            <ResponsiveBar>
              <Home />
            </ResponsiveBar>
          }
        />
        <Route
          path="/employee"
          element={
            <ResponsiveBar>
              <Employee />
            </ResponsiveBar>
          }
        />
        <Route
          path="/create-task"
          element={
            <ResponsiveBar>
              <CreateTask />
            </ResponsiveBar>
          }
        />
        <Route
          path="/create-employee"
          element={
            <ResponsiveBar>
              <CreateEmployee />
            </ResponsiveBar>
          }
        />
        <Route
          path="/my-task"
          element={
            <ResponsiveBar>
              <MyTask />
            </ResponsiveBar>
          }
        />
        <Route
          path="/edit-task"
          element={
            <ResponsiveBar>
              <EditTask />
            </ResponsiveBar>
          }
        />
        <Route
          path="/edit-employee"
          element={
            <ResponsiveBar>
              <EditEmployee />
            </ResponsiveBar>
          }
        />
        <Route
          path="/task"
          element={
            <ResponsiveBar>
              <Task />
            </ResponsiveBar>
          }
        />
        <Route
          path="/test"
          element={
            <ResponsiveBar>
              <Test />
            </ResponsiveBar>
          }
        />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
