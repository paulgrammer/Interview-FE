import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { deleteHistory, retrieveHistory } from "../lib/searchHistory";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/History";
import { useSearchParams } from "react-router-dom";
import { propertyTypes } from "../lib/dataset";
import { useMemo } from "react";
import { TFilter } from "../types";

export default function SearchHistory({
  onFilter,
}: {
  onFilter: (filters: TFilter) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchHistory = useMemo(() => retrieveHistory(), [searchParams]);

  return (
    <Card variant="elevation">
      <CardContent>
        <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
          Search History
        </Typography>
        <List>
          {searchHistory.map((filter) => (
            <ListItem
              style={{ cursor: "pointer" }}
              key={`${filter.quartersRange}-${filter.houseType}`}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    deleteHistory(filter);
                    searchParams.set(
                      "h_changed_at",
                      new Date().toISOString()
                    );
                    setSearchParams(searchParams);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <SearchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                onClick={() => onFilter(filter)}
                primary={filter.quartersRange}
                secondary={
                  propertyTypes.find((p) => p.value === filter.houseType)?.label
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
