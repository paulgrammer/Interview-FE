import SaveSearchHistoryDialog from "./SaveSearchHistoryDialog";
import { historyExists } from "../lib/searchHistory";
import CardContent from "@mui/material/CardContent";
import { propertyTypes } from "../lib/dataset";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TFilter } from "../types";
import Card from "@mui/material/Card";

export default function SearchBar({
  onFilter,
  onSaveHistory,
  defaultFilters,
}: {
  defaultFilters?: TFilter;
  onSaveHistory: () => void;
  onFilter: (filters: TFilter) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFilter>({
    defaultValues: defaultFilters,
  });

  const [saveHistoryDialogOpen, openSaveHistoryDialog] = useState(false);

  const onSubmit = useCallback(async (filters: TFilter) => {
    onFilter(filters);

    // Save history it doesn't exist.
    if (!historyExists(filters)) {
      openSaveHistoryDialog(true);
    }
  }, []);

  const validateQuartersRange = useCallback((value: string) => {
    const [part1] = value.split("-");

    // UI should limit users from providing quarter values earlier than 2009K1.
    if (parseInt(part1) <= 2009) {
      return "Quarters range should start after 2009K1.";
    }
  }, []);

  return (
    <Card variant="elevation" sx={{ marginBottom: 4}}>
      <CardContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            sx={{ m: 1 }}
            label="Quarters Range"
            placeholder="2016K1-2021K4"
            required
            {...register("quartersRange", {
              required: {
                value: true,
                message: "Quarters Range is required!",
              },
              validate: validateQuartersRange,
            })}
            error={Boolean(errors.quartersRange)}
            helperText={errors.quartersRange?.message}
          />
          <TextField
            select
            sx={{ m: 1 }}
            label="House Type"
            defaultValue="02"
            required
            {...register("houseType", {
              required: { value: true, message: "House Type is required!" },
            })}
          >
            {propertyTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            Search
          </Button>
        </Box>

        <SaveSearchHistoryDialog
          onSave={onSaveHistory}
          open={saveHistoryDialogOpen}
          onClose={() => openSaveHistoryDialog(false)}
        />
      </CardContent>
    </Card>
  );
}
