## 时间复杂度

### 常见的时间复杂度

- **O(1)**：Constant Complexity 常数复杂度
- **O(log n)**：Logarithmic Complexity 对数复杂度
- **O(n)**：Linear Complexity 线性时间复杂度
- **O(n^2)**：N square Complexity 平方
- **O(n^3)**：N cubic Complexity 立方
- **O(2^n)**：Exponential Growth 指数
- **O(n!)**：Factorial 阶乘

> 注意，分析时间复杂度的时候是不考虑前边的系数的，比如说O(1)的话，并不代表它的复杂度是1，也可以是2、3、4...,只要是常数次的，都用O(1)表示，又或者O(n)，复杂度可能是 n/2、2*n、n+2...



### 判断时间复杂度

```js
O(1) // 不管 n 为多少，都只执行一行代码，所以复杂度为 1，时间复杂度为 O(1)
let n = 1000

O(1) // 不管 n 为多少，都只执行三行代码，所以复杂度为 3，忽略常数项，时间复杂度为 O(1)
let n = 1000
let a = 1
let b = 2
```

```js
O(n) // 循环内语句执行次数与 n 有关，执行 n 次，所以复杂度为 n，时间复杂度为 O(n)
for (let i = 0; i < n; i++) {
    console.log(i)
}

O(n) // 循环内语句执行 n + 1 次，所以复杂度为 n + 1，忽略常数项，时间复杂度为 O(n)
for (let i = 0; i <= n; i++) {
    console.log(i)
}
```

```js
O(n^2) // 循环内语句执行了 n^2 次，所以复杂度为 n^2，时间复杂度为 O(n^2)
for (let i = 0; i < n; i++) {
	for (let j = 0; j < n; j++) {
        console.log('hello')
    }
}

O(n^2) // 循环内语句执行了 (n+1)*(n-2) 次，所以复杂度为 n^2-n-2，忽略常数项，取最高次项，时间复杂度为 O(n^2)
for (let i = 0; i <= n; i++) {
	for (let j = 0; j < n - 2; j++) {
		console.log('hello')
    }
}
```

```js
O(log n) // 循环内语句执行了 log2 n 次，所以复杂度为 log2 n，忽略常数项，时间复杂度为 O(log n)
for (let i = 0; i < n; i *= 2) {
    console.log(i)
}
```

```js
O(2^n) // 程序运行可用二叉树表示，节点总数可视为语句执行总次数，可得复杂度为 2^n，时间复杂度为 O(2^n)
function fib(n) {
	if (n < 2) {
        return n
    }
    return fib(n - 2) + fib(n - 1)
}
```



---

## 空间复杂度

空间复杂度和时间复杂度的情况其实类似，但是它更加的简单。用最简单的方式来分析即可。主要有以下情况：

情况一：

```js
O(1) // 如果算法执行所需要的临时空间不随着某个变量n的大小而变化，即此算法空间复杂度为一个常量，可表示为 O(1)
let arr = [1, 2, 3]
let i = 1
let j = 2
i++
++j
```

情况二：

```js
O(n) // 第一行new了一个数组出来，这个数据占用的大小为n，虽然有循环，但没有再分配新的空间，因此，这段代码的空间复杂度主要看第一行即可，即O(n)
let arr = new Array(n)
for (i = 0; i < n; i++) {
   console.log(i)
}
```

情况三：

```js
O(n) // 第一行new了一个二维数组，这个数据占用的大小为n^2，虽然有循环，但没有再分配新的空间，因此，这段代码的空间复杂度主要看第一行即可，即O(n^2)
let arr = new Array(n).fill(0).map(item => new Array(n).fill(0)))
for (i = 0; i < n; i++) {
   console.log(i)
}
```

情况四：

如果是有递归的话，那么它递归最深的深度，就是你空间复杂度的最大值。如果你的程序里边递归中又开了数组，那么空间复杂度就是两者的最大值。

---

## 参考资料

- https://juejin.cn/post/6854573206830448654
- https://juejin.cn/post/6844904103194132494