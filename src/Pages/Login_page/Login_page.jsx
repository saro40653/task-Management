import React, { useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  Link,
  FormControlLabel,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import loginService from "../../Service/Login_Service/Login_service";

function Login() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    await loginService(email, password, navigate, setErrorMessage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              gutterBottom
            >
              {errorMessage}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
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
        </Dialog>
      </Paper>
    </Box>
  );
}

export default Login;
