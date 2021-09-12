## 参考资料

- https://juejin.cn/post/6856706569263677447

## 实现原理

axios 的基本实现主要靠两个类：Axios 和 InterceptorsManager。
Axios 在初始化的时候会创建一个 interceptors 对象，对象会有两个属性： request 和 response。
这两个属性对应的是 InterceptorsManager 实例，分别表示请求拦截器和响应拦截器。一个拦截器实例里面会有一个 use 方法，这个方法需要传入两个回调函数，第一个是成功回调，表示请求之前或者得到响应时应该做什么，第二个是失败回调。调用 use 方法可以向拦截器中添加这些回调函数。
Axios 里还有一个 request 方法，这个方法里面维护了一个队列，调用这个方法的时候，会将请求拦截器中的回调函数插入到队列前面，然后将响应拦截器的回调函数插入到队列后面，中间的是发送异步请求的函数。
之后，在 request 中，会将 config 配置项封装到一个 promise 中，然后遍历队列，每次从队列中取出前两个回调函数作为 promise.then 的两个参数传入到 promise 实例中，以此不断更新 config，直到队列为空。
