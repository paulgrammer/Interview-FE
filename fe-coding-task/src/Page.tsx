import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { saveHistory } from "./lib/searchHistory";
import SearchBar from "./components/SearchBar";
import LineGraph from "./components/LineGraph";
import { fetchDataSet } from "./lib/dataset";
import { TDataset, TFilter } from "./types";

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataset, setDataSet] = useState<TDataset | null>();
  const [filters, setFilters] = useState<TFilter>();

  const fetchData = useCallback(async () => {
    const data = await fetchDataSet("00", [
      "2020K1",
      "2020K2",
      "2020K3",
      "2020K4",
      "2021K1",
      "2021K2",
      "2021K3",
      "2021K4",
    ]);

    setDataSet(data);
  }, []);

  const onSaveHistory = useCallback(() => {
    if (filters) saveHistory(filters);
  }, [filters]);

  const onFilter = useCallback(
    (searchFilters: TFilter) => {
      setFilters(searchFilters);

      // Add params to path
      searchParams.set("houseType", searchFilters.houseType);
      searchParams.set("quartersRange", searchFilters.quartersRange);
      setSearchParams(searchParams);
    },
    [searchParams]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar onFilter={onFilter} onSaveHistory={onSaveHistory} />
      {dataset && <LineGraph dataset={dataset} />}
    </div>
  );
}
