// 并查集
// https://www.nowcoder.com/questionTerminal/11ee0516a988421abf40b315a2b28d08

const root = [] // 根节点
const height = [] // 根节点对应树的高度
const sum = [] // 根节点对应树的总节点数
let n = 10
// 初始化，index为节点，arr[index]为根节点
for (let i = 0; i < n; i++) {
  root[i] = i
  height[i] = 1
  sum[i] = 1
}

// 查
function find(x) {
  if (root[x] === x) return x
  // 优化
  root[x] = find(root[x])
  return root[x]
}

// 并
function union(x, y) {
  let rootX = find(x), rootY = find(y)
  if (rootX !== rootY) {
    // 优化，将高度更小的根节点连到高度更大的根节点
    if (height[rootX] > height[rootY]) {
      root[rootY] = rootX
      sum[rootX] += sum[rootY]
    } else if (height[rootX] < height[rootY]) {
      root[rootX] = rootY
      sum[rootY] += sum[rootX]
    } else {
      root[rootY] = rootX
      height[rootX] += 1
      sum[rootX] += sum[rootY]
    }
  }
}

const arr = [[1, 2], [3, 4], [5, 6], [1, 6]]
for (let i = 0; i < arr.length; i++) {
  let n1 = arr[i][0]
  let n2 = arr[i][1]
  union(n1, n2)
}
console.log(sum)