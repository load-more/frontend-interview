// 生成一个随机数组
generateArray = function(length) {
  const arr = Array(length);
  for(let i=0; i<length; i++) {
      arr[i] = Math.random();
  }
  return arr;
}
let arr = generateArray(10000000)

arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 7]

function bubbleSort(arr) {
  console.time('BubbleSort');
  // 获取数组长度，以确定循环次数。
  let len = arr.length;
  // 遍历数组len次，以确保数组被完全排序。
  for (let i = 0; i < len - 1; i++) {
      // 遍历数组的前len-i项，忽略后面的i项（已排序部分）。
      for(let j = 0; j < len - 1 - i; j++) {
          // 将每一项与后一项进行对比，不符合要求的就换位。
          if(arr[j] > arr[j+1]) {
            ;[arr[j+1], arr[j]] = [arr[j], arr[j+1]]
          }
      }
  }
  console.timeEnd('BubbleSort');
  return arr;
}

function insertionSort(arr) {
  console.time('InsertionSort')
  let preIndex
  for (let i = 1, len = arr.length; i < len; i++) {
    preIndex = i - 1
    while (arr[preIndex] > arr[preIndex + 1] && preIndex >= 0) {
      [arr[preIndex], arr[preIndex + 1]] = [arr[preIndex + 1], arr[preIndex]]
      preIndex--
    }
  }
  console.timeEnd('InsertionSort');
  return arr
}

function selectionSort(arr) {
  console.time('selectionSort')
  let minVal, minIndex, len = arr.length
  for (let i = 0; i < len - 1; i++) {
    minVal = arr[i]
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < minVal) {
        minVal = arr[j]
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  console.timeEnd('selectionSort')
  return arr
}

function mergeSort(arr) {
  function merge(left, right) {
    const rst = []
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        rst.push(left.shift())
      } else {
        rst.push(right.shift())
      }
    }
    while (left.length) {
      rst.push(left.shift())
    }
    while (right.length) {
      rst.push(right.shift())
    }
    return rst
  }
  let len = arr.length
  if (len <= 1) return arr
  let mid = len >> 1,
      left = arr.slice(0, mid), 
      right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

// 原地排序，不占用额外空间
function quickSort(arr, left = 0, right = arr.length - 1) {
  // 分区函数，将小于基准的数放到基准左边，大于等于基准的数放到右边，并返回基准的索引
  function partition(arr, left, right) {
    let pivot = left // 去第一个元素为基准
    let index = pivot + 1 // index-1就是基准的索引位置
    for (let i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) { // 如果元素小于基准值
        [arr[i], arr[index]] = [arr[index], arr[i]] // 将比基准小的元素移到基准的位置上 
        index++ // 基准后移一位，保证index-1始终是基准的索引位置
      }
    }
    [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]]
    return index - 1 // index-1即为基准的位置
  }
  if (left < right) {
    let pivotIndex = partition(arr, left, right)
    quickSort(arr, left, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, right)
  }
  // 不需要返回值
}



// const bubbleSortRst = bubbleSort(arr)

// const insertionSortRst = insertionSort(arr)

// const selectionSortRst = selectionSort(arr)

// console.time('mergeSort');
// const mergeSortRst = mergeSort(arr)
// console.timeEnd('mergeSort');

console.time('quickSort')
quickSort(arr)
console.log(arr)
console.timeEnd('quickSort')


// 打印结果
// console.log(bubbleSortRst);
// console.log(insertionSortRst);
// console.log(selectionSortRst);
// console.log(mergeSortRst);
// console.log(quickSortRst);

