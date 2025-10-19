import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, Chip, Menu, MenuItem, Stack } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PolicyIcon from "@mui/icons-material/Policy";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { BiLogoDigitalocean } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import "./responsiveBar.css";
import { FaReact } from "react-icons/fa6";
import FaceIcon from '@mui/icons-material/Face';

const drawerWidth = 200;

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<FaceIcon />}
                label={localStorage.getItem("UserName")}
              />
            </Stack>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <FaUser className="text-lg" />
          </ListItemIcon>
          <ListItemText>{localStorage.getItem("UserName")}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MdEmail className="text-lg" />
          </ListItemIcon>
          <ListItemText>{localStorage.getItem("UserEmail")}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FaPowerOff className="text-lg" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const ResponsiveBar = ({ children, window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [taskopen, setTaskOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const values = localStorage.getItem("Role");
  const admin = values === "Admin";

  const pages = [
    { name: "Home", path: "/home", icon: HomeIcon },
    { name: "Test", path: "/test", icon: HomeIcon },
  ];
  const tasks = [
    { name: "My Task", path: "/my-task", icon: TaskIcon },
    ...(localStorage.getItem("isManager") === "True" || admin
      ? [
          { name: "Team Task", path: "/task", icon: GroupOutlinedIcon },
          {
            name: "Create Task",
            path: "/create-task",
            icon: ContentPasteGoIcon,
          },
        ]
      : []),
  ];
  const employees = [
    { name: "Employee List", path: "/employee", icon: GroupsIcon },
    ...(admin
      ? [
          {
            name: "Create Employee",
            path: "/create-employee",
            icon: AssignmentIndIcon,
          },
        ]
      : []),
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handletaskClick = () => {
    setTaskOpen(!taskopen);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "#3b3b41",
        color: "white",
        height: "100%",
        marginTop: "64px",
      }}
    >
      <Divider sx={{ marginTop: "-3%" }} />
      <List>
        {pages.map((page, index) => (
          <ListItemButton
            key={`page-${index}`}
            component={NavLink}
            to={page.path}
            sx={{ marginTop: "5%" }}
            selected={selectedIndex === index}
            className={selectedIndex === index ? "active" : "barListItemButton"}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon className="listIcon">
              <page.icon />
            </ListItemIcon>
            <ListItemText>{page.name}</ListItemText>
          </ListItemButton>
        ))}
        <ListItemButton className="barListItemButton" onClick={handletaskClick}>
          <ListItemIcon className="listIcon">
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText>Task</ListItemText>
          {taskopen ? <ArrowRightSharpIcon /> : <ArrowDropUpSharpIcon />}
        </ListItemButton>
        <Collapse in={!taskopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tasks.map((task, index) => (
              <ListItemButton
                key={`task-${index}`}
                className={
                  selectedIndex === pages.length + index
                    ? "active"
                    : "barListItemButton"
                }
                selected={selectedIndex === pages.length + index}
                onClick={(event) => {
                  handleListItemClick(event, pages.length + index);
                  navigate(task.path);
                }}
              >
                <ListItemIcon className="listIcon">
                  <task.icon />
                </ListItemIcon>
                <ListItemText>{task.name}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton className="barListItemButton" onClick={handleClick}>
          <ListItemIcon className="listIcon">
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Employee</ListItemText>
          {open ? <ArrowRightSharpIcon /> : <ArrowDropUpSharpIcon />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {employees.map((employee, index) => (
              <ListItemButton
                key={`employee-${index}`}
                className={
                  selectedIndex === pages.length + tasks.length + index
                    ? "active"
                    : "barListItemButton"
                }
                selected={selectedIndex === pages.length + tasks.length + index}
                onClick={(event) => {
                  handleListItemClick(
                    event,
                    pages.length + tasks.length + index
                  );
                  navigate(employee.path);
                }}
              >
                <ListItemIcon className="listIcon">
                  <employee.icon />
                </ListItemIcon>
                <ListItemText>{employee.name}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className="w-full flex items-center justify-between fixed top-0 bg-white/60 z-50 backdrop-blur-md">
        <nav className="h-16 w-full flex items-center justify-between px-2">
          <div>
            <button
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="md:hidden"
            >
              <MenuIcon />
            </button>
            <div className="font-semibold text-2xl flex items-center gap-2 max-sm:hidden">
              <BiLogoDigitalocean className="text-inherit text-[#3b3b41]" />{" "}
              Smart Task
            </div>
          </div>
          <AccountMenu />
        </nav>
      </div>

      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        className="md:hidden block"
      >
        {drawer}
      </Drawer>

      <div className="max-md:hidden block fixed left-0">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </div>

      <main className="min-h-[calc(100svh-64px)] w-full p-2 mt-16 md:w-[calc(100%-200px)] md:ml-[200px] flex flex-col bg-gray-100">
        {children}
      </main>
    </>
  );
};

export default ResponsiveBar;
