import { TDataset, TQuery } from "../types";

export const fetchDataSet = async (query: TQuery) => {
  try {
    const response = await fetch("https://data.ssb.no/api/v0/no/table/07241", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query)
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
