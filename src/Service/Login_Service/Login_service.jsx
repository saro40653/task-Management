// src/Service/Login_Service/Login_service.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const loginService = async (email, password, navigate, setErrorMessage) => {
  let loginError = "";

  try {
    const resUserData = await axios.post(
      "http://localhost:5170/api/Employee/login",
      { email, password }
    );

    if ("data" in resUserData) {
      const decoded = jwtDecode(resUserData.data.token);
      console.log(decoded);
      console.log(resUserData.data);
      localStorage.setItem("Role", decoded.Role);
      localStorage.setItem("UserEmail", decoded.UserEmail);
      localStorage.setItem("UserName", decoded.UserName);
      localStorage.setItem("isManager", decoded.isManager);
      localStorage.setItem("EmpId", decoded.EmpId);
      localStorage.setItem("iat", decoded.iat);
      navigate("/home");
    } else {
      console.log(resUserData.data);
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      loginError =
        (error.response.data.errors["Email"]
          ? error.response.data.errors["Email"] + "\n"
          : "") +
        (error.response.data.errors["Password"]
          ? error.response.data.errors["Password"] + "\n"
          : "");
      setErrorMessage(loginError);
    } else {
      console.log(error);
    }
  }
};

export default loginService;
