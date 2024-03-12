import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { saveHistory } from "./lib/searchHistory";
import SearchBar from "./components/SearchBar";
import LineGraph from "./components/LineGraph";
import { fetchDataSet } from "./lib/dataset";
import { TDataset, TFilter } from "./types";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SearchHistory from "./components/SearchHistory";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataset, setDataSet] = useState<TDataset | null>();
  const [loading, setLoading] = useState(false);
  const [displayByYear, setDisplayByYear] = useState(false);

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
    if (filters) {
      saveHistory(filters);
      searchParams.set("h_changed_at", new Date().toISOString());
      setSearchParams(searchParams);
    }
  }, [filters, searchParams]);

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
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ margin: 10 }}
      >
        <Switch
          value="default"
          inputProps={{ "aria-label": "Switch A" }}
          onChange={(e) => setDisplayByYear(e.target.checked)}
        />
        <Typography>Group By Year</Typography>
      </Stack>

      <SearchBar
        onFilter={onFilter}
        onSaveHistory={onSaveHistory}
        defaultFilters={defaultFilters}
      />
      <Grid container spacing={2}>
        <Grid md={8}>
          {loading ? (
            <Box>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <>
              {dataset && <LineGraph dataset={dataset} displayByYear={displayByYear} />}
            </>
          )}
        </Grid>
        <Grid md={4}>
          <SearchHistory onFilter={onFilter} />
        </Grid>
      </Grid>
    </div>
  );
}
