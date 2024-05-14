export const quickSort = (arr: string | any[]) => {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].displayName.toLowerCase() < pivot.displayName.toLowerCase()) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  const array: any = [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  return array;
};
