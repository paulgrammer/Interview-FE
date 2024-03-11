import SaveSearchHistoryDialog from "./SaveSearchHistoryDialog";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { TFilter } from "../types";
import { historyExists } from "../lib/searchHistory";

const propertyTypes = [
  {
    value: "00",
    label: "Boliger i alt",
  },
  {
    value: "02",
    label: "Småhus",
  },
  {
    value: "03",
    label: "Blokkleiligheter",
  },
];

export default function SearchBar({
  onFilter,
  onSaveHistory,
}: {
  onSaveHistory: () => void;
  onFilter: (filters: TFilter) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFilter>({
    defaultValues: {
      quartersRange: "2016K1-2021K4",
      houseType: "02",
    },
  });

  const [saveHistoryDialogOpen, openSaveHistoryDialog] = useState(false);

  const onSubmit = useCallback(async (filters: TFilter) => {
    onFilter(filters);

    // Save history it doesn't exist.
    if (!historyExists(filters)) {
      openSaveHistoryDialog(true);
    }
  }, []);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
          <TextField
            sx={{ m: 1 }}
            label="Quarters Range"
            placeholder="2016K1-2021K4"
            required
            {...register("quartersRange", {
              required: { value: true, message: "Quarters Range is required!" },
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
        </div>

        <Divider component="p" sx={{ marginBottom: 2 }} />
      </Box>

      <SaveSearchHistoryDialog
        onSave={onSaveHistory}
        open={saveHistoryDialogOpen}
        onClose={() => openSaveHistoryDialog(false)}
      />
    </>
  );
}
