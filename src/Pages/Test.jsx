import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getTasks } from "../Service/Task_Service/Task_service";
import { LineChart, PieChart, ScatterChart } from "@mui/x-charts";
import { Box, Grid } from "@mui/material";

export default function Test() {
  const [statusCounts, setStatusCounts] = useState([]);
  const statuses = [
    "Assigned",
    "Estimated",
    "Initiated",
    "Completed",
    "Completed with Expectations",
    "Completed without Expectations",
  ];

  async function pullData() {
    const taskData = await getTasks();
    const counts = statuses.map(
      (status) => taskData.filter((task) => task.status === status).length
    );
    console.log(counts);

    setStatusCounts(counts);
  }
  const data = statuses.map((status, index) => ({
    value: statusCounts[index],
    label: status,
  }));
  console.log(data);

  const scatterChartData = data.map((status, index) => ({
    x: index,
    y: status.value,
  }));

  useEffect(() => {
    pullData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        sx={{ border: 1, borderColor: "black" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6} sx={{ border: 1, borderColor: "black" }}>
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
            series={[
              {
                data: statusCounts,
              },
            ]}
            height={500}
          />
        </Grid>
        <Grid item xs={6} sx={{ border: 1, borderColor: "black" }}>
          <LineChart
            xAxis={[{ data: ["1", "2", "3", "4", "5", "6"] }]}
            series={[
              {
                data: statusCounts,
              },
            ]}
            height={500}
          />
        </Grid>
        <Grid item xs={6} sx={{ border: 1, borderColor: "black" }}>
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={350}
          />
        </Grid>
        <Grid item xs={6} sx={{ border: 1, borderColor: "black" }}>
          <ScatterChart
            height={500}
            series={[
              {
                data: scatterChartData,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
