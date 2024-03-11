type Dataset = {
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
