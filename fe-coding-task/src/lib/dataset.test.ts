import { describe, expect, test } from '@jest/globals';
import { fetchDataSet } from './dataset';

describe('fetchDataSet', () => {
  test('fetches dataset', async () => {
    const quartersRange = [
      "2020K1",
      "2020K2",
      "2020K3",
      "2020K4",
      "2021K1",
      "2021K2",
      "2021K3",
      "2021K4",
    ];

    const houseType = "00";
    const dataset = await fetchDataSet(houseType, quartersRange);

    // Dataset is not undefined
    expect(dataset).toBeDefined();

    // Validate Labels
    const labels = Object.keys(dataset.dimension.Tid.category.label);
    const hasAllLabels = labels.every(label => quartersRange.includes(label));

    // Expect to have all requested labels in query to be in the response (dataset)
    expect(hasAllLabels).toBeTruthy();

    // Validate Values
    // Length of requested quartersRange should be equal to that of dataset
    expect(quartersRange.length).toEqual(dataset.value.length);
  });
});
