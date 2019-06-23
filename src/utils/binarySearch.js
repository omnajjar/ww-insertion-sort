// returns the right insertion place in the array for the given value
export function binarySearch(arr, target) {
  let low = 0,
    high = arr.length - 1,
    mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return {low: low - 1, high: high + 1};
}
