export type TDataset = {
  dimension: {
    Tid: {
      category: {
        index: Record<string, number>;
        label: Record<string, string>;
      };
    };
  };
  value: number[];
};

type TQueryItem = {
  code: string;
  selection: {
    filter: string;
    values: string[];
  };
};

export type TQuery = {
  query: TQueryItem[];
  response: {
    format: string;
  };
};
