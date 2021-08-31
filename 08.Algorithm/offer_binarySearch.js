















// 剑指 Offer 04. 二维数组中的查找
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  if (!matrix.length) return false
  const rows = matrix.length,
        columns = matrix[0].length
  let x = columns - 1, y = 0
  while (x >= 0 && y < rows) {
    let cur = matrix[y][x]
    if (target < cur) {
      x--
    } else if (target > cur) {
      y++
    } else {
      return true
    }
  }
  return false
};


// 剑指 Offer 11. 旋转数组的最小数字
/**
 * @param {number[]} numbers
 * @return {number}
 */
 var minArray = function(numbers) {
  // 二分查找，寻找左边界
  let left = 0, right = numbers.length - 1, mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (numbers[mid] > numbers[right]) {
      left = mid + 1
    } else if (numbers[mid] < numbers[right]) {
      right = mid
    } else { // 相等，边界左移
      right--
    }
  }
  return numbers[left]
};
