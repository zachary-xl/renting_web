// @ts-nocheck
function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

function measureSort(sortAlgorithm, n = 100000) {
  const arr = Array(n)
    .fill(0)
    .map((_) => Math.floor(Math.random() * n));
  const startTime = performance.now();
  sortAlgorithm(arr);
  const endTime = performance.now();
  const timeElapsed = (endTime - startTime).toFixed(3);
  console.log(`使用 ${sortAlgorithm.name} 算法排序 ${n} 个元素 消耗时间为 ${timeElapsed} 毫秒.`);
}

function testSort(sortAlgorithm) {
  const arr = Array(10)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 200));
  const arrSort = sortAlgorithm(arr);
  console.log("排序后有序数组 ", arrSort);
  console.log("是否是正确的排序? ", isSorted(arrSort));
}

// testSort(bubbleSort);
// testSort(selectionSort);
// testSort(insertionSort);
// testSort(mergeSort);
// testSort(quickSort);
// measureSort(bubbleSort);
// measureSort(selectionSort);
// measureSort(insertionSort);
// measureSort(mergeSort);
// measureSort(quickSort);

/**
 * 快速排序
 * @param arr
 * @returns {*}
 */
function quickSort(arr) {
  const n = arr.length;
  partition(0, n - 1);

  function partition(left, right) {
    if (left >= right) return;
    let i = left;
    let j = right - 1;
    let pivot = arr[right];
    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    partition(left, j);
    partition(i + 1, right);
  }

  return arr;
}

/**
 * 归并排序
 * @param arr
 * @returns {number[]}
 */
function mergeSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;
  const mid = Math.floor(n / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  const leftArrSort = mergeSort(leftArr);
  const rightArrSort = mergeSort(rightArr);

  let i = 0;
  let j = 0;
  const resultArr = [];
  while (i < leftArrSort.length && j < rightArrSort.length) {
    if (leftArrSort[i] <= rightArrSort[j]) {
      resultArr.push(leftArrSort[i]);
      i++;
    }
    if (leftArrSort[i] > rightArrSort[j]) {
      resultArr.push(rightArrSort[j]);
      j++;
    }
  }
  if (i < leftArrSort.length) {
    resultArr.push(...leftArrSort.slice(i));
  }
  if (j < rightArrSort.length) {
    resultArr.push(...rightArrSort.slice(j));
  }
  return resultArr;
}

/**
 * 插入排序
 * @param arr
 * @returns {*}
 */
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let cur = arr[i];
    let j = i - 1;
    while (arr[j] > cur && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
  return arr;
}

/**
 * 选择排序
 * @param arr
 * @returns {*}
 */
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

/**
 * 冒泡排序
 * @param arr
 * @returns {*}
 */
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let isComplete = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isComplete = true;
      }
    }
    if (!isComplete) break;
  }
  return arr;
}
