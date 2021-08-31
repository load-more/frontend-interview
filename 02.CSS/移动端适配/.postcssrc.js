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