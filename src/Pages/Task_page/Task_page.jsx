import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../Service/Task_Service/Task_service";
import NewCreateTask from "./NewCreateTask";

function CustomToolbar() {
  return (
    <div className="flex justify-between p-2 shadow-md mb-3 rounded-md bg-white max-sm:flex-col max-sm:gap-2">
      <div className="sm:max-w-72">
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
              backgroundColor: "#eee",
              height: "30px",
            },
          }}
        />
      </div>
      <div>
        <NewCreateTask />
      </div>
    </div>
  );
}

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: "blue",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
            color: "black",
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeader": {
            color: "Black",
            backgroundColor: "#F4F6F5",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#F4F6F5",
          },
        },
      },
    },
  },
});

export default function Task() {
  const columns = [
    {
      field: "taskName",
      headerName: "Task Name",
      type: "text",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "assigneeName",
      headerName: "Assignee Name",
      type: "text",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "Date",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      renderCell: (task) => (
        <IconButton
          onClick={() => {
            handleEdit(task.id);
          }}
          style={
            task.row.status === "Initiated" ||
            task.row.status === "Completed with Expectations" ||
            task.row.status === "Completed without Expectations"
              ? { pointerEvents: "none" }
              : null
          }
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (id) => {
    localStorage.setItem("TaskID", id);
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

  useEffect(() => {
    pullData();
  }, []);

  const filteredData = listData.filter(
    (data) => data.assignerName === localStorage.getItem("UserName")
  );

  return (
    <div>
      <div className="flex flex-row w-full justify-start mb-1 pl-2 text-xl font-semibold items-center gap-2">
        <BiTask />
        Team Task
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
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            height: 500,
            padding: 1,
            border: "none",
            "& .MuiDataGrid-root": { backgroundColor: "#ffffff" },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
              backgroundColor: "white",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#3b3b41",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#3b3b41",
              color: "#fff",
              borderColor: "transparent",
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
