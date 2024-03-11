import { LineChart } from "@mui/x-charts/LineChart";
import { TDataset } from "../types";

export default function LineGraph({ dataset }: { dataset: TDataset }) {
  return (
    <LineChart
      width={500}
      height={300}
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
  );
}
