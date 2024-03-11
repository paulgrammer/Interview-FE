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

export type TFilter = {
  quartersRange: string;
  houseType: string;
};
