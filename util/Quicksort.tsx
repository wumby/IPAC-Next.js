import { Feature } from '@/models/Features';

export const quickSort: any = (arr: Feature[]) => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[arr.length-1];
  const leftArr = [];
  const rightArr = [];

  for (const val of arr.slice(0, arr.length - 1)) {
    val.displayName.toLowerCase() < pivot.displayName.toLowerCase()
      ? leftArr.push(val)
      : rightArr.push(val);
  }

  if (leftArr.length > 0 && rightArr.length > 0) {
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  } else if (leftArr.length > 0) {
    return [...quickSort(leftArr), pivot];
  } else {
    return [pivot, ...quickSort(rightArr)];
  }
};
