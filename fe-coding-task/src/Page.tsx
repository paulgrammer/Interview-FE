import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { saveHistory } from "./lib/searchHistory";
import SearchBar from "./components/SearchBar";
import LineGraph from "./components/LineGraph";
import { fetchDataSet, transformQuartersRange } from "./lib/dataset";
import { TDataset, TFilter } from "./types";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataset, setDataSet] = useState<TDataset | null>();
  const [loading, setLoading] = useState(false);

  const defaultFilters = useMemo(
    () => ({
      houseType: searchParams.get("houseType") || "",
      quartersRange: searchParams.get("quartersRange") || "",
    }),
    []
  );

  const [filters, setFilters] = useState<TFilter>(defaultFilters);

  const fetchData = useCallback(async () => {
    if (filters.houseType && filters.quartersRange) {
      setLoading(true);

      fetchDataSet(filters.houseType, filters.quartersRange)
        .then((data) => {
          setLoading(false);
          setDataSet(data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [filters]);

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
  }, [filters]);

  return (
    <div>
      <SearchBar
        onFilter={onFilter}
        onSaveHistory={onSaveHistory}
        defaultFilters={defaultFilters}
      />
      {loading ? (
        <Box>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <>{dataset && <LineGraph dataset={dataset} />}</>
      )}
    </div>
  );
}
