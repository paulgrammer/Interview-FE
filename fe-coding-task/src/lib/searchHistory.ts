
import { TFilter } from "../types";
const HISTORY_KEY = 'search-history';

const findHistoryIndex = (filters: TFilter) => {
  return retrieveHistory()
    .findIndex((h) => h.houseType === filters.houseType && h.quartersRange === filters.quartersRange)
}

const saveJson = (searchHistory: TFilter[]) => {
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
}

export const historyExists = (filters: TFilter) => findHistoryIndex(filters) >= 0

export const saveHistory = (filters: TFilter) => {
  const searchHistory = retrieveHistory();
  const entityAlreadyExists = findHistoryIndex(filters) >= 0;

  if (!entityAlreadyExists) {
    searchHistory.push(filters);
    saveJson(searchHistory);
  }
}

export const retrieveHistory = () => {
  const searchHistory = window.localStorage.getItem(HISTORY_KEY)
  const parseHistory: TFilter[] = JSON.parse(searchHistory || '[]');
  return parseHistory;
}

export const deleteHistory = (filters: TFilter) => {
  const searchHistory = retrieveHistory();
  const index = findHistoryIndex(filters);
  searchHistory.splice(index, 1);
  saveJson(searchHistory);
}
