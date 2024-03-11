import { TDataset } from "../types";

export const fetchDataSet = async (houseType: string, quartersRange: string[]) => {
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

export const queryBuilder = (houseType: string, quartersRange: string[]) => ({
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
        values: quartersRange,
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
})

