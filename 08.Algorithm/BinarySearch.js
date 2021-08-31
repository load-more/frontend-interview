// 寻找数组左边界
function findLeftBoundary(arr, target) {
  let left = 0, right = arr.length - 1, mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (arr[mid] < target) {
      left = mid + 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else {
      right = mid - 1
    }
  }
  if (arr[left] !== target || left >= arr.length) {
    return -1
  }
  return left
}

// 寻找数组右边界
function findRightBoundary(arr, target) {
  let left = 0, right= arr.length - 1, mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (target > arr[mid]) {
      left = mid + 1
    } else if (target < arr[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  if (arr[right] !== target || right < 0) {
    return -1
  }
  return right
}

const arr = [1,2,3,3,3,3]
const target = 31
const left = findLeftBoundary(arr, target)
const right = findRightBoundary(arr, target)
console.log(left, right);