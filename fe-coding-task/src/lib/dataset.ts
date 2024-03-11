import { TDataset } from "../types";

export const fetchDataSet = async (houseType: string, quartersRange: string) => {
  try {
    const response = await fetch("https://data.ssb.no/api/v0/no/table/07241", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryBuilder(houseType, quartersRange))
    });

    if (!response.ok) {
      throw new Error(`Error fetching dataset: ${response.statusText}`);
    }

    const dataset: TDataset = await response.json();
    return dataset;
  } catch (error) {
    console.error(`Error fetching dataset:`, error);
    throw error; // Rethrow the error to handle it elsewhere if necessary
  }
};

export const queryBuilder = (houseType: string, quartersRangeStr: string) => ({
  query: [
    {
      code: "Boligtype",
      selection: {
        filter: "item",
        values: [houseType],
      },
    },
    {
      code: "ContentsCode",
      selection: {
        filter: "item",
        values: ["KvPris"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: transformQuartersRange(quartersRangeStr),
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
})

export const transformQuartersRange = (quartersRangeStr: string) => {
  const formatted_str = quartersRangeStr.trim().replace(/\s+/g, "")

  if (formatted_str.includes("-")) {
    const [start_str, end_str] = formatted_str.split("-");
    const start_year = parseInt(start_str) || 0;
    const end_year = parseInt(end_str) || 0;
    const min_tid_count = 1;
    const max_tid_count = 4;
    let values: string[] = [];

    // Get tid_filters for years between.
    for (let year = start_year; year <= end_year; year++) {
      // If year is equal to start or end year, get get count value from the last char.
      const tid_start_count = year == start_year ? parseInt(start_str[start_str.length - 1]) : min_tid_count;
      const tid_end_count = year == end_year ? parseInt(end_str[end_str.length - 1]) : max_tid_count;

      // Filters
      const tid_filters: string[] = [];

      // Based on the api, tids have a template parten of `YEAR-K-count` and nth ends at 4 max.
      for (let i = tid_start_count; i <= tid_end_count && i <= max_tid_count; i++) {
        tid_filters.push(`${year}K${i}`)
      }

      values = [...values, ...tid_filters];
    }

    return values;
  }

  return [quartersRangeStr];
}
