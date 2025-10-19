import axios from "axios";

export async function createTask(data) {
  console.log(data);
  let resData = [];
  try {
    await axios
      .post("http://localhost:5170/api/Task/CreateTask", data)
      .then((response) => {
        console.log(response.data);

        if ("error" in response.data) {
          resData.error = response.data.error;
        } else resData = response.data;
        console.log(response.data);
      })
  } catch (error) {
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}

//EditTask
export async function editTask(data) {
  console.log(data);
  let resData = [];
  try {
    await axios
      .post("http://localhost:5170/api/Task/EditTask", data)
      .then((response) => {
        console.log(response.data);

        if ("error" in response.data) {
          resData.error = response.data.error;
        } else resData = response.data;
        console.log(response.data);
      })
  } catch (error) {
    console.log(error);
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}
//GetTasks
export async function getTasks() {
  let resData = [];
  try {
    await axios
      .get("http://localhost:5170/api/Task/GetAllTaskList", {})
      .then((response) => {
        if ("error" in response.data) {
          resData.error = response.data.error;
        } else resData = response.data;
        console.log(response.data);
      })
  } catch (error) {
    console.log(error.response.data.errors);
    resData.errors = error.response.data.errors;
  }
  return resData;
}
