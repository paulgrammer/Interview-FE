import { describe, expect, test } from '@jest/globals';
import { fetchDataSet } from './dataset';

describe('fetchDataSet', () => {
  test('fetches dataset', async () => {
    const quartersRange ='2020K1-2021K4'

    const houseType = "00";
    const dataset = await fetchDataSet(houseType, '2020K1-2021K4');

    // Dataset is not undefined
    expect(dataset).toBeDefined();

    // Validate Labels
    const labels = Object.keys(dataset.dimension.Tid.category.label);
    const hasLabels = labels.some(label => quartersRange.split('-').includes(label));

    // Expect to have all requested labels in query to be in the response (dataset)
    expect(hasLabels).toBeTruthy();
  });
});
