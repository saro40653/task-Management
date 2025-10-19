// src/Service/Signup_Service/Signup_service.jsx

import axios from "axios";

const signupService = async (
  username,
  email,
  password,
  setErrorMessage,
  navigate
) => {
  try {
    const response = await axios.post("http://localhost:4000/signup", {
      username,
      email,
      password,
    });

    if (response.data === "exist") {
      setErrorMessage("User already exists");
    } else if (response.data === "notexist") {
      navigate("/");
    } else {
      setErrorMessage("Unexpected response from server");
    }
  } catch (error) {
    setErrorMessage("An error occurred. Please try again.");
    console.error(error);
  }
};

export default signupService;
