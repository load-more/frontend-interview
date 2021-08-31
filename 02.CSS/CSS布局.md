# CSS布局

> 原文：https://juejin.cn/post/6844903574929932301#heading-2

## 一、水平居中

### 文本/行内/行内块元素

#### text-align

原理：text-align 只控制行内内容(**文字、行内元素、行内块级元素**)如何相对他的块父元素对齐

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    text-align: center; // 对于子元素是文字、行内元素或行内块元素有效
  }
  .son1 {
    width: 100px;
    height: 100px;
    background-color: red;
    display: inline-block; // 可以设置宽高
  }
  .son2 {
	display: inline; // 设置宽高无效
  }
</style>
<body>
  <div class="parent">
    <div class="son1"></div>
    <div class="son2">这是文字</div>
  </div>
</body>
```

- 优点：简单快捷，容易理解，兼容性非常好
- 缺点：只对行内内容有效；属性会继承影响到后代行内内容；如果子元素宽度大于父元素宽度则无效，只有后代行内内容中宽度小于设置text-align属性的元素宽度的时候，才会水平居中

### 块元素

#### 1.margin

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 0 auto;
  }
</style>
<body>
  <div class="parent">
    <div class="son">
    </div>
  </div>
</body>
```

#### 2.transform

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    position: relative;
  }
  .son {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: red;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
  </div>
</body>
```

### 任意元素

#### flex

无论是块元素还是文本/行内/行内块元素，都可以使用 `Flex` 布局实现水平居中

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
  }
</style>
<body>
  <div class="parent">
    <span>hello</span>
  </div>
</body>
```

## 二、垂直居中

### 单行文本/行内/行内块元素

#### line-height

设置 `line-height` 大小等于 `height`，即可实现单行文本垂直居中。

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    line-height: 400px;
  }
</style>
<body>
  <div class="parent">
    <span>hello</span>
  </div>
</body>
```

### 多行文本/行内/行内块元素

#### line-height

原理和单行文本类似，只不过如果有 n 行文本， `line-height` 就设置为 `height / n`。

```html
<style>
  .parent {
    width: 400px;
    height: 300px;
    border: 1px solid black;
    line-height: 100px;
  }
</style>
<body>
  <div class="parent">
    <span>hello</span><br>
    <span>world</span><br>
    <span>good</span><br>
  </div>
</body>
```

### 图片

#### line-height + vertical-align

原理：[vertical-align和line-height的基友关系](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    line-height: 400px; /*设置字体垂直居中*/
    font-size: 0; /*将字体大小设置为0，就能使文字的中心位置和中线保持一致，不会出现偏差*/
  }
  img {
    vertical-align: middle; /*默认为baseline对齐，设置为middle对齐，使图片和文字中线对齐*/
    width: 200px; 
  }
</style>
<body>
  <div class="parent">
    <img src="./cat.jpg" alt="">
  </div>
</body>
```

### 块元素

#### 1.table-cell

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: table-cell; /*设置为table-cell*/
    vertical-align: middle; /*垂直居中*/
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
</body>
```

#### 2.margin

父相子绝

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    position: relative;
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
</body>
```

#### 3.transform

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    position: relative; /* 父相子绝 */
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 50%; /* top相对父元素 */
    transform: translateY(-50%); /* translateY相对自身 */
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
</body>
```

#### 4.flex

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: flex;
    align-items: center;
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
</body>
```

## 三、水平垂直居中

### 图片/行内/行内块元素

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    text-align: center; /* 水平居中 */
    line-height: 400px; /* 设置行高 */
    font-size: 0; /* 消除文字中心位置产生的偏差 */
  }
  img {
    width: 100px;
    height: 100px;
    vertical-align: middle; /* 图片和文字中心对齐 */
  }
</style>
<body>
  <div class="parent">
    <img src="./cat.jpg" alt="">
  </div>
</body>
```

### table-cell

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: table-cell;
    vertical-align: middle; /* 垂直居中 */
    /* text-align: center; 如果是行内/行内块元素，设置水平居中 */
  }
  .son {
    width: 100px;
    height: 100px;
    /* margin: 0 auto; 如果是块元素，设置水平居中 */
  }
</style>
<body>
  <div class="parent">
    <!-- <img src="./cat.jpg" alt=""> -->
    <div class="son"></div>
  </div>
</body>
```

### margin

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    position: relative;
  }
  .son {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
  </div>
</body>
```

### transform

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    position: relative;
  }
  .son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
  </div>
</body>
```

### flex

```html
<style>
  .parent {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div class="parent">
    <div class="son"></div>
  </div>
</body>
```

