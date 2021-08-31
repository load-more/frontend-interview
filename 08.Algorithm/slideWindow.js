function minWindow(source, target) {
  let left = 0, // 左边界
      right = 0, // 右边界
      valid = 0, // 有效个数
      start = 0, // 有效字符串的开始位置
      end = 0, // 有效字符串的结束位置
      min = Infinity // 有效字符串的最小长度
  let need = {}, // target 中的映射表
      window = {} // 滑动窗口的映射表
  // 1. 统计 need
  for (let i of target) {
    !need[i] ? need[i] === 1 : need[i]++
  }
  // 2. 扩展窗口
  while (right < source.length) {
    let c = source[right]
    right++

    // 3. 统计 window
    if (need[c]) {
      !window[c] ? window[c] = 1 : window[c]++
      if (window[c] === need[c]) {
        valid++
      }
    }

    // 4. 缩小 window
    while (valid === Object.keys(need).length) {
      if (right - left < min) { // 更新最小字串
        start = left
        end = right
        min = right - left
      }

      let d = s[left]
      left++
      
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--
        }
        window[d]--
      }
    }
  }
}