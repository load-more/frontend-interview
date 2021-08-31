### script加载的三种方式

![](https://gitee.com/gainmore/imglib/raw/master/img/20210820202427.png)



1. 直接插入 script
   - 解析 html 文档时如果碰到 script 标签，会暂停 html 的解析，然后加载 script 脚本，加载完成之后就立即执行里面的代码，执行完成之后继续 html 的解析
2. async
   - 如果给 script 标签设置了 async 属性，那么 html 文档的解析会和 script 脚本的加载并行执行，当 script 脚本加载完成之后，会立即执行里面的代码同时停止 html 的解析，当执行完成后继续接卸 html；
   - 因为带有 async 的脚本加载完成后就立即执行，所以多个带有 async 的脚本不能保证加载的先后顺序，谁先加载完，谁就先执行。
3. defer
   - 给 script 设置 defer 属性，那么 html 文档的解析和 script 的加载并行执行，当 script 脚本加载完之后，不会立即执行里面的代码，而是等到 html 解析完成之后，在执行脚本的代码；
   - defer 可以保证多个脚本之间的执行顺序。