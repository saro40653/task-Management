import {
  Box,
  Card,
  CardContent,
  Grid,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import AddTaskIcon from '@mui/icons-material/AddTask';
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import { BarChart, Gauge, LineChart } from "@mui/x-charts";
import { round } from "lodash";
import { getTasks } from "../../Service/Task_Service/Task_service";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdAddTask } from "react-icons/md";

const Home = () => {
  const [highPriority, setHighPriority] = useState(0);
  const [pending, setPending] = useState(0);
  const [upcoming, setUpcoming] = useState(0);
  const [overDue, setOverDue] = useState(0);
  const [taskNum, setTaskNum] = useState(0);
  const [gauge, setGauge] = useState(0);
  const [days, setDays] = useState([]);
  const [comptask, setCompTask] = useState();
  const [totTask, setTotTask] = useState();
  const [cmpDays, setCmpDays] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const currentDate = new Date();
  const statuses = [
    "Assigned",
    "Estimated",
    "Initiated",
    "Completed",
    "Completed with Expectations",
    "Completed without Expectations",
  ];

    const TodayDate = new Date();

  const DateValue = TodayDate.toLocaleDateString("en-In", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  console.log(DateValue);
  const TimeValue = TodayDate.toLocaleTimeString("en-In", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  console.log(TimeValue);

    const pullData = async () => {
      try {
        const taskData = await getTasks();

        const overdueTasks = taskData.filter(
          (task) =>
            new Date(task.dueDate) < currentDate &&
            (task.status === "Assigned" ||
              task.status === "Initiated" ||
              task.status === "Estimated") &&
            (task.assigneeID == localStorage.getItem("EmpId")) 
        ).length;

        const highPrior = taskData.filter(
          (task) =>
            task.priority === "High" &&
            task.assigneeID == localStorage.getItem("EmpId") &&
            (task.status === "Assigned" ||
              task.status === "Initiated" ||
              task.status === "Estimated")
        ).length;

        const counts = statuses.map(
          (status) =>
            taskData.filter(
              (task) =>
                task.status === status &&
                task.assigneeID == localStorage.getItem("EmpId")
            ).length
        );

        const getMonthAndYear = (date) => {
          const d = new Date(date);
          return {
            month: d.getMonth(),
            year: d.getFullYear(),
          };
        };
        setStatusCounts(counts);

        const Pend = taskData.filter(
          (task) =>
            task.assigneeID == localStorage.getItem("EmpId") && 
            new Date(task.dueDate) > currentDate &&
            task.status === "Initiated"
        ).length;

        const upcome = taskData.filter(
          (task) =>
            task.assigneeID == localStorage.getItem("EmpId") &&
            task.status === "Estimated"
        ).length;

        const EmpTask = taskData.filter(
          (task) =>
            task.assigneeID == localStorage.getItem("EmpId") &&
            (task.status === "Assigned" ||
              task.status === "Initiated" ||
              task.status === "Estimated")
        ).length;

        const TotalTask = taskData.filter(
          (task) => task.assigneeID == localStorage.getItem("EmpId")
        ).length;

        const CompTask = taskData.filter(
          (task) =>
            task.assigneeID == localStorage.getItem("EmpId") &&
            (task.status === "Completed" ||
              task.status === "Completed with Expectations" ||
              task.status === "Completed without Expectations")
        ).length;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

        const compdays = daysArray.map((day) =>
          taskData.filter(
            (task) =>
              (task.status === "Completed" ||
                task.status === "Completed with Expectations" ||
                task.status === "Completed without Expectations") &&
              new Date(task.completedDate).getDate() === day &&
              task.assigneeID == localStorage.getItem("EmpId")
          ).length
        );

        const gaugevalue = (TotalTask == 0 ? 0 : round((CompTask / TotalTask) * 100))
        console.log((TotalTask == 0) ? 0 : round((CompTask / TotalTask) * 100));

        console.log("Days array:", daysArray);
        console.log("Completed days:", compdays);
        console.log(gaugevalue);
        console.log(CompTask);
        console.log(TotalTask);
        console.log(TotalTask.length);
        console.log(round((CompTask / TotalTask) * 100));
        setDays(daysArray);
        setCmpDays(compdays);
        setGauge(gaugevalue);
        setHighPriority(highPrior);
        setTaskNum(EmpTask);
        setPending(Pend);
        setUpcoming(upcome);
        setOverDue(overdueTasks);
        setTotTask(TotalTask);
        setCompTask(CompTask);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
useEffect(() => {
    pullData();
  }, []);

  return (
    <div className="h-full">
              <div className="h-20 overflow-hidden rounded-md relative flex justify-end items-start gap-2 mb-2">
                <img
                  className="object-cover absolute h-full w-full opacity-60"
                  src="/images/dashboard_img.png"
                  alt="image1"
                />

                <span className=" mt-2 mr-2 bg-white backdrop-blur-sm text-[#150f2e] text-xs font-bold  rounded-xl py-1 px-2 flex items-center gap-1">
                  <MdOutlineDateRange />{DateValue}
                  
                </span>

                <span className="mt-2 mr-2  bg-white backdrop-blur-sm text-[#150f2e] text-xs font-bold  rounded-xl px-2 py-1 flex items-center gap-1 ">
                 <MdOutlineAccessTime />{TimeValue}
                </span>
              </div>
      <Grid container spacing={1} sx={{ height: "100" }}>
        <Grid item xs={12} md={3}>
          <div className="flex flex-col gap-2 h-full">
            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#FFECEB]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-[#DF1001] text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-[#DF1001]">
                          Total Task
                      </p>
                      <p className="text-sm font-semibold text-[#DF1001]">
                          {totTask}
                      </p>
                    </div>
                  </div>
            </div>

            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#E5F1E7] text-[#4F925A]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">
                          Completed Task
                      </p>
                      <p className="text-sm font-semibold">
                      {comptask}/{totTask}
                      </p>
                    </div>
                  </div>
            </div>
            
            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#DCEBF9] text-[#237DD1]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">
                          Pending Task
                      </p>
                      <p className="text-sm font-semibold">
                       {pending}/{taskNum}
                      </p>
                    </div>
                  </div>
            </div>
            
            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#F4E1E1] text-[#A43D3D]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">
                      Over Due Task
                      </p>
                      <p className="text-sm font-semibold">
                       {overDue}/{taskNum}
                      </p>
                    </div>
                  </div>
            </div>

            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#FFF3D6] text-[#F5AB00]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">
                      Upcoming Task
                      </p>
                      <p className="text-sm font-semibold">
                       {upcoming}/{taskNum}
                      </p>
                    </div>
                  </div>
            </div>
            
            <div className="border h-[86px] flex items-center justify-center rounded-lg bg-[#E8E4F1] text-[#6B53A2]">
                  <div className="flex flex-row gap-4 justify-start px-4 w-full">
                    <div className="flex items-center justify-center text-5xl">
                        <MdAddTask />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">
                      High Priority Task
                      </p>
                      <p className="text-sm font-semibold">
                       {highPriority}/{taskNum}
                      </p>
                    </div>
                  </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} >
              <div className="w-full h-full bg-white p-2 rounded-md">
                <h3 className="font-semibold text-xl">
                Task Status
                </h3>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: [
                            "Assigned",
                            "Estimated",
                            "Initiated",
                            "Completed",
                            "CWE",
                            "CWOE",
                          ],
                        },
                      ]}
                      series={[{ data: statusCounts }]}
                      height={230}
                    />
              </div>
                </Grid>

                <Grid item xs={12} md={6}>
              <div className="w-full h-full bg-white p-2 rounded-md">
                <h3 className="font-semibold text-xl">
                  Total Complete
                </h3>
                <Gauge height={230} value={gauge}  />
              </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <div className="w-full h-full bg-white p-2 rounded-md">
                <h3 className="font-semibold text-xl">
                  Monthly Completed
                </h3>
                <LineChart
                  xAxis={[{ data: days }]}
                  series={[{ data: cmpDays }]}
                  height={230}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
