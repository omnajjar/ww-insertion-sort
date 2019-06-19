export default function ControlledInsertionSort(arr, cb) {
  let toBeSortedArr = arr || [],
    sortedArr = [],
    index = 1,
    isFinished = false;

  if (toBeSortedArr.length >= 1) {
    sortedArr.push(toBeSortedArr[0]);
  }

  // build up the sorted array by sorting only one element.
  function _atomicSort() {
    if (isFinished) return;
    const element = toBeSortedArr[index];

    for (let i = 0; i < sortedArr.length; i++) {
      if (element < sortedArr[i]) {
        sortedArr.splice(i, 0, element);
        isFinished = sortedArr.length === toBeSortedArr.length;
        isFinished ? cb && cb() : index++;
        return;
      }
    }
    sortedArr.push(element);
    isFinished = sortedArr.length === toBeSortedArr.length;
    isFinished ? cb && cb() : index++;
    return;
  }

  function sort(nItem) {
    for (let i = 0; i < nItem; i++) _atomicSort();
  }

  function sortOne() {
    sort(1);
  }

  return {
    sort: sort,
    sortOne: sortOne,
    finished() {
      return isFinished;
    },
    getArray() {
      return toBeSortedArr;
    },
    getSortedArray() {
      return sortedArr;
    },
    addNumber(num) {
      toBeSortedArr.push(num);
    },
    getStats() {
      return {
        finished: this.finished(),
        array: this.getArray(),
        sortedArray: this.getSortedArray()
      };
    }
  };
}
