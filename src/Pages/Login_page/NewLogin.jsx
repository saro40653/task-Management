import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  Link,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BiLogoDigitalocean } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import loginService from "../../Service/Login_Service/Login_service";
import { useState } from "react";
 
function NewLogin() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const [showPassword, setShowPassword] = useState(false);
 
  const handleClickShowPassword = () => {
    console.log(showPassword)
    setShowPassword(!showPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
 
    await loginService(email, password, navigate, setErrorMessage);
  };
 
  return (
    <div className="flex flex-col md:flex-row justify-items-center justify-center h-svh w-screen bg-gray-100 p-4 sm:p-10">
      <div className="flex flex-col md:flex-row  max-sm:h-full w-full border shadow-md bg-white rounded-md">
        {/* Left section */}
        <div className="flex max-sm:h-full w-full md:w-1/2 flex-col bg-white relative">
          <div className="flex flex-col justify-center w-full  lg:p-20 max-sm:p-4 md:p-8 h-full ">
            <div className="font-semibold text-2xl text-[#3b3b41] flex items-center w-full gap-2 py-3">
              <BiLogoDigitalocean /> Task Flow
            </div>
            <p className="mb-4"> Please enter your login details below </p>
 
            {/* Email */}
            <Box>
              <p>Email</p>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                id="email"
                placeholder="Enter your email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
 
            {/* Password */}
            <Box sx={{ mb: 2 }}>
              <p className=" pb-2 pt-2">Password</p>
              <FormControl fullWidth>
                <OutlinedInput
                  size="small"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </FormControl>
            </Box>
 
            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-4">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <Link sx={{ textDecoration: "none" }} href="#" variant="body2" onClick={handleClickOpen}>
                Forgot password?
              </Link>
            </div>
 
            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, backgroundColor: "#00171d" }}
              className="py-2 sm:py-3"
              onClick={handleLogin}
            >
              Log in
            </Button>
 
            {/* Sign Up */}
            <div className="flex jusify-center items-center gap-1">
              <div>
                <p>Don't have an account?</p>
              </div>
              <div>
                <Link sx={{ textDecoration: "none" }} href="#" variant="body2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
 
        {/* Right section */}
        <div className="bg-[rgb(0,23,29)] text-white w-full  md:flex md:w-1/2 hidden ">
          <div className="pt-40 pl-10">
            <Typography variant="h5" component="h1">
              Task Management
            </Typography>
            <p className="pt-3 max-w-prose">
              Join our platform to streamline your task processes, reduce
              costs, and enhance productivity.
            </p>
          </div>
        </div>
      </div>
      { open &&
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
            {"Forgot Password"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              To change your password, email your username from your registered
              email address to the Code Value support team. Our admin will
              verify and reset your password.
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ marginTop: "20px" }}
            >
              Support ID: support@codevalue.in
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>}
    </div>
  );
}
 
export default NewLogin;
 
 