## 面试题

**Vue**

- v-show 和 v-if 的区别
- 为何 v-for 中要用 key
- 描述 Vue 组件生命周期（有父子组件的情况）
- Vue 组件如何通讯
- 描述组件渲染和更新的过程
- 双向数据绑定 v-model 的实现原理

**Webpack**

- 前端代码为何要进行构建和打包
- module chunk bundle 分别是什么意思，有何区别
- loader 和 plugin 的区别
- webpack 如何实现懒加载
- webpack 常见性能优化
- babel-runtime 和 babel-polyfill 的区别

## Vue

### Vue使用

#### v-for

- v-for 用于遍历数组或对象

  ```html
  <ul>
      <li v-for="(val, key, index) in obj"></li>
      <li v-for="(item, index) in arr"></li>
  </ul>
  ```

- key 的重要性。key 不能乱写（尽量不要写成一个随机数或者 index，应该写成一个唯一的 id）

- v-for 和 v-if 不能一起使用

  **v-for 的优先级比 v-if 更高，所以会先渲染多个元素，然后在判断 v-if，这样就会造成多个元素的重复判断，降低性能。正确的做法是将 v-for 和 v-if 分开，将 v-if 放在 v-for 的外层元素上或者嵌套元素中。**

#### 事件

- event 参数，自定义参数

  E:\Web Front End\Mooc\5 前端框架及项目面试－聚焦Vue3ReactWebpack（升级版）\frame-project-interview-master\frame-project-interview\vue-code-demo\src\components\BaseUse\EventDemo.vue

- 事件修饰符，按键修饰符

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210726080705.png)

  ![image-20210726080826967](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20210726080826967.png)

- 【观察】事件被绑定到哪里？

#### 表单

- v-model
- 常见表单项 textarea checkbox radio select
- 修饰符 lazy number trim

#### Vue组件使用

- props 和 $emit（父子组件通讯）

- 自定义事件（兄弟、父子、隔代组件通讯）

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210726084803.png)

- 组件生命周期

  - 单个组件生命周期
    - 挂载阶段
    - 更新阶段
    - 销毁阶段
  - 父子组件生命周期

#### Vue高级特性

- 自定义 v-model
- $nextTick
- slot
- 动态、异步组件
- keep-alive
- mixin

**自定义v-model**

```vue
<template>
    <!-- 例如：vue 颜色选择 -->
    <input type="text"
        :value="text1"
        @input="$emit('change1', $event.target.value)"
    >
    <!--
        1. 上面的 input 使用了 :value 而不是 v-model
        2. 上面的 change1 和 model.event 要对应起来
        3. text1 属性对应起来
    -->
</template>

<script>
export default {
    model: {
        prop: 'text1', // 对应 props text1
        event: 'change1'
    },
    props: {
        text1: String,
        default() {
            return ''
        }
    }
}
</script>
```

**$nextTick**

- Vue 是异步渲染
- data 改变后，DOM 不会立刻渲染（JS引擎线程和GUI渲染线程互斥？？）
- $nextTick 会在 DOM 渲染之后被触发，以获取最新的 DOM 节点

---

**slot**

- 基本使用
- 作用域插槽
- 具名插槽

**作用域插槽**

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726103222.png)

**具名插槽**

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726102434.png)

---

**动态组件**

- `<component :is="component-name" />`
- 组件类型不确定，适用于需要根据数据动态渲染的场景

比如：

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726104447.png)

```js
<!-- 动态组件 -->
<!-- <component :is="NextTickName"/> -->
    
import NextTick from './NextTick' // 导入组件

    components: {
        NextTick // 声明组件
    },
        
    data() {
        return {
            NextTickName: "NextTick" // 调用组件
        }
    }
```

---

**异步组件**

- import() 函数
- 按需加载，异步加载大组件

```js
export default {
    components: {
        // 假设FormDemo的体积非常大，使用这种导入方式就可以实现组件的按需加载，提高性能
        FormDemo: () => import('../BaseUse/FormDemo')
    }
}
```

---

**keep-alive**

- 缓存组件
- 频繁切换，不需要重复渲染
- Vue 常见性能优化

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726112835.png)

keep-alive 可以将组件缓存起来，当切换组件的时候，组件不会被销毁，而是缓存下来了。

这里的示例比较简单，所以也可以通过 v-show 来实现，但是 v-show 只是依靠 CSS 中的 display 来实现组件的显隐，而 keep-alive 是通过 Vue 实现的组件缓存效果。

---

**mixin**

- 多个组件有相同的逻辑，利用 mixin 将它们抽离出来
- mixin 并不是完美的解决方案，会有一些问题
- Vue3 提出的 Composition API 旨在解决这些问题

```js
// mixin.js
export default {
    data() {
        return {
            city: '北京'
        }
    },
    methods: {
        showName() {
            // eslint-disable-next-line
            console.log(this.name)
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log('mixin mounted', this.name)
    }
}

// -------------------------------------------------------
// index.vue
<script>
import myMixin from './mixin'

export default {
    mixins: [myMixin], // 可以添加多个，会自动合并起来
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
```

问题：

- 变量来源不明确，不利于阅读
- 多个 mixin 可能会造成命名冲突
- mixin 和组件可能出现多对多的关系，复杂度较高

---

**Vuex**

属性：

- state
- getter
- action
- mutation

方法：

- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726120358.png)

---

**vue-router**

路由模式：

- hash 模式（默认），如 `http://abc.com/#/user/10`
- H5 history 模式，如 `http://abc.com/user/20`
- 后者需要 server 端支持，因此无特殊需求可选择前者

动态路由：

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726121313.png)

路由懒加载（类似前面的异步组件）：

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726121250.png)

### Vue原理

- 组件化
- 响应式
- vdom 和 diff
- 模板编译
- 渲染过程
- 前端路由

#### 组件化

数据驱动视图：

- 传统组件只是静态渲染，更新还需要依赖于操作 DOM
- 数据驱动视图 - Vue MVVM
- 数据驱动视图 - React setState

**Vue-MVVM**

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726142821.png)

#### 响应式

- Vue2.0 实现响应式的核心 API - Object.defineProperty
- Vue3.0 启用 Proxy，但 Proxy 兼容性不好，且无法 polyfill

**Object.defineProperty 实现响应式**

- 监听对象，监听数组
- 复杂对象，深度监听
- 缺点：
  - 深度监听，需要递归到底，一次性计算量大
  - 无法监听新增属性 / 删除属性（需要使用 Vue.set / Vue.delete）
  - 无法原生监听数组，需要特殊处理

#### vdom

- vdom 是实现 Vue 和 React 的重要基石
- diff 算法是 vdom 中最核心、最关键的部分
- vdom 是一个热门话题，也是面试中的热门问题

问题：

- DOM 操作非常耗费性能
- 以前用 jQuery，可以自行控制 DOM 操作的时机，手动调整
- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作？

解决方案：

- 有了一定复杂度，想要减少计算次数比较困难
- 能不能把计算，更多的转移为 JS 计算？因为 JS 执行速度很快
- vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM

用 JS 模拟 DOM 结构

![](https://gitee.com/gainmore/imglib/raw/master/img/20210726225433.png)

通过snabbdom学习vdom

- 简介强大的 vdom 库，易学易用
- Vue 参考它实现的 vdom 和 diff
- https://github.com/snabbdom/snabbdom
- Vue3.0 重写了 vdom 的代码，优化了性能
- 但 vdom 的基本理念不变，面试考点也不变
- React vdom 具体实现和 Vue 也不同，但不妨碍统一学习

vdom总结

- 用 JS 模拟 DOM 结构（vnode）
- 新旧 vnode 对比，得出最小的更新范围，最后更新 DOM
- 数据驱动视图模式下，有效控制 DOM 操作

#### diff算法

- diff 算法是 vdom 中最核心、最关键的部分
- diff 算法能在日常使用 vue React 中体现出来（如 key）
- diff 算法是前端热门话题，面试宠儿

概述

- diff 即对比，是一个广泛的概念，如 linux diff 命令、git diff 等
- 两个 js 对象也可以做 diff，如 https://github.com/cujojs/jiff
- 两棵树做 diff，如这里的 vdom diff

树 diff 的时间复杂度 O(n^3)

- 第一，遍历 tree1，第二，遍历 tree2
- 第三，排序
- 1000 个节点，要计算 1 亿次，算法不可用

优化时间复杂度到 O(n)

- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727123831.png)

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727123849.png)

总结

- 细节不重要，updateChildren 的过程也不重要，不要深究
- vdom 的核心概念很重要：h、vnode、patch、diff、key 等
- vdom 存在的价值更加重要：数据驱动视图，控制 DOM 操作

#### 模板编译

- 模板是 Vue 开发中最常用的部分，即与使用相关联的原理
- 它不是 html，有指令、插值、JS 表达式，那它到底是什么？
- 面试不会直接问，但会通过 “组件渲染和更新过程” 考察
- 前置知识：JS 的 with 语法
- Vue template compiler 将模板编译为 render 函数
- 执行 render 函数生成 vnode

with语法

- 改变 { } 内自由变量的查找规则，当作 obj 属性来查找
- 如果找不到匹配的 obj 属性，就会报错
- with 要慎用！因为它打破了作用域规则，易读性变差

```js
const obj = { name: 'test', gender: 'male' }
console.log(obj.name); // test
console.log(obj.gender); // male
console.log(obj.age); // undefined

// 使用with，能改变{}内自由变量的查找方式
// 将{}内自由变量，当作obj属性查找
with(obj) {
  console.log(name); // test
  console.log(gender); // male
  console.log(age); // 报错
}
```

编译模板

- 模板不是 html，有指令、插值、JS 表达式，能实现判断、循环
- html 是标签语言，只有 JS 才能实现判断、循环（图灵完备的）
- 因此，模板一定是转换为某种 JS 代码，即编译模板

```js
const compiler = require('vue-template-compiler')

const template = `<input type='text' v-model='name'>`

// 编译
const rst = compiler.compile(template)
console.log(rst.render)
```

- 模板编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack vue-loader，会在开发环境下编译模板（重要）

**Vue组件中使用render代替template**

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727152657.png)

- 讲完模板编译，再讲这个 render，就比较好理解了
- 在有些复杂情况下，不能使用 template，可以考虑用 render
- React 一直都用 render（没有模板），和这里一样

总结

- with 语法
- 模板到 render 函数，再到 vnode，再到渲染和更新
- Vue 组件可以用 render 代替 template

#### 组件渲染更新过程

- 一个组件渲染到页面，修改 data 触发更新（数据驱动视图）
- 其背后原理是什么，需要掌握哪些要点？
- 考察对流程了解的全面程度

回顾学过的知识

- 响应式：监听 data 属性 getter setter（包括数组）
- 模板编译：模板到 render 函数，再到 vnode
- vdom：patch(elem, vnode) 和 patch(vnode, newVnode)

组件渲染更新过程

- 初次渲染过程
- 更新过程
- 异步渲染

1. 初次渲染过程

   - 解析模板为 render 函数（或在开发环境已完成，vue-loader）

   - 触发响应式，监听 data 属性 getter（render函数中调用了 data，所以触发 getter），setter

     ![](https://gitee.com/gainmore/imglib/raw/master/img/20210727154800.png)

   - 执行 render 函数，生成 vnode，patch(elem, vnode)

2. 更新过程

   - 修改 data，触发 setter（此前在 getter 中已被监听）
   - 重新执行 render 函数，生成 newVnode
   - patch(vnode, newVnode)

流程图

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727154938.png)

3. 异步渲染（重要）

   - 回顾 $nextTick

     ![](https://gitee.com/gainmore/imglib/raw/master/img/20210727155719.png)

   - 汇总 data 的修改，一次性更新视图

   - 减少 DOM 操作次数，提高性能

总结

- 渲染和响应式的关系
- 渲染和模板编译的关系
- 渲染和vdom的关系

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727160055.png)



#### 前端路由原理

- 稍微复杂一点的 SPA，都需要路由
- vue-router 也是 vue 全家桶的标配之一
- 属于 “和日常使用相关联的原理”，面试常考

---

- 回顾 vue-router 的路由模式
- hash
- H5 history

**hash**

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727161420.png)

hash的特点

- hash 变化会触发网页跳转，即浏览器的前进、后退
- hash 变化不会刷新页面，这是 SPA 必需的特点
- hash 永远不会提交到 server 端（完全属于前端）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>hash test</title>
</head>
<body>
    <p>hash test</p>
    <button id="btn1">修改 hash</button>

    <script>
        // hash 变化，包括：
        // a. JS 修改 url
        // b. 手动修改 url 的 hash
        // c. 浏览器前进、后退
        window.onhashchange = (event) => {
            console.log('old url', event.oldURL)
            console.log('new url', event.newURL)

            console.log('hash:', location.hash)
        }

        // 页面初次加载，获取 hash
        document.addEventListener('DOMContentLoaded', () => {
            console.log('hash:', location.hash)
        })

        // JS 修改 url
        document.getElementById('btn1').addEventListener('click', () => {
            location.href = '#/user'
        })
    </script>
</body>
</html>
```

**H5 history**

- 用 url 规范的路由，但跳转时不刷新页面（SPA 必需特点）
- history.pushState
- window.onpopstate

正常页面浏览

- https://github.com/xxx 刷新页面
- https://github.com/xxx/yyy 刷新页面
- https://github.com/xxx/yyy/zzz 刷新页面

改造成 H5 history 模式

- https://github.com/xxx 刷新页面
- https://github.com/xxx/yyy 前端跳转，不刷新页面
- https://github.com/xxx/yyy/zzz 前端跳转，不刷新页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>history API test</title>
</head>
<body>
    <p>history API test</p>
    <button id="btn1">修改 url</button>

    <script>
        // 页面初次加载，获取 path
        document.addEventListener('DOMContentLoaded', () => {
            console.log('load', location.pathname)
        })

        // 打开一个新的路由
        // 【注意】用 pushState 方式，浏览器不会刷新页面
        document.getElementById('btn1').addEventListener('click', () => {
            const state = { name: 'page1' }
            console.log('切换路由到', 'page1')
            history.pushState(state, '', 'page1') // 重要！！
        })

        // 监听浏览器前进、后退
        window.onpopstate = (event) => { // 重要！！
            console.log('onpopstate', event.state, location.pathname)
        }

        // 需要 server 端配合，可参考
        // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    </script>
</body>
</html>
```

总结

- hash - window.onhashchange
- H5 history - history.pushState 和 window.onpopstate
- H5 history 需要后端支持

两者选择

- to B 的系统推荐使用 hash，简单易用，对 url 规范不敏感
- to C 的系统，可以考虑选择 H5 history，但需要服务端支持
- 能选择简单的，就别用复杂的，要考虑成本和收益

### Vue面试真题

#### 1.v-show和v-if区别

- v-show 通过控制 CSS 的 display 属性控制元素的显示和隐藏
- v-if 通过条件判断使组件真正渲染和销毁，而不是显示和隐藏
- v-show适用于频繁切换的场景，否则使用 v-if

#### 2.为何在v-for中用key

- 必须用 key，且不能是 index 或者 随机数
- diff 算法中通过 tag 和 key 来判断是否是 sameNode
- 减少渲染次数，提升渲染性能

#### 3.描述Vue组件生命周期（父子组件）

- 单组件生命周期图
- 父子组件生命周期关系

#### 4.Vue组件如何通讯（常见）

- 父子组件 props 和 $emit
- 自定义事件 event.$no  event.$off   event.$emit
- vuex

#### 5.描述组件渲染和更新过程

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727154938.png)

#### 6.双向数据绑定v-model实现原理

- input 元素的 value = this.name
- 绑定 input 事件 this.name = $event.target.value
- data 更新触发 re-render

#### 7.对MVVM的理解

#### 8.computed有何特点

- 缓存，data 不变不会重新计算
- 提高性能

#### 9.为何组件data必须是一个函数

- 如果是对象，所有实例都会共享这个 data
- 函数有单独的作用域，不会被共享

#### 10.ajax请求应该放在哪个生命周期

#### 11.如何将组件所有props传递给子组件

- $props
- <User v-bind="$props" />
- 细节知识点，优先级不高

#### 12.实现v-model

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727192705.png)

#### 13.多个组件有相同逻辑，如何抽离

- mixin
- 以及 mixin 的一些缺点

#### 14.何时要使用异步组件

- 加载大组件
- 路由异步加载

#### 15.何时需要使用keep-alive

- 缓存组件，不需要重复渲染
- 如多个静态 tab 页的切换
- 优化性能

#### 16.何时需要使用beforeDestroy

- 解绑自定义事件 event.$off
- 清除定时器
- 解绑自定义的 DOM 事件（addEventListener），如 window scroll 等

#### 17.作用域插槽

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727193113.png)

#### 18.Vuex中action和mutation有何区别

- action 中处理异步，mutation 不可以
- mutation 做原子操作
- action 可以整合多个 mutation

#### 19.vue-router常用的路由模式

- hash 默认
- H5 history（需要服务端支持）

#### 20.如何配置vue-router异步加载

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727193329.png)

#### 21.使用vnode描述一个DOM结构

![](https://gitee.com/gainmore/imglib/raw/master/img/20210727194446.png)

#### 22.监听data变化的核心API是什么

- Object.defineProperty
- 以及深度监听、监听数组
- 有何缺点

#### 23.Vue如何监听数组变化

- Object.defineProperty 不能监听数组变化
- 重新定义原型，重写 push、pop 等方法，实现监听
- Proxy 可以原生支持监听数组变化

#### 24.描述响应式原理

- 监听 data 变化
- 组件渲染和更新流程

#### 25.diff算法的时间复杂度

- O(n)
- 在 O(n^3) 基础上做了一些优化

#### 26.简述diff算法过程

- patch(elem, vnode) 和 patch(vnode, newVnode)
- patchVnode 和 addVnodes 和 removeVnodes
- updateChildren（key的重要性）

#### 27.Vue为何是异步渲染，$nextTick何用

- 异步渲染（以及合并 data 修改），以提高渲染性能
- $nextTick 在 DOM 更新完之后，触发回调

#### 28.Vue常见性能优化方式

- 合理使用 v-show 和 v-if
- 合理使用 computed
- v-for 时加 key，以及避免和 v-if 同时使用
- 自定义事件、DOM 事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深
- 使用 vue-loader 在开发环境做模板编译（预编译）
- webpack 层面的优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR

## Vue3

### 大纲

- vue3新功能
  - createApp
  - emits 属性
  - 多事件处理
  - Fragment
  - 移除 .sync 改为 v-model 参数
  - 异步组件的引用方式
  - 移除 filter
  - Teleport
  - Suspense
  - Composition API
    - reactive
    - ref toRef toRefs
    - readonly
    - computed
    - watch watchEffect
    - 钩子函数生命周期
- 原理
  - Proxy 实现响应式
  - 编译优化
    - PatchFlag 静态标记
    - hoistStatic 静态提升
    - cacheHandler 缓存事件
    - SSR 优化
    - Tree-shaking 优化
- Vite -- ES6 Module

### 面试题

- Vue3 比 Vue2 有什么优势？
- 描述 Vue3 生命周期
- 如何看待 Composition API 和 Options API？
- 如何理解 ref toRef 和 toRefs?
- Vue3 升级了哪些重要的功能?
- Composition API 如何实现代码逻辑复用?
- Vue3 如何实现响应式？
- watch 和 watchEffect 的区别是什么？
- setup 中如何获取组件实例？
- Vue3 为何比 Vue2 快？
- Vite 是什么？
- Composition API 和 React Hooks 的对比

### 1.Vue3 比 Vue2 有什么优势？

- 性能更好
- 体积更小
- 更好的 ts 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

### 2.描述 Vue3 生命周期

- Options API 生命周期
- Composition API 生命周期

Options API 生命周期

- beforeDestroy 改为 beforeUnmount
- destroyed 改为 unmounted
- 其他沿用 Vue2 的生命周期

```js
export default {
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {}, // 等于beforeDestroy
    unmounted() {} // 等于destroyed
}
```

Composition API 生命周期

- 钩子函数不再以选项的形式插入，而是整合到一个 setup 函数中

```js
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue'

export default {
    // 等于 beforeCreate 和 created
    setup() {
		onBeforeMount(() => {}), // 参数为一个函数
         onMounted(() => {}),
         onBeforeUpdate(() => {}),
         onUpdated(() => {}),
         onBeforeUnmount(() => {}),
         onUnmounted(() => {})
    }
}
```

### 3.如何看待 Composition API 和 Options API？

Composition API 带来了什么

- 更好的代码组织

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210728161525.png)

- 更好的逻辑复用

- 更好的类型推导

  ```js
  // vue2
  {
      data() {
          return {
              a: 10
          }
      },
      methods: {
          fn() {
              const a = this.a // 通过this调用data
          }
      },
      mounted() {
          this.fn() // 通过this调用methods
      }
  }
  ```

两者如何选择？

- 不建议公用，会引起混乱
- 小型项目、业务逻辑简单，用 Options API
- 中大型项目、逻辑复杂，用 Composition API

别误解 Composition API

- Composition API 属于高阶技巧，不是基础必会
- Composition API 是为解决复杂业务逻辑而设计
- Composition API 就像 Hooks 在 React 中的地位

### 4.如何理解 ref、toRef 和 toRefs?

ref

- 生成值类型的响应式数据
- 可以用于模板和 reactive
- 通过 .value 修改值

```vue
<template>
	<p>
    	age: {{ ageRef }}
        name: {{ state.name }}
    </p>
</template>

<script>
import { ref, reactive } from 'vue'
    
export default {
    name: 'Ref',
    setup() {
        const ageRef = ref(18) // 值类型，响应式
        const nameRef = ref('John')
        const state = reactive({ // 用于reactive
            name: nameRef
        })
        
        setTimeout(() => {
            ageRef.value = 20 // 通过 .value 修改值
            nameRef.value = 'Jack'
        }, 1500)
        
        return {
            ageRef,
            state
        }
    }
}
</script>
```

toRef

- 针对一个响应式对象（reactive 封装）的 prop
- 创建一个 ref，具有响应式
- 两者保持引用关系

```js
setup() {
    const state = reactive({ // 封装成响应式对象
        age: 20,
        name: 'John'
    })
    
    // toRef 如果用于普通对象（非响应式对象），则不具备响应式
    // const state = {
    //     age: 20,
    //     name: 'John'
    // }
    
    const ageRef = toRef(state, 'age')
    
    setTimeout(() => { // 修改state的age属性会影响到ageRef
        state.age = 25
    }, 2000)
    
    setTimeout(() => { // 修改ageRef会影响到state的age属性
        ageRef.value = 30
    }, 3000)
    
    return {
	    state,
        ageRef
    }
}

// 总结：
// 1. 要让一个普通对象变成响应式，则使用 reactive
// 2. 要让一个reactive对象的属性变成响应式，则使用 toRef
```

toRefs

- 将响应式对象（reactive 封装）转换为普通对象
- 对象的每个 prop 都是对应的 ref，都具有响应式
- 两者保持引用关系

```js
setup() {
    const state = reactive({
        age: 20,
        name: 'John'
    })
    const stateAsRefs = toRefs(state) // 将响应式对象转换成普通对象
    
    // const { age: ageRef, name: nameRef } = stateAsRefs
    // return {
    //    ageRef,
    //    nameRef
    // }
    
    setTimeout(() => {
        state.age = 15
    }, 1500)
    
    return stateAsRefs // 模板中直接通过属性名调用，且具有响应式（j）
}
```

最佳使用方式

- 用 reactive 做对象的响应式，用 ref 做值类型响应式

- setup 中返回 toRefs(state)，或者 toRef(state, 'xxx')

- ref 的变量命名都用 xxxRef

- 合成函数返回响应式对象时，使用 toRefs

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210728230057.png)

为何需要 ref？

- 返回值类型，会丢失响应式

  Vue3 响应式基于 Proxy，而 Proxy 对于值类型数据无能为力，所以要通过 ref() 封装，实现值类型数据的响应式。

- 如在 setup、computed、合成函数，都有可能返回值类型

- Vue 如不定义 ref，用户将自造 ref，反而混乱

为何需要 .value？

- ref 是一个对象（不丢失响应式），.value 存储值

  ```js
  // 错误
  function computed(getter) {
      let value
      setTimeout(() => {
  		value = getter()
      }, 1500)
      return value
  }
  let a = computed(() => 100) // 返回的是一个值类型，所以异步操作之后，value的修改不会影响到a
  
  // 正确
  function computed(getter) {
      const ref = {
  		value: null
      }
      setTimeout(() => {
          ref.value = getter()
      })
      return ref
  }
  let b = computed(() => 100) // 返回的是一个ref对象，b与ref共用同一个地址，异步操作对value的修改会影响到b
  ```

- 通过 .value 属性的 get 和 set 实现响应式

  因为值类型不支持响应式，所以要将值类型封装成一个 ref 对象，如果直接对这个 ref 对象进行引用或者赋值操作，不会触发 get 或 set，所以必须有一个 .value 属性，用于实现 get 和 set。

- 用于模板、reactive 时，不需要 .value，其他情况都需要

为何需要 toRef 和 toRefs？

- 初衷：不丢失响应式的情况下，把对象数据分解 / 扩散
- 前提：针对的是响应式对象（reactive 封装的），而非普通对象
- 注意：不创造响应式，而是延续响应式（ref、reactive用于创造响应式，而toRef、toRefs用于延续响应式）

```js
function useFeatureX() {
    const state = reactive({
        x: 1,
        y: 2
    })
    return toRefs(state) // 解构出state所有属性
    // return toRef(state, 'x') // 解构出state单个属性
}

export default {
    setup() {
        const { x, y } = useFeatureX()
        // const x = useFeatureX()
    }
}
```

### 5.Vue3 升级了哪些重要的功能?

createApp

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729092448.png)

emits 属性

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729092523.png)

生命周期

- beforeDestroy  -->  onBeforeUnmount
- destroyed  -->  onUnmounted

多事件

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729092742.png)

Fragment

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729092813.png)

移除 .sync

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729092944.png)

异步组件的写法

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729093001.png)

移除 filter

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729093056.png)

Teleport

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729093126.png)

Suspense

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729093157.png)

Composition API

- reactive
- ref、toRef、toRefs
- readonly
- watch 和 watchEffect
- setup
- 生命周期钩子函数

### 6.Composition API 如何实现代码逻辑复用?

- 抽离逻辑代码到一个函数
- 函数命名约定为 useXxx 格式（React Hooks 也是）
- 在 setup 中引用 useXxx 函数

```js
// useMousePosition.js
import { onMounted, onUnmounted } from 'vue'
export default function useMousePosition() {
    const x = ref(0)
    const y = ref(0)
    
    function update(e) {
        x.value = e.pageX
        y.value = e.pageY
    }
    
    onMounted(() => {
        console.log('useMousePosition mounted')
        window.addEventListener('mousemove', update)
    })
    
    onUnmounted(() => {
        console.log('useMousePosition unMounted')
        window.removeEventListener('mousemove', update)
    })
    
    return {
        x,
        y
    }
}

// index.vue
<template>
	<p>mouse position {{ x }} {{ y }}</p>    
</template>

<script>
import useMousePosition from './useMousePosition.js'   
export default {
    setup() {
        const { x, y } = useMousePosition()
        return {
            x,
            y
        }
    }
}
</script>
```

### 7.Vue3 如何实现响应式？

- Object.defineProperty()

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210729152214.png)

- Proxy 基本使用

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210729152321.png)

- Reflect 作用

  - 和 Proxy API 一一对应，比如 set、get、has、deleteProperty
  - 规范会、标准化、函数式
  - 替换掉 Object 上的工具函数，比如 `Object.getOwnPropertyNames()`  -->  `Reflect.ownKeys()`

使用 Proxy 实现响应式

。。。

### 8.[.sync] --> [v-model]

.sync

.sync 其实是一个语法糖，当我们需要向一个子组件传递数据时，我们希望子组件对这个数据的修改也会触发父组件数据的更新，通常会如下做：

```vue
<child-component :title='pageTitle' @update:title='pageTitle = $event'></child-component>
```

而在 Vue2 中提供了一个语法糖，也就是 .sync：

```vue
<child-component :title.sync='pageTitle'></child-component>
```

在 Vue3 中，.sync 已被替换成 v-model 的形式，上述代码可以写成：

```vue
<child-component v-model:title='pageTitle'></child-component>
```

### 9.watch 和 watchEffect 的区别是什么？

- 两者都可监听 data 属性的变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性，自动监听其变化

watch

```js
setup() {
    const numRef = ref(100)
    const state = reactive({
        name: 'John',
        age: 20
    })
    
    // 监听ref
    watch(
    	numRef, // 1.监听的值
        (newNum, oldNum) => { // 2.回调函数
            console.log(newNum, oldNum)
        },
        { // 3.配置项（可选）
            immediate: true // 初始化之前就监听
        }
    )
    setTimeout(() => {
        numRef.value = 200
    }, 1500)
    
    // 监听对象的属性
    watch(
        () => state.age,
        (newAge, oldAge) => {
            console.log(newAge, oldAge)
        },
        {
            immediate: true, // 初始化之前就监听
            deep: true // 深度监听，当监听的是一个对象或数组时
        }
    )
    setTimeout(() => {
        state.age = 25
        state.name = 'Jack'
    }, 2000)
}
```

watchEffect

与 watch 不同，watchEffect 不需要指定监听的属性，只要在回调函数中引用了属性，就会监听该属性。

```js
watchEffect(() => {
    // 初始化时，一定会执行一次（收集要监听的数据）
    console.log('Hello World')
})
watchEffect(() => {
    console.log(state.age) // 只要在回调函数中引用了该属性，就会监听该属性
    console.log(state.name) // 只要在回调函数中引用了该属性，就会监听该属性
})
setTimeout(() => {
    state.age = 25
    state.name = 'john'
}, 1500)
```

### 10.setup中如何获取组件实例

- 在 setup 和其他 Composition API 中没有 this
- 可以通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this

```js
import { onMounted, getCurrentInstance } from 'vue'
export default {
    setup() {
        console.log(this) // undefined
        
        onMounted(() => {
            console.log(this) // undefined
        })
        
        const instance = getCurrentInstance()
        console.log(instance) // Vue{}
    }
    mounted() {
        console.log(this) // Vue{}
    }
}
```

### 11.Vue3 为何比 Vue2 快？

- Proxy 响应式
- PatchFlag
- hoistStatic
- cacheHandler
- SSR 优化
- tree-shaking

PatchFlag

测试网站：https://vue-next-template-explorer.netlify.app/

- 编译模板时，**动态节点**做标记，静态节点不做标记

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210729172525.png)

- 标记，分为不同的类型，如 TEXT PROPS

- diff 算法时，可以区分静态节点以及不同类型的动态节点

![](https://gitee.com/gainmore/imglib/raw/master/img/20210729172350.png)

hoistStatic

- 将静态节点的定义，提升到父作用域，缓存起来

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210730141732.png)

- 多个相邻的静态节点，会被合并起来

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210730141912.png)

- 典型的拿空间换时间的优化策略

cacheHandler

- 缓存事件

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210730142844.png)

SSR 优化

- 静态节点直接输出，绕过 vdom

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210730143256.png)

- 动态节点，还是需要动态渲染

tree shaking

- 编译时，根据不同的情况，引入不同的 API

  ![](https://gitee.com/gainmore/imglib/raw/master/img/20210730143427.png)

### 12.Vite 是什么？

Vite 是什么？

- 一个前端打包工具，Vue 作者发起的项目
- 借助 Vue 的影响力，发展较快，和 Webpack 竞争
- 优势：开发环境下无需打包，启动快

Vite 为何启动快？

- 开发环境使用 ES6 Module，无需打包 --- 非常快

  ```html
  <body>
      <script type='module'>
      	import add from './src/add.js'
         	const rst = add(10, 20)
          console.log(rst)
      </script>
  </body>
  ```

- 生产环境使用 rollup，并不会快很多

### 13.Composition API 和 React Hooks 的对比



## Webpack

- webpack 已是前端打包构建的不二选择
- 每日必用，面试必考
- 成熟的工具，重点在于配置和使用，原理并不高优

### 大纲

- 基本配置
- 高级配置
- 优化打包效率
- 优化产出代码
- 构建流程概述
- babel

### 面试题

1. 前端代码为何要进行构建和打包？
2. module、chunk、bundle 分别什么意思，有何区别？
3. loader 和 plugin 的区别？
4. webpack 如何实现懒加载？
5. webpack 常见性能优化
6. babel-runtime 和 babel-polyfill 的区别

### 关于webpack5

- webpack5 主要是内部效率的优化
- 对比 webpack4，没有太多使用上的改动
- 可以直接使用 webpack5 学习课程

```markdown
升级 webpack5 以及周边插件后，代码需要做出的调整：
- package.json 的 dev-server 命令改为：`"dev": "webpack serve --config build/webpack.dev.js"`
- webpack5: `const { merge } = require('webpack-merge')`
- webpack5: `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
- `module.rules` 中 `loader: ['xxx-loader']` 改为：`use: ['xxx-loader']`
- `filename: 'bundle.[contenthash:8].js'` 其中 `h` 为小写，不能为大写
```

### webpack基本配置

拆分配置和 merge

- 分出三个文件 `webpack.common.js`、`webpack.dev.js`、`webpack.prd.js`
- 使用插件合并代码

启动本地服务

- webpack-dev-server

- 设置代理，处理跨域请求

  ```js
  // 设置代理
  proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',
      
      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
          target: 'http://localhost:3000',
          pathRewrite: {
              '/api2': ''
          }
      }
  }
  ```

处理 ES6

- css-loader：解析 css 文件，处理 css 的引用关系
- style-loader：将 css 语句插入到 head 标签里的 style 标签中
- postcss-loader：添加一些 css 属性前缀，提高兼容性
- less-loader：解析 less 语法

```js
// webpack.config.js
{
    test: /\.css$/,
    // loader 执行顺序为：从后往前
    loader: ['style-loader', 'css-loader', 'postcss-loader']
},
{
    test: /\.less$/,
    loader: ['style-loader', 'css-loader', 'less-loader']
}

// postcss.config.js
module.exports = {
    plugins: [require('autoprefixer')]
}
```

处理图片

- url-loader

```js
// webpack.prd.js
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然沿用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,
            
            // 打包到 img 目录下
            outputPath: '/img1/',
        }
    }
}
```

### webpack高级配置

- 基本配置只能做 demo，不能做线上项目
- 面试考察基本配置，只是为了快速判断你是否用过 webpack
- 以下高级配置，也是通过面试的必要条件

多入口配置

```js
// 配置多个 entry
...

// 多入口 - 生成 index.html
new HtmlWebpackPlugin({
    template: ,
    filename: 'index.html',
    // chunks 表示该页面要引用哪些 chunk
    chunks: ['index'] // 只引用 index.js
})

// 多入口 - 生成 other.html
new HtmlWebpackPlugin({
    template: ,
    filename: ,
    chunks: ['other'] // 只引用 other.js 
})
```

抽离 CSS 文件

- 开发环境下，一般不会分割压缩 CSS 文件，直接使用 style-loader 插入到 style 标签中即可
- 生产环境下，为提高用户体验，会分割压缩 CSS 文件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// webpack.prd.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再使用 style.loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 这里不再使用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserWebpackPlugin({}), new OptimizeCssAssetsPlugin({})]
    }
}
```

抽离公共代码

- Code Splitting
- 之前的笔记

懒加载

```js
// 引入动态数据 - 懒加载
setTimeout(() => {
    import('./xxx.js').then(res => {
        console.log(res.default.message) // 注意这里的 default
    })
})
```

处理 JSX

- 安装 `@babel/preset-react`

- 配置 `.babelrc`

  ```js
  {
      "presets": ["@babel/preset-react"],
      "plugins": []
  }
  ```

处理 Vue

- 安装 `vue-loader`

- 添加配置：

  ```js
  {
      test: /\.vue$/,
      loader: ['vue-loader']
  }
  ```

### webpack基本概念

module、chunk、bundle 区别

- module - 各个源码文件，webpack 中一切皆模块

  ```js
  import test from './test.js' // 模块
  import './style.css' // 模块
  import './image.png' // 模块
  ```

- chunk - 多模块合并成的（代码块），如 entry、import()、splitChunk

  ```js
  entry: {
      index: path.join(srcPath, 'index.js'), // chunk
      other: path.join(srcPath, 'other.js')  // chunk
  }
  
  // 定义 chunk
  import('./xxx.js').then(rst => {
      console.log(rst.default.message)
  })
  
  cacheGroups: {
      vendor: { // chunk
          ...
      },
      common: { // chunk
          ...
      }
  }
  ```

- bundle - 最终输出的文件

![](https://gitee.com/gainmore/imglib/raw/master/img/20210731101526.png)

### webpack性能优化

- 大厂必考 + 社区热议话题
- 优化打包构建速度 - 开发体验和效率
- 优化产出代码 - 产品性能

#### 构建速度

1. 优化 babel-loader
2. IgnorePlugin
3. noParse
4. happyPack
5. ParallelUglifyPlugin
6. 自动刷新
7. 热更新
8. DllPlugin



优化 babel-loader（可用于生产环境）

```js
{
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], // 开启缓存
    include: path.resolve(__dirname, 'src'), // 明确范围
    // 排除范围，include 和 exclude 两者选一即可
    // exclude: path.resolve(__dirname, 'node_modules')
}
```



IgnorePlugin 避免引入无用模块（可用于生产环境）

- 比如 `import moment from 'moment'`
- 默认会引入所有语言 JS 代码，代码过大
- 如何只引入中文？

1. 忽略某些文件

   ![](https://gitee.com/gainmore/imglib/raw/master/img/20210731104512.png)

2. 手动引入相关模块

   ![](https://gitee.com/gainmore/imglib/raw/master/img/20210731104542.png)



noParse 避免重复打包（可用于生产环境）

```js
module.exports = {
    module: {
        // 对完整的 `react.min.js` 文件就没有采用模块化
        // 忽略 `react.min.js` 文件的递归解析处理
        noParse: [/react\.min\.js$],
    }
}
```

IgnorePlugin vs noParse

- IgnorePlugin 直接不引入，代码中没有
- noParse 引入，但是不打包



happyPack 多进程打包（可用于生产环境）

- JS 单线程，开启多进程打包
- 提高构建速度（特别是多核 CPU）
- 一般用于生产环境下

```js
const HappyPack = require('happypack')

module.exports = {
    rules: [
        {
            test: /\.js$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例处理
            use: ['happypack/loader?id=babel']
        }
    ],
    plugins: [
        // happyPack 开启多进程打包
        new HappyPack({
            // 用唯一的标识符 id 来代替当前 HappyPack
            id: 'babel',
            // 如何处理 .js 文件，用法和 loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
        })
    ]
}
```



ParallelUglifyPlugin 多进程压缩 JS（用于生产环境）

- webpack 内置 Uglify 工具压缩 JS
- JS 单线程，开启多进程压缩更快
- 和 happyPack 同理
- 用于生产环境，开发环境不需要压缩 JS

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
new ParallelUglifyPlugin({
    // 传递给 UglifyJS 的参数
    // 还是使用 UglifyJS压缩，只不过帮助开启了多进程
    uglifyJS: {
        output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
        },
        compress: {
            // 删除所有的 `console` 语句，可以兼容 IE 浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
        }
    }
})
```



关于开启多进程

- 项目较大，打包较慢，开启多进程可以提高打包速度
- 项目较小，打包很快，开启多进程反而会降低速度（因为有进程开销）
- 按需使用



自动刷新（不用于生产环境）

- 用于开发环境，自动刷新浏览器
- 很少用到，一般会使用 devServer，了解即可

```js
module.export = {
    watch: true, // 开启监听，默认为 false
    // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器！！！
    
    // 监听配置
    watchOptions: {
        ignored: /node_modules/, // 忽略哪些文件
        // 监听到变化发生后，会等 300ms 再去执行动作，防止文件更新太快导致重新编译频率太高
        aggregateTimeout: 300, // 默认为 300ms
        // 判断文件是否发生变化是否变化是通过不停地询问系统指定文件有没有变化实现的
        poll: 1000, // 默认每隔 1000ms 询问一次
    }
}
```



热模块更新（HMR）（不用于生产环境）

- 自动刷新：整个网页全部刷新，状态会丢失，速度较慢
- 热更新：新代码生效，网页不刷新，状态不丢失（用于开发环境）

```js
// webpack.dev.js
const webpack = require('webpack')
...
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true, // 1.开启热模块更新
    hotOnly: true // 2.即使HMR不生效，浏览器也不会自动刷新
  },
  plugins: [
    ...
    new webpack.HotModuleReplacementPlugin() // 3.必要的插件
  ]
```

但是，开启 HMR 也是有缺陷的。我们需要手动去配置一个监听范围，在监听范围之内的修改会触发热更新，不会对数据进行重新加载，而在监听范围之外的修改则会导致页面数据的重新加载。

```js
const sumRes = sum(10, 50)
console.log('sumRes', sumRes)

// 增加，开启热更新之后的代码逻辑
if (module.hot) { // 如果开启了热更新
    module.hot.accept(['./math'], () => { // 设置监听范围，'./math'即为监听范围
        // 当 './math' 中代码修改后，会进入该回调函数中，执行以下代码
        const sumRes = sum(10, 20)
        console.log('sumRes in hot', sumRes)
    })
}

// './math' 文件之外的修改不会触发热更新，会导致页面重新加载。
```

因此，热更新的实现是有成本的。（修改 CSS 样式会自动触发热更新而不需要进行配置，这是因为 css-loader 底层实现了热更新的封装，不需要我们进行配置了）



DllPlugin 动态链接库插件（不用于生产环境）

- 前端插件如 Vue React，体积大，构建慢
- 但它们较稳定，不常升级版本
- 同一个版本只构建一次即可，不用每次都重新构建

- webpack 已内置 DllPlugin 支持
- DllPlugin - 打包出 dll 文件
- DllReferencePlugin - 使用 dll 文件

`webpack.dll.js`

```js
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'development',
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
```

`webpack.config.js`

```js
// 1.将dll文件注入到html-plugin中，即在index.html中引入dll文件，使浏览器能通过全局变量vendors访问模块
new AddAssetHtmlWebpackPlugin({ 
    filepath: path.resolve(__dirname, 'dll/vendors.dll.js'),
}),
// 2.依赖映射文件，当打包项目时，不分析在dll中的第三方模块，以此提升打包速度
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'dll/vendors.manifest.json'),
}),
```



#### 产出代码

- 体积更小
- 合理分包，不重复加载
- 速度更快、内存使用更少

优化方式

1. 小图片 base64 编码
2. bundle 加 hash
3. 懒加载
4. 提取公共代码
5. IgnorePlugin
6. 使用 CDN 加速
7. 使用 production
8. Scope Hoisting



CDN 加速

```js
output: {
    ...
    publicPath: 'http://cdn.abc.com' // 1. 添加 cdn 网站前缀
}

// 2. 将 JS 文件、CSS 文件、图片等资源上传到对应的 CDN 服务器上
```



使用 production

- 自动开启代码压缩
- Vue React 等框架会自动删掉调试代码（如开发环境的 warning）
- 启动 Tree-Shaking
  - 使用 ES Module 的方式引入模块才能使 tree-shaking 生效
  - 使用 CommonJS 的方式引入模块不行

为什么 CommonJS 不能使 Tree-Shaking 生效？

- ES6 Module 和 CommonJS 区别

  - ES Module 静态引入，编译时引入
  - CommonJS 动态引入，执行时引入
  - 只有 ES Module 才能静态分析，实现 Tree-Shaking

- 动态引入和静态引入

  ```js
  // 动态引入
  const apiList = require('../config/api.js')
  if (isDev) {
      // 可以动态引入，执行时引入
      apiList = require('../config/api_dev.js')
  }
  
  // 静态引入
  import apiList from '../config/api.js'
  if (isDev) {
      // 编译时报错，只能静态引入
      import apiList from '../config/api_dev.js'
  }
  ```

  

Scope Hoisting

- 即作用域提升
- 使代码体积更小
- 创建函数作用域更少
- 代码可读性更好

![](https://gitee.com/gainmore/imglib/raw/master/img/20210731171209.png)

![](https://gitee.com/gainmore/imglib/raw/master/img/20210731171230.png)

开启 Scope Hoisting

![](https://gitee.com/gainmore/imglib/raw/master/img/20210731171250.png)



### babel

- 前端开发环境必备工具
- 同 webpack，需要了解基本的配置和使用
- 面试考察概率不高，到要求必会

环境搭建 + 基本配置

- 环境搭建

- `.babelrc` 配置

- presets 和 plugins

  presets，即预设，它是 Babel 插件的组合，解析一个 ES6 语法对应一个插件，而 ES6 中包含很多语法，所以就对应许多插件，如果手写这些插件就十分麻烦，所以将这些插件组合到一起行程了一个预设，如 `@babel/preset-env`。



babel-polyfill

- 什么是 Polyfill

  - polyfill 意为垫片，相当于补丁，提高兼容性

  - 比如，一个新的数组 API ：`includes`，使用 `[1, 2, 3].includes(1)` 的形式符合 ES5 的语法规范，但是 ES5 却没有 `includes` 这个 API，而 polyfill 就是能够处理这些新的 API 的一种补丁

    ```js
    import '@babel/polyfill'
    
    const sum = (a, b) => a + b
    
    // 新的API
    Promise.resolve(100).then(data => data)
    
    // 新的API
    [10, 20, 30].includes(20)
    
    // 这些新的 API 在语法上都符合 ES5 的规范，但是 ES5 却没有这些 API，所以要使用 polyfill 实现兼容
    // 注意，polyfill 不会处理模块化（即import导入），处理模块化是 webpack 的任务
    ```

    

- core-js 和 regenerator

  - core-js 是包含绝大部分 polyfill 的集合，比如处理 `Promise`、`includes` 等 API 的 polyfill，但却不包含处理 ES6 中 Generator 的 polyfill
  - 而 regenerator 则是处理 Generator 的 polyfill 的集合

- babel-polyfill 即为两者的集合

babel-polyfill 现已被弃用

- Babel7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator
- 但这并不影响面试会考察它

babel-polyfill 按需引入

- babel-polyfill 整个文件较大
- 只有一部分功能，无需全部引入
- 配置按需引入

1. 配置

   ```json
   // .babelrc
   {
       "presets": [
           [
               "@babel/preset-env",
               {
                   "useBuiltIns": "usage", // 按需引入
                   "corejs": 3 // core-js的版本号
               }
           ]
       ],
       "plugins": []
   }
   ```

2. 不需要在项目使用 `import '@babel/polyfill'` 引入了 

babel-runtime

使用上面的 babel-polyfill 会带来一些问题：

- 会污染全局环境

  比如 `Promise` 和 `includes` 这两个 API，实际上 babel-polyfill 是向 `window` 和 `Array.prototype` 添加了变量：

  ```js
  // 污染全局变量
  window.Promise = function(){}
  Array.prototype.includes = function(){}
  ```

- 如果要做一个独立的 web 系统，则污染全局变量也没有什么关系

- 但如果要做一个第三方 lib，则会带来问题，因为开发者可能已经使用了这些 API 的变量名

要解决污染全局变量这个问题，就需要使用另一个工具了 --- `babel-runtime`：

```js
// .babelrc
{
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```



### 1.前端为何要进行打包和构建？

- 产出代码层面：
  - 体积更小（Tree-Shaking、压缩、合并），加载更快
  - 编译高级语言或语法（TS、ES6+、模块化、SCSS）
  - 兼容性和错误检查（Polyfill、postcss、ESlint）
- 研发流程层面
  - 统一、高效的开发环境
  - 统一的构建流程和产出标准
  - 集成公司构建规范（提测、上线等）

### 2.module、chunk、bundle区别

- module - 各个源码文件，webpack 中一切皆模块
- chunk - 多个模块合并而成，如 entry、import()、splitChunk
- bundle - 最终的输出文件

### 3.loader和plugin的区别

- loader 模块转换器，将不同文件格式转换成 webpack 可以识别的格式，如 css -> js、less -> css
- plugin 扩展插件，在 webpack 的生命周期中做什么事情，如 HtmlWebpackPlugin 在打包完成后生成 html 文件

### 4.常见的loader和plugin有哪些

- https://www.webpackjs.com/loaders/
- https://www.webpackjs.com/plugins/

### 5.babel和webpack的区别

- babel - JS 新语法编译工具，不关心模块化
- webpack - 模块打包构建工具，是多个 loader 和 plugin 的集合

### 6.如何产出一个lib

- 参考 webpack.dll.js

- output.library

  ```js
  output: {
      // lib 的文件名
      filename: 'lodash.js',
      // 输出 lib 到 dist 目录下
      path: distPath,
      // lib 的全局变量名
      library: 'lodash'
  }
  ```

### 7.babel-polyfill和babel-runtime的区别

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-runtime

### 8.webpack如何实现懒加载

- import()
- 结合 Vue、React 异步组件
- 结合 vue-router、react-router 异步加载路由

### 9.为何Proxy不能被Polyfill?

- 如 `Class` 可以用 `function` 模拟
- 如 `Promise` 可以用 `callback` 来模拟
- 但 `Proxy` 功能却无法用 `Object.defineProperty` 来模拟

### 10.webpack性能优化

- webpack 优化构建速度
  - 可用于生产环境
    - 优化 babel-loader
    - IgnorePlugin
    - noParse
    - happyPack
    - ParallelUglifyPlugin
  - 不用于生产环境
    - 自动刷新
    - 热更新
    - DllPlugin
- webpack 优化产出代码
  - 小图片 base64 编码
  - bundle 加 hash
  - 懒加载
  - 提取公共代码
  - 使用 CDN 加速
  - IgnorePlugin
  - 使用 production
  - Scope Hoisting



## 项目设计

组件和状态设计

- 框架（Vue React）的使用（和高级特性）是必要条件
- 能独立负责项目，还是需要别人带着？--- 考察设计能力
- 面试必考（二面/三面），场景题

考察重点

- 数据驱动视图
- 状态：数据结构设计（React - state，Vue - data）
- 视图：组件结构和拆分

回顾面试题

- React 设计 TodoList（组件结构，redux state 数据结构）
- Vue 设计购物车（组件结构，vuex state 数据结构）

### React设计TodoList

state 数据结构设计

- 用数据描述所有的内容
- 数据要结构化，易于程序操作（遍历、查找）
- 数据要可扩展，以便增加新的功能

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802101419.png)

组件设计原则

- 从功能上拆分层次
- 尽量让组件原子化
- 容器组件只管理数据，UI 组件只显示视图

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802102437.png)

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802102447.png)

### Vue 设计购物车

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802110125.png)

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802110156.png)

组件设计原则

- 从功能上拆分层次
- 尽量让组件原子化
- 容器组件只管理数据，UI 组件只显示视图

<img src="https://gitee.com/gainmore/imglib/raw/master/img/20210802110311.png"/>

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802110356.png)

## 项目流程

- 项目分多人、多角色参与
- 项目分多阶段
- 项目需要计划和执行

为何考察项目流程？

- 确定你真正参与过实际项目（而不是个人项目、毕业设计等）
- 确定你能真正解决项目的问题
- 看你能否独立承担起一个项目（作为项目负责人）

看几个面试题

- PM（Product Manager）想在项目开发过程中增加需求，该怎么办？
- 项目即将延期了，该怎么办？
- 你将如何保证项目质量？

如何讲解？

- 项目的所有角色
- 项目的全流程
- 各个阶段中的常见问题

项目角色

- PM 产品经历
- UE 视觉设计师
- FE 前端开发
- RD 后端开发
- CRD 移动端开发
- QA 测试人员

完整项目流程

![](https://gitee.com/gainmore/imglib/raw/master/img/20210802143722.png)