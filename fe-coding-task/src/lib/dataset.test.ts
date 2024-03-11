import { describe, expect, test } from '@jest/globals';
import { fetchDataSet } from './dataset';

describe('fetchDataSet', () => {
  test('fetches dataset', async () => {
    const TidValues = [
      "2020K1",
      "2020K2",
      "2020K3",
      "2020K4",
      "2021K1",
      "2021K2",
      "2021K3",
      "2021K4",
    ];

    const query = {
      query: [
        {
          code: "Boligtype",
          selection: {
            filter: "item",
            values: ["00"],
          },
        },
        {
          code: "ContentsCode",
          selection: {
            filter: "item",
            values: ["KvPris"],
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "item",
            values: TidValues,
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    }

    const dataset = await fetchDataSet(query);

    // Dataset is not undefined
    expect(dataset).toBeDefined();

    // Validate Labels
    const labels = Object.keys(dataset.dimension.Tid.category.label);
    const hasAllLabels = labels.every(label => TidValues.includes(label));

    // Expect to have all requested labels in query to be in the response (dataset)
    expect(hasAllLabels).toBeTruthy();

    // Validate Values
    // Length of requested TidValues should be equal to that of dataset
    expect(TidValues.length).toEqual(dataset.value.length);
  });
});
