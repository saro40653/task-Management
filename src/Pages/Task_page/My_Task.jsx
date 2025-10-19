import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { IconButton, colors } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme } from "@mui/material/styles";
import { minWidth, ThemeProvider } from "@mui/system";
import { getTasks } from "../../Service/Task_Service/Task_service";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaFile } from "react-icons/fa6";
import { MdOutlineTask } from "react-icons/md";

function CustomToolbar() {
  return (
      <div className="flex max-sm:flex-col justify-between p-2 shadow-md mb-3 rounded-md bg-white">
        <div className=" sm:max-w-72">
      <GridToolbarQuickFilter
        variant="outlined"
        fullWidth
        sx={{
          width: "100%",
        }}
        InputProps={{
          sx: {
            width: { xs: "100%", md: 240 },
            borderRadius: "12px",
            height: "30px",
            backgroundColor: "#eee",
          },
        }}
      />
    </div>
      </div>
  );
}

export default function MyTask() {
  const columns = [
    {
      field: "taskName",
      headerName: "Task Name",
      type: "text",
      filter: "personalDetail",
      srchOperatorId: 6,
      srchDataType: "string",
      minWidth:200,
      flex:1,
        },
    {
      field: "assignerName",
      headerName: "Assigner Name",
      type: "text",
      filter: "personalDetail",
      srchOperatorId: 6,
      srchDataType: "string",
      minWidth:150,
      flex:1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      filter: "contact",
      flex:1,
      minWidth:100
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "text",
      filter: "employeeDetail",
      minWidth:100,
      flex:1
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "Date",
      filter: "employeeDetail",
      sortable: false,
      minWidth:100,
      flex:1
    },
    {
      field: "action",
      headerName: "Action",
      minWidth:100,
      flex:1,
      renderCell: (task) => (
        <IconButton
          onClick={() => {
            console.log(task);
            handleEdit(task.id);
          }}
          style={
            task.row.status == "Estimated" ||
            task.row.status == "Completed" ||
            task.row.status == "Completed with Expectations" ||
            task.row.status == "Completed without Expectations"
              ? { marginTop: 10, pointerEvents: "none" }
              : { marginTop: 10 }
          }
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (id) => {
    localStorage.setItem("TaskID", id);
    console.log(id);
    Navigate("/edit-task");
  };

  const Navigate = useNavigate();

  const [listData, setListData] = useState([]);

  async function pullData() {
    const taskdata = await getTasks();
    setListData(
      taskdata.map((data) => ({
        ...data,
        dueDate: format(new Date(data.dueDate), "dd/MM/yyyy"),
      }))
    );
  }
  console.log(listData);
  useEffect(() => {
    pullData();
  }, []);

  const filteredData = listData.filter(
    (data) => data.assigneeName == localStorage.getItem("UserName")
  );
  return (
    <div>      
      <div className="flex flex-row w-full justify-start mb-1 pl-2 text-xl font-semibold items-center gap-2">
      <MdOutlineTask />My Task
      </div>
      <div className="overflow-x-auto">
          <DataGrid
            rows={filteredData}
            getRowId={(row) => row.taskID}
            columns={columns}
            autoHeight
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            disableRowSelectionOnClick
              sx={{
              height: 500,
              padding: 1,
              border: "none",
              "& .MuiDataGrid-root": {
                backgroundColor: "#ffffff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f1f5f9",
                backgroundColor:"white" 
              },
              "& .MuiDataGrid-columnHeader": {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#3b3b41',
              },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: '#3b3b41',
            color:"#fff",
            borderColor:"transparent",
          },
          "& .MuiTablePagination-toolbar": {
            color: "white",
          },
          "& .MuiSelect-icon": {
            fill: "white",
          },
            }}
          />
          </div>
      </div>
      
    
  );
}
