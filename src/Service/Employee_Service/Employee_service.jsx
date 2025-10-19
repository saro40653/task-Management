import axios from "axios";

//GetEmployee
export async function getEmployee() {
  let resData = [];
  try {
    await axios
      .get("http://localhost:5170/api/Employee/GetAllEmployeeList", {})
      .then((response) => {
        console.log(response.data);

        if ("error" in response.data) {
          resData.error = response.data.error;
        } else resData = response.data;
        console.log(response.data);
      });
  } catch (error) {
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}
//EditEmployee
export async function editEmployee(data) {
  let resData = [];
  try {
    await axios

      .post("http://localhost:5170/api/Employee/EditEmployee", data)
      .then((response) => {
        console.log(response.data);
        if ("error" in response.data) {
          resData.error = response.data.error;
          console.log(data);
        } else resData = response.data;
        console.log(response.data);
      });
  } catch (error) {
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}
//CreateEmployee
export async function createEmployee(data) {
  let resData = [];
  try {
    await axios
      .post("http://localhost:5170/api/Employee/CreateEmployee", data)
      .then((response) => {
        console.log(response.data);
        if ("error" in response.data) {
          resData.error = response.data.error;
        } else resData = response.data;
        console.log(response.data);
      });
  } catch (error) {
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}
