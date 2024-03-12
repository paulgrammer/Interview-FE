import { LineChart } from "@mui/x-charts/LineChart";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { TDataset } from "../types";
import { groupByYear } from "../lib/dataset";

export default function LineGraph({
  dataset,
  displayByYear,
}: {
  dataset: TDataset;
  displayByYear: boolean;
}) {
  if (displayByYear) {
    return (
      <Card variant="elevation">
        <CardContent sx={{ height: "500px", width: "100%" }}>
          <LineChart
            series={groupByYear(dataset)}
            xAxis={[
              {
                scaleType: "point",
                data: ["K1", "K2", "K3", "K4"],
                label: "Quarters Range",
              },
            ]}
            yAxis={[]}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevation">
      <CardContent sx={{ height: "500px", width: "100%" }}>
        <LineChart
          series={[
            { data: dataset.value, label: "Average price per square meter" },
          ]}
          xAxis={[
            {
              scaleType: "point",
              label: "Quarters Range",
              data: Object.keys(dataset.dimension.Tid.category.label),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
