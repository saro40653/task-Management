import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LuFileUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "../../Service/Employee_Service/Employee_service";
import NewEmployee from "./NewEmployee";

function CustomToolbar() {
  return (
    <div className=" flex max-sm:flex-col justify-between p-2 shadow-md mb-3 rounded-md bg-white">
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
      <NewEmployee />
    </div>
  );
}

export default function Employee() {
  const columns = [
    {
      field: "employeeID",
      headerName: "Employee Id",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "firstName",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (task) => (
        <IconButton
          onClick={() => {
            handleEdit(task.id);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const Navigate = useNavigate();

  const handleEdit = (id) => {
    localStorage.setItem("Id", id);
    Navigate("/edit-employee");
  };

  const [listData, setListData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  async function pullData(props) {
    const refreshKey = props;
    const taskdata = await getEmployee();
    setListData(
      taskdata.map((data) => ({
        ...data,
        createdDate: format(new Date(data.createdDate), "dd/MM/yyyy"),
      }))
    );
  }

  useEffect(() => {
    pullData();
  }, [refreshKey]);

  return (
    <div>
      <div className="flex flex-row w-full justify-start mb-1 pl-2 text-xl font-semibold items-center gap-2">
        <LuFileUser />
        Employee List
      </div>
      <div className="overflow-x-auto">
        <DataGrid
          rows={listData}
          columns={columns}
          rowSelection={false}
          disableColumnMenu
          disableSelectionOnClick
          disableColumnSelector
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
