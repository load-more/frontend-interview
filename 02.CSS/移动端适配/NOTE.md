## 移动端适配

### vw

**原理**

- 绘制设计稿
- 根据设计稿中的尺寸进行布局
- 使用 `postcss-px-to-viewport` 将单位进行转换

**插件使用**

- 安装：`npm install postcss-px-to-viewport -D`

- 在根目录下创建 `.postcssrc.js` 文件

  ```js
  module.exports = {
    plugins: {
      "postcss-px-to-viewport": {
        viewportWidth: 1242, // 设计稿宽度
        viewportHeight: 2208, // 设计稿高度
        unitPrecision: 6, // 小数的保留位数
        viewportUnit: 'vw', // 转换的单位，通常使用 vw
        selectorBlackList: ['.ignore'], // 忽略的类，如 `.ignore`, `.ignore-xxx`
        minPixelValue: 1, // 最小像素值，小于等于 1px 不转换
        mediaQuery: false, // 是否允许在媒体查询中转换单位
      }
    }
  }
  ```

- 开发环境或生产环境下，会自动转换单位