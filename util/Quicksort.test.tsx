import { quickSort } from '@/util/Quicksort';
import { Feature } from '@/models/Features';

test('should sort the features by display name', () => {
  const inputFeatures: Feature[] = [
    { sid: { id: 1 }, displayName: 'zoo', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 2 }, displayName: 'bamboo', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 3 }, displayName: 'apple', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 4 }, displayName: 'kangaroo', epKeywords: ['keywords'], categorySid: { id: 1 } },
  ];
  const actual: Feature[] = [
    { sid: { id: 3 }, displayName: 'apple', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 2 }, displayName: 'bamboo', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 4 }, displayName: 'kangaroo', epKeywords: ['keywords'], categorySid: { id: 1 } },
    { sid: { id: 1 }, displayName: 'zoo', epKeywords: ['keywords'], categorySid: { id: 1 } },
  ];
  const expected1 = quickSort(inputFeatures);
  const expected2 = quickSort(inputFeatures);

  expect(expected1).toEqual(actual);
  expect(expected2).toEqual(actual);
});
