# FE-Interview

## 计算机网络

### HTTP协议

#### 1. GET和POST的请求的区别

`幂缓报安长参`

- 应用场景：GET请求是幂等请求，不会对服务器资源产生影响；POST请求不是幂等请求，会对服务器资源产生影响。
- 是否缓存：浏览器一般会对GET请求进行缓存，不会对POST请求缓存。
- 报文格式：GET请求中报文的主体部分为空，而POST请求中报文主体部分是要向服务器发送的数据。
- 安全性：GET请求和POST请求相比更不安全，因为参数会暴露在url中。
- 参数长度：GET请求参数长度有限制，因为浏览器对url的长度有限制。
- 参数类型：POST请求支持更多的参数类型。

#### 2. POST和PUT请求的区别

- POST请求可以理解为“创建数据”，会对服务器资源产生影响，增加数据的种类。
- PUT请求可以理解为“更新数据”，不会增加数据的种类，只是修改数据的内容。

#### 3. 常见的HTTP请求头和响应头

Request Header:

- Connection：连接类型（keep-alive，close）
- Cookie
- Origin：请求所在的域
- Host：服务器的域名
- Referer：请求页面的 URL
- User-agent
- if-modified-since
- if-none-match

Response Header:

- Connection
- Content-type
- Expires
- Cache-control
- Last-modified
- Etag

#### 4. HTTP状态码304是多好还是少好



#### 5. 常见的HTTP请求方法

- GET
- POST
- DELETE
- PUT
- HEAD
- OPTIONS
- CONNECT
- TRACE

#### 6. options请求方法及使用场景

- 用于获取服务器上所支持的所有HTTP请求方法
- 用于检查请求权限

#### 7. HTTP 1.0和 HTTP 1.1 之间有哪些区别？

`连资缓浩钦`

- 连接。HTTP1.0默认使用非持久连接，HTTP1.1默认使用持久连接，通过持久连接使得多个HTTP请求复用同一个TCP连接，避免了非持久连接每次都需要建立连接带来的时延。
- 资源请求。HTTP1.1新增了range请求头，运行请求资源的某个部分，对应的状态码为206（Partical Content），充分利用了带宽。
- 缓存。HTTP1.0使用请求头中的 If-Modified-Since、Expires 控制缓存，而HTTP1.1新增了许多缓存控制策略，比如 Etag、If-unmodified-Since、If-Match、If-None-Match。
- Host。HTTP1.1新增了host，指定服务器的域名。
- 请求方法。HTTP1.1新增了很多请求方法，PUT、HEAD、OPTIONS等。

#### 8. HTTP 1.1和 HTTP 2.0 的区别

#### 9. HTTP和HTTPS协议的区别

#### 10. GET方法URL长度限制的原因

#### 11. 当你在浏览器中输入 Google.com 并且按下回车之后发生了什么？

#### 12. 对keep-alive的理解

#### 13. 页面有多张图片，HTTP是怎样的加载表现，如何解决？

#### 14. HTTP2的头部压缩算法是怎样的？

#### 15. HTTP请求报文和响应报文的组成

#### 16. HTTP协议的优点和缺点

#### 17. 说一下HTTP 3.0

#### 18. HTTP协议的性能怎么样

### HTTPS协议

#### 1. 什么是HTTPS协议？

HTTPS协议全称是超文本传输安全协议，其实就是在HTTP协议和TCP协议之间加上了一个安全层 TLS/SSL，安全层的主要作用就是**对HTTP请求的数据进行加密操作**和**对接收到的HTTP内容进行解密操作**。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210830154150.png)

由于HTTP协议是明文传输的，存在**信息窃听**、**信息篡改**和**信息劫持**的风险，而 TLS/SSL 协议具有**身份验证**、**信息加密**和**完整性校验**的功能，可以避免这种情况的发生。

#### 2. TLS/SSL的工作原理

TLS/SLL 实现其功能主要依靠三类算法：散列函数(hash)、对称加密、非对称加密。

- 散列函数hash

  常见的散列函数有 MD5、SHA1、SHA256，散列函数的特点是**单向不可逆**，对输入的数据非常敏感，任何数据的修改都会改变结果，**可以防止数据的篡改和验证数据的完整性**。

- 对称加密

  客户端和服务端约定好加密方式，使用同一个秘钥进行加密和解密，虽然可以加密传输的信息，但是加密方式和秘钥容易被拦截，造成信息泄漏。

  **对称加密的特点就是一对一传输，需要共享相同的秘钥。**

- 非对称加密

  生成两个秘钥，一个公钥和一个私钥，公钥加密的数据只有私钥能解密，私钥加密的数据只有公钥能解密。服务端将公钥发送给客户端，客户端通过公钥将数据进行加密然后发送给服务端，服务端再通过私钥对加密的数据进行解密。

  **非对称加密的特点就是一对多传输，服务器只要维护一个私钥就可以和多个拥有不同公钥的客户端实现数据传输，但该算法的计算复杂，加密的速度慢。**

综合上述算法特点，TLS/SSL的工作方式就是**客户端使用非对称加密与服务器进行通信**，**实现身份的验证并协商对称加密使用的秘钥**。**对称加密算法采用协商秘钥对信息以及信息摘要进行加密通信**，不同节点之间采用的对称秘钥不同，从而保证信息只能通信双方获取。这样就解决了两个方法各自存在的问题。

#### 3. 数字证书

现在的方法也不一定是安全的，因为**没有办法确定得到的公钥就一定是安全的公钥**。可能存在一个中间人，截取了对方发给我们的公钥，然后将他自己的公钥发送给我们，当我们使用他的公钥加密后发送的信息，就可以被他用自己的私钥解密。然后他伪装成我们以同样的方法向对方发送信息，这样我们的信息就被窃取了，然而自己还不知道。

为了解决这样的问题，可以使用数字证书（可以认为是包装后的公钥信息，用于验证公钥是否安全）。

首先使用一种 hash 算法对公钥和公钥拥有者的相关信息进行加密，生成一个信息摘要，然后让 CA 认证中心用它的私钥对信息摘要进行加密，生成**数字签名**，最后将原始信息（公钥和公钥拥有者的相关信息）和签名合在一起，形成数字证书。

当接收方收到数字证书时，先根据原始信息使用同样的 hash 算法生成一个摘要，然后用 CA 认证中心的公钥对数字证书中的数字签名进行解密，得到解密后的信息摘要，最后将解密的信息摘要和生成的摘要做对比，就能发现得到的信息是否被篡改。

> 数字签名：用于校验证书是否被篡改（完整性校验），本质上利用了 hash 函数的单向不可逆；
>
> 数字证书：用于证明公钥的安全可靠性（身份认证），通过比对加密的摘要和解密的摘要，验证证书是否有效。

#### 4. HTTPS通信（握手）过程

1. 客户端向服务端发送请求，请求包含**HTTP协议版本号**、生成的一个**随机数**和客户端所支持的**加密方法**；
2. 服务端收到请求后，确定双方使用的**加密方法**，并给出**服务器的证书**（相当于公钥）以及生成的一个**随机数**；
3. 客户端确认证书有效后，生成一个新的随机数，并使用数字证书的公钥**加密这个随机数**，然后发送给服务端，并且还会提供一个前面所有内容的 **hash 值**供服务端检验；
4. 服务端使用私钥将随机数**解密**，并提供之前所有内容的 **hash 值**供客户端检验；
5. 之后，客户端和服务端会根据约定的加密方法使用生成的三个随机数生成一个对话秘钥，之后的通信都使用这个秘钥加密信息（对称加密）。

#### 5. HTTPS的特点

### HTTP状态码

#### 2XX (Success 成功状态码)

#### 3XX (Redirection 重定向状态码)

#### 4XX (Client Error 客户端错误状态码)

#### 5XX (Server Error 服务器错误状态码)

### DNS协议

#### 1. DNS 协议的概念

#### 2. DNS同时使用TCP和UDP协议

#### 3. DNS完整的查询过程

#### 4. 迭代查询与递归查询

#### 5. DNS 记录和报文

### 网络模型

#### 1. OSI七层模型

#### 2. TCP/IP五层协议

### TCP和UDP

#### 1. TCP 和 UDP的概念及特点

#### 2. TCP和UDP的区别

#### 3. TCP和UDP的使用场景

#### 4. UDP协议为什么不可靠？

#### 5. TCP的重传机制

TCP在发送数据的时候，会开启一个重传计时器，重传计时器到期还没有受到数据的ACK确认报文时，就会将数据重传，如果达到了一定次数还没有成功的话就会放弃并且发送一个复位信号。

#### 6. TCP的拥塞控制机制

依靠的是：慢启动、拥塞避免、快速重传、快速恢复

- 慢启动：发送数据前，会设置拥塞窗口的大小为1，然后测试网络的拥塞程度，由小到大的增加拥塞窗口的大小。通常，为了避免拥塞窗口增加过大，会设置一个慢启动门限，当拥塞窗口的大小小于这个门限时，会使用慢启动算法；当大于这个门限时，会使用拥塞避免算法。
- 拥塞避免：将拥塞窗口的增长变为线性增长，无论是在慢启动阶段还是拥塞避免阶段，一旦网络出现拥塞，就把慢启动门限设置为窗口大小的一半，然后窗口大小设置为1，之后执行慢启动算法；
- 快速重传：当接收方受到一个失序的数据时，会发送一个重复确认的信号，当发送方收到三个重复确认的信号时，就会立即对这个数据进行重传，而不会等到重传计时器时间到期。
- 快速恢复：当发送方收到三个重传信号时，会将慢启动门限设置为拥塞窗口大小的一半，考虑到网络可能没有出现拥塞，所以此时不执行慢启动算法，而是将拥塞窗口的大小设置为慢启动门限的大小，然后使用拥塞避免算法。

#### 7. TCP的流量控制机制

TCP采用的是大小可变的滑动窗口进行流量控制。

首先，当发送方和接收方建立连接后，双方会分配一个缓冲区来保存输入的数据。

当发送方发送数据的速度和接收方读取数据的速度一样快时，此时剩余缓冲区的大小就为正。

当发送方发送数据的速度大于接收方读取数据的速度时，此时数据将会充满整个缓冲区，窗口大小为0，发送方在得知接收方的窗口大小为0时，就会立即停止发送，直到窗口大小变为正数。

一般来说，流量控制就是为了让发送方发送数据的速度不要太快，要让接收方来得及接收。TCP 采用大小可变的**滑动窗口**进行流量控制，窗口大小的单位是字节。

- 当一个连接建立时，连接的每一端分配一个缓冲区来保存输入的数据，并将缓冲区的大小发送给另一端。
- 当数据到达时，接收方发送确认，其中包含了自己剩余的缓冲区大小。（剩余的缓冲区空间的大小被称为窗口，指出窗口大小的通知称为窗口通告 。接收方在发送的每一确认中都含有一个窗口通告。）
- 如果接收方应用程序读数据的速度能够与数据到达的速度一样快，接收方将在每一确认中发送一个正的窗口通告。
- 如果发送方操作的速度快于接收方，接收到的数据最终将充满接收方的缓冲区，导致接收方通告一个零窗口 。发送方收到一个零窗口通告时，必须停止发送，直到接收方重新通告一个正的窗口。

#### 8. TCP的可靠传输机制

> - https://blog.csdn.net/guoweimelon/article/details/50879588
> - https://blog.csdn.net/qq_33314107/article/details/81607630

TCP 的可靠传输是基于 `连续ARQ协议` 和 `滑动窗口协议` 的。

- 连续ARQ（Automatic Repeat reQuest）协议是基于 `停止等待ARQ协议`的。在停止等待ARQ协议中，最重要的两个概念就是停止等待和超时重传，发送方发送一组数据之后，就会暂停发送等待接收方的确认，在收到接收方的确认之后才会继续发送。每发送一次数据时，发送方就会开启一个重传计时器，如果计时结束之后还没有收到确认，发送方就会重新发送数据，如果达到一定次数还没有成功的话就会放弃并发送一个复位信号。
- 由于停止等待ARQ协议的信道利用率太低，所以提出了连续ARQ协议，这个协议会连续发送一组数据包，然后再等待这些数据包的确认。
- 连续ARQ协议通常要结合滑动窗口协议使用，发送方维持一个发送窗口，接收方维持一个接收窗口。发送方每收到一个确认，就把发送窗口向前滑动一个位置。接收方一般采用累计确认的方式，也就是说接收方不必对每个接收到的分组进行确认，而是在收到几个分组之后，对按序到达的最后一个分组发送确认。

#### 9. TCP的三次握手

初始状态时，客户端处于 closed 状态，服务端处于 listen 状态。

第一次握手：客户端给服务端发送一个 SYN 报文并且指明了客户端的初始序列号 ISN，此时客户端处于 SYN_SENT 状态；

第二次握手：服务端收到客户端的 SYN 报文后，也会向客户端发送一个 SYN 报文，并且指明服务端的初始序列号 ISN，同时把客户端的初始序列号 + 1 作为 ACK 的值，表示服务端收到了客户端的 SYN 报文，此时服务端处于 SYN_RECEIVED 状态；

第三次握手：客户端收到服务端的 SYN 报文后，会发送一个 ACK 报文，将服务端的 ISN + 1 作为 ACK 的值，表示客户端收到了服务端的 SYN 报文，此时客户端处于 ESTABLISHED 状态，当服务端收到 ACK 报文后，也会处于 ESTABLISHED 状态，表示已经建立连接了。

#### 10. 为什么要三次握手呢？两次不行吗？

第三次握手的作用是客户端对服务端初始序列号的确认，如果只进行两次握手的话，服务端无法知道自己的初始序列号有没有被客户端确认。这样可以避免已经失效的请求被服务器接收，造成 TCP 连接的错误建立而导致占用资源。

#### 11. TCP的四次挥手

初始时，客户端和服务端都处于 ESTABLISHED 状态，假如客户端想要断开连接，那么：

第一次挥手：客户端会向服务端发送一个 FIN 报文，并指明了客户端的序列号，此时客户端处于 FIN_WAIT1 的状态；

第二次挥手：服务端收到 FIN 报文后，会向客户端发送一个 ACK 报文，将客户端序列号 + 1 作为 ACK 的值，表示收到了客户端的 FIN 报文，同时会指明服务端的序列号，此时服务端处于 CLOSE_WAIT 的状态，当客户端收到服务端的确认报文后，客户端处于 FIN_WAIT2 的状态；

第三次挥手：当服务端也想断开连接时，会向客户端发送一个 FIN 报文，并指明服务端的序列号和确认号，此时服务端处于 LAST_ACK 的状态；

第四次挥手：客户端收到 FIN 报文后，会向服务端发送一个 ACK 报文，将服务端序列号 + 1 作为 ACK 的值并指明客户端的序列号，此时客户端处于 TIME_WAIT 的状态。客户端会等待 2MSL(最大生存期) 的时间，如果这段时间内没有收到服务端发送的重传请求，那么客户端就会处于 CLOSED 状态，当服务端收到 ACK 报文后，服务端处于 CLOSED 状态。

#### 12. TCP为何进行四次挥手？

TCP 的连接是全双工的，所以双方都需要释放掉对方的连接，如果只释放一方的连接，只代表这一方不能向对方发送数据，但另一方仍然可以发送数据。

#### 13. 第四次挥手为何要等待2MSL？ 

为了防止客户端发送给服务器的确认报文段丢失或者出错，从而导致服务端不能正常关闭。

### WebSocket

#### 1. WebSocket 是什么

WebSocket 是 HTML5 提供的一种浏览器和服务器进行全双工通讯的网络技术，它是应用层协议，它基于 TCP 传输协议，并复用了 HTTP 的握手通道。浏览器和服务器只要进行一次握手，就可以建立持久连接，并进行双向数据传输。

WebSocket 的出现解决了半双工通讯的弊端，最大特点就是：浏览器可以主动向服务器推送消息，服务器也可以主动向浏览器推送消息。

#### 2. WebSocket 特点

#### 3. WebSocket的使用

#### 4. 即时通讯的实现：短轮询、长轮询、SSE 和 WebSocket 间的区别？

#### 5. WebSocket的握手过程

- 首先，客户端会向服务端发送一个 HTTP 协议的握手包，表示申请协议升级。这个握手包必须是 GET 请求而且 HTTP 版本不能小于 1.1，然后会有这些字段：`Connection: Upgrade`，`Upgrade: websocket`、`Sec-Websocket-version: 13`、`Sec-Websocket-key: 值为Base64格式的16字节随机字符串`；
- 之后，服务端也会响应一个握手包并且状态码为 101 （切换协议），表示响应协议升级。这个握手包也有 `Connection: Upgrade` 和 `Upgrade: websocket` 字段，同时还增加了 `Sec-Websocket-Accept` 字段，这个字段的值是将一个固定字符串拼接到 `Sec-Websocket-key` 的后面，然后进行 `SHA-1` 加密并且转换成 Base64 格式得到的；
- 最后，客户端收到握手包之后，会用同样的方式得到一个 `Sec-Websocket-Accept` 的值，然后和服务端发来的 `Sec-websocket-Accept` 比较，验证通过后就建立起 WebSocket 连接。

#### 6. 即时通讯的实现

- 短轮询：浏览器每隔一段时间就像服务器发送一个请求，服务器不管资源有没有更新，都会进行响应。这种方式需要不断建立 HTTP 连接，严重浪费客户端和服务端的资源；
- 长轮询：浏览器向服务器发送请求，服务器不会立马进行响应，而是先将请求挂起，然后判断资源有没有更新，如果有更新，则进行响应，如果没有更新，则到达一定时间限制之后才会返回；
- SSE：服务器向浏览器声明发送流数据，流数据不是一次性的数据包，而是一个数据流，会源源不断地发送到浏览器中。这时，客户端不会关闭连接，而是一直等着服务器发送新的数据流。SSE 就是利用这种机制，使用流数据向浏览器推送数据。
- WebSocket：。。。

### Socket通信

Socket 通信也称 `套接字通信`。Socket 通信在双方建立连接之后，可以直接进行数据传输，在连接时可以实现信息的主动推送，而不需要每次由浏览器向服务器发送请求。

Socket 是一种抽象层，它提供了程序内部和外界通信的端口并为通信双方提供了数据传输通道，使用 Socket 可以将应用程序添加到网络中， 与处于同一网络的其它应用程序进行通信。

**Socket实现原理：**

1. 基于 TCP 协议的 Socket
   - 服务端创建一个 `ServerSocket` 对象并且指定端口号，然后调用 `ServerSocket` 的 `accept()` 方法接收客户端的数据，在没有数据进行接收时 `accept()` 方法会处于堵塞状态；
   - 客户端创建一个 `Socket` 对象，设置服务端的 ip 地址和端口号，通过 `inputstream` 读取数据，然后通过 `outputstream` 发送数据。
2. 基于 UDP 协议的 Socket
   - 服务端创建一个 `DatagramSocket` 对象并且指定端口号，然后调用 `receive()` 方法接收客户端发来的数据，在没有数据进行接收时同样会处于堵塞状态；
   - 客户端也创建一个 `DatagramSocket` 对象并设置服务端的 ip 地址和端口号，然后通过调用 `send()` 方法发送数据。





---


## 浏览器原理

### 浏览器安全

#### 1.  什么是XSS ？

> https://www.bilibili.com/video/BV1DW411U7XE/?spm_id_from=333.788.recommend_more_video.-1

XSS全称为跨站脚本攻击（Cross-Site-Scripting），是一种代码注入攻击。攻击者将恶意代码注入到网站上，浏览器会执行恶意代码，攻击者就可以获取到用户的信息，比如 Cookie、LocalStorage。

XSS可以分为存储型、反射型和DOM型。

- 反射型：攻击者会构造一段带有恶意代码的 URL，当用户点击 URL 时，网站的服务端会将恶意代码从 URL 提取出，然后拼接到 HTML 中，返回给浏览器，浏览器执行恶意代码引发XSS。（**攻击者会将恶意代码作为参数插入到 URL 中发送给服务器，服务器将恶意代码提取出来返回给浏览器，浏览器执行恶意代码引发 XSS**）；
- 存储型：攻击者会将恶意代码提交到网站的数据库中，当用户访问网站时，网站服务器会返回带有恶意代码的 HTML，浏览器执行恶意代码，从而造成 XSS（**存储型和反射型类似，只不过服务器会将恶意代码存储到数据库中，当浏览器再次请求时，服务器会返回恶意代码引发 XSS，比如攻击者将恶意代码输入到富文本中，然后提交给服务器** ）;
- DOM型：DOM 型和反射型很像，攻击者也是构造出一段带有恶意代码的 URL，只不过前端的 JavaScript 会取出恶意代码并执行，从而造成 XSS（**攻击者将恶意代码作为参数插入到 URL 中，由于前端 JS 的代码存在漏洞，会将 URL 中的参数解析出来导致恶意代码的执行，比如 `eval(location.hash.substr(1))`**）

三者的区别在于存储型和反射型都属于服务器上的安全漏洞，都会将恶意代码插入到 HTML 中，而 DOM 型属于前端 Javascript 自身的安全漏洞，恶意代码被插入到了 Javascript 中。

#### 2. 如何防御XSS？

- 使用纯前端的方式，不使用服务端渲染，恶意代码就不会被拼接到 HTML 中
- 对插入到 HTML 中的代码做好充分的转义
- 对一些敏感信息进行保护，比如将 Cookie 设置为 http-only，禁止脚本获取 Cookie
- 开启 CSP，建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。开启 CSP 方式： 1. 设置 http 首部 Content-Security-Policy，一种是设置 meta 标签。

1. **对输入进行过滤**
   - **对 GET 请求的 query 参数、POST 请求的 body 参数等输入进行过滤；**
   - **可以设置黑名单进行过滤，就是对某些特殊字符进行特殊处理，比如 script 标签替换成一些其它字符；**
   - **也可以设置白名单过滤，即只允许用户输入哪些字符，这种方法可以百分百预防 XSS，适合用于一些表单操作，比如添加表单验证，限制用户输入字符的类型；**
   - **还可以将半角字符转换为全角字符。**
2. **对输出进行转义**
   - **服务端将输出的文本进行转义处理，比如 < 转译成 \&lt; > 转译成 \&gt;** 
3. **将 cookie 设置成 http-only，禁止 JS 脚本获取 cookie，可以有效的保护用户的信息。**
4. **使用 CSP ，CSP 的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行，从而防止恶意代码的注入攻击。通常可以通过两种方式来开启 CSP，一种是设置 HTTP 响应头中的 Content-Security-Policy，一种是设置 meta 标签的方式。**

#### 3. 什么是CSRF ？

> https://www.bilibili.com/video/BV1iW411171s?from=search&seid=953707347623776655

CSRF 全称是跨站请求伪造攻击。攻击者诱导用户进入一个第三方网站，然后利用用户的 cookie，向目标服务器发送一个伪造的恶意请求，造成用户信息的篡改。

CSRF 有三种类型：

- GET 请求的攻击。比如攻击者构建一个 img 标签，图片的 src 就指向了目标服务器，当第三方网站一加载图片的时候，就会向服务器发起恶意请求，因为此时请求自动携带了用户在目标网站的 cookie，所以服务器会正常返回请求；
- POST 请求的攻击。比如攻击者构建一个表单，当用户一进入第三方网站时，就提交这个表单，然后利用用户的 cookie 绕过目标网站的服务器的验证，执行非法操作；
- 链接类型的攻击。攻击者构造一个 a 标签，href 里构建一个恶意请求，诱导用户去点击。

#### 4. 如何防御CSRF

- 使用验证码。当要执行一些请求时，让用户输入验证码，执行通过后确认这是用户操作，才向服务器发送请求；
- 服务器通过 referer 进行判断。如果 referer 不存在或者不是目标站点，就直接阻止请求，但是 referer 可以伪造，所以还有安全隐患；
- 使用 CSRF Token。服务器返回一个随机数 Token，然后网站的每次请求都需要携带这个 Token，服务器要对 Token 和 cookie 进行验证，只有都验证通过后，才会返回响应结果；
- 给 cookie 设置 Samesite，限制 cookie 不能被第三方站点使用。Samesite 有三个值，分别是 strict、lax 和 none，strict 表示完全禁止第三方站点使用 cookie，lax 宽松一点，只在 GET 请求中携带 cookie，none 表示不限制。 

### 进程与线程

#### 1. 进程与线程的概念

#### 2. 进程和线程的区别

#### 3. 浏览器渲染进程的线程

#### 4. 进程之间的通信方式

`管消信共套`

1. 管道通信。操作系统在内核中开辟一段缓存区（管道  pipe），进程1可以将数据拷贝到缓存区中，然后进程2就可以读取了。
2. 消息队列通信；
3. 信号量通信，信号量的本质是一个计数器，用来实现进程间的互斥和同步，例如信号量初始值为1，当进程1访问内存A时，信号量变为0，当进程2访问内存A时，发现信号量为0就无法访问内存A；
4. 共享内存通信；
5. 套接字通信，用于实现不同主机之间的进程通信。

#### 5. 僵尸进程和孤儿进程是什么？

#### 6. 死锁产生的原因？ 如果解决死锁的问题？

### 浏览器缓存

#### 1. 说一说浏览器的缓存机制

#### 2. 协商缓存和强缓存的区别

#### 3. 为什么需要浏览器缓存？

#### 4. 用户点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？

### 浏览器内核

#### 1. 对浏览器的理解

#### 2. 对浏览器内核的理解

#### 3. 常见的浏览器内核比较

#### 4. 常见浏览器所用内核

- Chrome：Blink
- IE：Trident
- Safari：Webkit
- Firefox：Gecko
- Opera：Presto  ==>  Blink

### 浏览器渲染原理

#### 1. 浏览器的渲染过程

#### 2. 浏览器渲染优化

回流、重绘

操作

回流：1.  2.  3.

重绘：1. 2. 3. 4. 5.

减少回流、重绘：1. 2. 3. 

#### 3. 渲染过程中遇到 JS 文件如何处理？

#### 4. 什么是文档的预解析？

#### 5. CSS 如何阻塞文档解析？

#### 6. 如何优化关键渲染路径？

### 浏览器本地存储

#### 1. 浏览器本地存储方式及使用场景

#### 2. Cookie有哪些字段，作用分别是什么

#### 3. Cookie、LocalStorage、SessionStorage区别

### 浏览器跨域

#### 1. 什么是同源策略

- 浏览器规定的一种安全策略，当一个 URL 的协议、域名和端口号都相同，则同源，否则不同源；
- 同源策略限制了三个方面：
  1. 当前域的 JS 脚本不能获取其他域的 cookie、LoacalStorage 和 IndexDB；
  2. 当前域的 JS 脚本不能操作其他域的 DOM；
  3. 当前域的 ajax 不能发起跨域请求；
- **同源策略的作用主要是为了保护用户的信息安全，它只是对 JS 脚本的一种限制，而不是对浏览器的限制，像 link、img、script 标签都可以跨域请求资源，因为这些操作都只能获取响应结果而不会修改用户的信息，所以不会有跨域限制。**

#### 2. 如何解决跨越问题

1. CORS

   CORS 全称 跨域资源共享，需要浏览器和服务器同时支持。

   CORS 可以分为简单请求和非简单请求。

   如果一个请求的请求方法是 HEAD、GET、POST，而且请求头中都是默认的字段，这种请求就成为简单请求，否则就是非简单请求。

   - 简单请求：
     - 浏览器会直接发出 CORS 请求，请求头中有一个 origin 字段，值是本次请求的源（协议 + 域名 + 端口号）；
     - 服务器会根据 origin 的值，确定该 origin 是否在允许的范围内，如果满足条件，就会返回对应的资源并且在响应头中加上一些字段，比如 `Access-Control-Allow-Origin`，这个字段的值就是 origin，如果不满足条件的话，也会正常返回资源，但不会有这个字段；
     - 然后浏览器会收到响应，浏览器就会判断响应头中是否有 `Access-Control-Allow-Origin` 这个字段，如果没有的话，就会报错。
   - 非简单请求：
     - 非简单请求会在正式通信前进行一次预检请求，请求方法是 OPTIONS，请求头中的字段会有 origin、Access-Control-Request-Methods（表示请求会用到哪些方法）、Access-Control-Request-Headers（表示请求会哪些自定义字段）；
     - 服务器收到预检请求后，会根据以上三个字段进行判断，然后返回响应（`Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`）。如果响应头中有 `Access-Control-Allow-Origin` 这个字段，说明通过了预检请求，否则就没有通过预检请求；
     - 如果通过了预检请求，浏览器就会在每次请求的时候带上 origin，而服务器在响应时也会带上 `Access-Control-Allow-Origin`；
     - 另外，为了减少预检请求的次数，服务器还可以在响应头中添加 `Access-Control-Max-Age`，表示预检请求结果的缓存时间，在有效时间内，再次发送请求就不用进行预检请求了。

   另外，跨域请求是默认不带 cookie 的，需要手动配置，需要三步：

   1. 浏览器请求中设置 `withCredentials = true`
   2. 服务器响应头设置 `Access-Control-Allow-Credentials = true`
   3. 服务器响应头 `Access-Control-Allow-Origin` 不为 `*`（这是因为 `Access-Control-Allow-Origin` 只能设置一个源或者 `*`，单源的情况下允许发送 cookie，而 `*` 的情况下禁止发送 cookie，因为考虑到安全问题）

2. JSONP

   JSONP 的原理是利用了 script 标签请求资源时没有跨域的限制。首先，浏览器会定义一个全局的回调函数，用来接收数据；然后会创建一个 script 标签，然后发送带有回调函数的参数的 GET 请求，服务器收到请求后会将响应数据拼接到回调函数中返回给浏览器，浏览器收到响应后就会自动执行那个全局函数，从而获取到数据。

   ```js
   // 动态添加 script
   function addScript(src) {
       const script = document.createElement('script')
       script.src = src
       script.type = 'text/javascript'
       document.appendChild(script)
   }
   // 处理响应结果的全局回调函数
   window.handleCallback = function(res) {
       console.log(res)
   }
   // 带上 callback 参数
   addScript('http://api.abc.com?callback=handleCallback')
   ```

   缺点：

   1. 只能发送 GET 请求；
   2. 不安全，容易受到 XSS 攻击。

3. Nginx 代理跨域

   通过一个代理服务器，将这个代理服务器和浏览器设置为同源，浏览器向代理服务器发送请求，代理服务器再向目标服务器发送请求（因为跨域只是针对的浏览器，服务器之间不存在跨域），代理服务器收到目标服务器的响应之后再转交给浏览器，这就是代理跨域的过程。

   比如：

   浏览器：http://127.0.0.1:3000/

   代理服务器：http://127.0.0.1:3000/

   目标服务器：http://127.0.0.1:8000/

   浏览器与代理服务器同源，代理服务器和目标服务器由于不是浏览器所以不存在同源限制，所以浏览器和目标服务器之间的数据通信可以通过代理服务器来实现，解决了跨域问题。

4. Vue 框架的 proxy 反向代理

   ```js
   // vue.config.js
   module.exports = {
     devServer: { // 解决跨域问题
       proxy: {
         '/api': {
           // 1. 所有以 /api 开头的请求都会拼接到 target 的后面
           //    比如：/api/user/data  =>  http://ttapi.research.itcast.cn/api/user/data
           target: 'http://ttapi.research.itcast.cn/', // baseURL
           changeOrigin: true, // 是否跨域
           ws: true, // 是否代理 websockets
           // 2. 将 /api 开头的请求的 /api 字符串替换成指定字符，然后再拼接，比如 '^/api': ''
           // 	  那么上面的请求将被替换成：http://ttapi.research.itcast.cn/user/data
           pathRewrite: {
             '^/api': ''
           }
         }
       }
     }
   }
   ```

   虽然请求的 URL 仍然是原来的跨域的 URL，但是 webpack-dev-server 会启动一个代理服务器，原理和 nginx 反向代理类似，也会通过代理服务器解决跨域问题。

5. Post-Message

   通过 window 对象的 postMessage 这个 API 实现跨域。

6. Websocket 协议跨域

   websocket 是 HTML5 提供的一种新的应用层协议，它实现了浏览器和服务器的全双工通信，同时允许跨域通讯。

   可以使用 socket.io，通过 send 发送数据，通过监听 message 事件接收数据。

#### 3. 正向代理和反向代理的区别

#### 4. Nginx的概念及其工作原理

### 浏览器事件模型

#### 1.事件是什么？事件模型有哪些？

事件：用户与浏览器进行的交互动作就成为事件，比如 click 点击事件，scroll 滚动事件。

事件模型：

- DOM0 级事件模型
  - 所有浏览器都兼容这种方式；
  - 事件不会传播，没有事件流的概念；
  - 通过给元素直接设置属性来绑定监听函数，比如直接设置 onclick 属性。
- IE 事件模型
  - 一次事件分为两个过程：事件处理阶段和事件冒泡阶段。事件处理阶段是直接处理目标元素上绑定的监听事件，冒泡阶段则是从目标元素逐级向上传播到 window 对象，如果这个过程中触发了节点绑定的监听事件，就会执行这些事件的回调；
  - 通过 attachEvent 添加监听函数。
- DOM2 级事件模型
  - 一次事件分为了三个过程：事件捕获阶段、事件处理阶段和事件冒泡阶段。事件捕获阶段是从 window 对象逐级向下查找目标元素，如果该过程触发了节点的监听事件，就会执行这些事件的回调；后面两个过程和 IE 事件模型一样；
  - 通过 addEventListener 添加监听函数，有三个参数，第三个参数 useCapture，指定事件会不会在捕获阶段触发。

#### 2.如何阻止事件冒泡？

- 普通浏览器：event.stopPropagation()
- IE浏览器：event.cancelBubble = true

#### 3.事件委托

```html
<body>
  <ul id="list">
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>
  <script>
    const list = document.getElementById('list')
    list.addEventListener('click', (event) => {
      // target 表示触发点击事件的那个元素
      console.log(event.target.innerText)
      // currentTarget 表示当前绑定事件的元素，相当于 this
      console.log(event.currentTarget)
    }, true)
  </script>
</body>
```

事件委托本质上是利用了事件冒泡的机制。因为事件可以冒泡到父节点，父节点可以通过事件对象获取到子节点，然后在父节点上绑定子节点的监听函数，这样父节点就可以统一处理多个子节点的事件，这个过程就叫做事件委托，也叫事件代理。

特点：

- 可以减少内存消耗
  - 比如有一个 ul 列表，里面有很多子元素 li，如果给每个 li 都绑定监听函数就会增加内存的消耗，使用事件委托，将事件绑定在 ul 父节点上，就可以统一处理这些 li 的事件，可以减少内存消耗；
- 可以动态绑定事件
  - 如果用户需要频繁的增加或删除元素，这时也需要频繁的给元素添加或解绑事件，这样有时候会十分麻烦，这时就可以利用事件委托将监听函数绑定在父元素上。



---

## 性能优化

### CDN

> https://juejin.cn/post/6844904190913822727

#### 1. CDN的概念

#### 2. CDN的作用

- 用户就近访问内容，提高了资源的访问速度；
- 分担了源站的压力；

#### 3. CDN的原理

CDN 的运行和 DNS 解析息息相关。

首先，DNS 中存在许多资源记录（Name、Value、Type、TTL）。最常见的就是 A、CNAME、NS 记录。

- A 记录是域名到 IP 地址的映射；
- CNAME（Canonical Name 别名） 记录是域名到域名的映射；
- NS 记录是域名到 DNS 服务器的映射。

#### 4. CDN的使用场景

jsDelivr，打包第三方库的 cdn

---



CDN 全称为内容分发网络，简单来说，它的作用就是利用距离用户最近的服务器让用户访问资源的速度更快。

- 用户访问一个 url，首先会经过 DNS 解析域名；
- 当本地 DNS 系统发现 URL 对应的是一个 CDN 专用的 DNS 服务器时，会将域名解析权交给 CNAME 指向的 CDN 专用 DNS 服务器；
- CDN 专用 DNS 服务器返回全局负载均衡设备的 IP 地址给用户；
- 用户向这个全局负载均衡设备发起请求；
- 全局负载均衡设备根据用户的 IP 地址以及请求的 URL，选择一台用户所属区域的区域负载均衡设备；
- 然后这个区域负载均衡设备选择一台合适的缓存服务器来提供服务，然后将该缓存服务器的 IP 地址返回给全局负载均衡设备；
- 全局负载均衡设备就把这个缓存服务器的 IP 地址返回给用户；
- 用户向该缓存服务器发起请求，缓存服务器响应用户的请求；
- 如果缓存服务器中没有用户需要的 内容，那么它就会向上一级缓存服务器请求内容，以此类推，直到获取到需要的资源。如果最后还是没有，就会回到自己的服务器获取资源。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210819153157.png)

### 懒加载

#### 1. 懒加载的概念

#### 2. 懒加载的特点

#### 3. 懒加载的实现原理

#### 4. 懒加载的实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  body, html {
    width: 100%;
    height: 100%;
  }
  img {
    border: 1px solid red;
    width: 400px;
    height: 400px;
  }
  .container {
    position: relative;
  }
</style>
<body>
  <div class="container">
    <div>
      <img src="EventLoop2.png" data-src="https://gitee.com/gainmore/imglib/raw/master/img/20210819153157.png" alt="">
    </div>
    <div>
      <img src="EventLoop2.png" data-src="https://gitee.com/gainmore/imglib/raw/master/img/20210904230848.png" alt="">
    </div>
    <div>
      <img src="EventLoop2.png" data-src="https://gitee.com/gainmore/imglib/raw/master/img/20210904104121.png" alt="">
    </div>
    <div>
      <img src="EventLoop2.png" data-src="https://gitee.com/gainmore/imglib/raw/master/img/20210904104045.png" alt="">
    </div>
    <div>
      <img src="EventLoop2.png" data-src="https://gitee.com/gainmore/imglib/raw/master/img/20210902093445.png" alt="">
    </div>
  </div>
  <script defer>
    const container = document.getElementsByClassName('container')[0]
    const imgs = document.getElementsByTagName('img')
    
    const load = lazyLoad()
    // 首屏渲染
    load()

    function lazyLoad() {
      var count = 0
      return function() {
        // 布局视口高度（使用视觉视口高度也一样）
        // 注意，获取绑定在非行内样式的高度时，使用 .style.height 获取不到高度，
        // 需要使用 .offsetHeight
        const height = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop
        for (let i = count, len = imgs.length; i < len; i++) {
          // `注意，必须给 img 设置高度，否则 offsetTop 会不正确`
          if (imgs[i].offsetTop < scrollTop + height) {
            if (imgs[i].getAttribute('src') === 'EventLoop2.png') {
              // 使用 data-src 的图片替换 src 中的图片
              imgs[i].src = imgs[i].getAttribute('data-src')
            }
            // 加载完一张后 count + 1，之后不会重新加载
            count++
          }
        }
      }
    }

    // 节流，一段时间内只触发一次事件
    function throttle(fn, wait) {
      let prev = Date.now()
      return function() {
        let self = this, args = arguments
        let cur = Date.now()
        if (cur - prev >= wait) {
          prev = Date.now()
          fn.apply(self, args)
        }
      }
    }

    window.addEventListener('scroll', throttle(load, 1000))
  </script>
</body>
</html>
```

#### 5. 懒加载与预加载的区别

### 回流与重绘

#### 1. 回流与重绘的概念及触发条件

> DOM 树 -- 包含所有节点
>
> CSSOM 规则树 -- 包含所有样式
>
> Render 树 -- 包含所有可见元素（display: none 的元素或者一些 head 标签除外）

回流：

- 当渲染树中的部分元素或者全部元素的尺寸、结构或者位置发生变化时，导致部分文档或者全部文档重新渲染，这个过程就叫做回流；
- 比如浏览器窗口大小改变、元素的内容改变、元素的尺寸或者位置改变等都会触发回流。

重绘：

- 当元素的样式发生改变，但不影响到其在文档流中的位置，浏览器就对它进行重新绘制，这个过程就叫做重绘；
- 比如修改 color、background-color、visibility、border-radius、box-shadow等属性会触发重绘。

#### 2. 如何避免回流与重绘？

1. 可以使用 `transform`、`opacity`、`will-change: transform` 这些属性将元素提升到一个复合层中，可以避免回流重绘；
2. 定位方式使用 `absolute` 或者 `fixed`，这样可以使元素脱离文档流，就不会影响到其他元素，可以减少回流；
3. 避免频繁操作 DOM，可以创建一个代码片段 `documentFragment`，把所有 DOM 操作都应用到这个片段上，然后再将它插入到文档中；
4. 可以先将元素设置 `display: none`，操作完成后，再显示该元素，因为对 `display: none` 的元素的 DOM 操作不会引发回流和重绘。

#### 3. 如何优化动画？

#### 4. documentFragment 是什么？用它跟直接操作 DOM 的区别是什么？

### 节流与防抖

#### 1. 介绍一下节流与防抖

#### 2. 实现节流函数和防抖函数

```js
function debounce(fn, wait) {
	let timer = null
    return function() {
        const self = this
        const args = [...arguments]
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
			fn.apply(self, args)
        }, wait)
    }
}

function throttle(fn, wait) {
    let prev = Date.now()
    return function() {
		const self = this
         const args = [...arguments]
         const current = Date.now()
         if (current - prev >= wait) {
             prev = Date.now()
             fn.apply(self, args)
         }
        
    }
}
```



### 图片优化

- png
- jpeg
- gif
- svg
- webp
- bmp

### Webpack优化

#### 1. 减少 Webpack 打包时间

#### 2. 减少 Webpack 打包体积

### SEO优化

> https://blog.csdn.net/weixin_30578677/article/details/95059533
>
> https://juejin.cn/post/6844903961091112968

1. 使用服务端渲染（SSR）。服务端渲染就是服务端生成完整首屏 HTML 返回给浏览器，服务端渲染返回给客户端的是已经获取了异步数据并执行 JavaScript 脚本的最终 HTML ，网络爬虫可以抓取到完整的页面信息。SSR另一个很大的作用是**加速首屏渲染**，因为无需等待所有的 JavaScript 都完成下载并执行，才显示服务端渲染的标记，所以用户会更快地看到完整渲染的页面；
2. 预渲染。使用预渲染可以在项目打包时对指定的路由生成静态 HTML 文件，可以加快首屏渲染，减少白屏时间，使用 `prerender-spa-plugin` 配置实现预渲染；
3. 动态添加 meta 信息。使用 `vue-meta-info` 这个插件动态设置 meta 的信息，比如一些关键字、描述、标题等，完善这些信息有利于 SEO。





---

## 前端工程化

### 1.webpack的作用

- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack`的`Loader`机制，不仅仅可以帮助我们对代码做`polyfill`，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

- 能力扩展。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

  > 链接：https://juejin.cn/post/6943468761575849992
  > 来源：掘金

### 2.模块打包运行原理

1、读取`webpack`的配置参数，从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数；

2、启动`webpack`，创建`Compiler`对象并开始解析项目；

3、从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；

4、对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为`Javascript`文件；

5、整个过程中`webpack`会通过发布订阅模式，向外抛出一些`hooks`，而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

### 3.sourceMap是什么

`sourceMap`是一项将编译、打包、压缩后的代码映射回源代码的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中`debug`问题会带来非常糟糕的体验，`sourceMap`可以帮助我们快速定位到源代码的位置，提高我们的开发效率。

### 4.编写loader的思路

从上面的打包代码我们其实可以知道，`Webpack`最后打包出来的成果是一份`Javascript`代码，实际上在`Webpack`内部默认也只能够处理`JS`模块代码，在打包过程中，会默认把所有遇到的文件都当作 `JavaScript`代码进行解析，因此当项目存在非`JS`类型文件时，我们需要先对其进行必要的转换，才能继续执行打包任务，这也是`Loader`机制存在的意义。

### 5.编写plugin的思路

### 6.常见的Loader

- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- `url-loader`：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- `source-map-loader`：加载额外的 Source Map 文件，以方便断点调试
- `babel-loader`：把 ES6 转换成 ES5
- `ts-loader`: 将 TypeScript 转换成 JavaScript
- `sass-loader`：将SCSS/SASS代码转换成CSS
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- `postcss-loader`：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- `eslint-loader`：通过 ESLint 检查 JavaScript 代码
- `vue-loader`：加载 Vue.js 单文件组件



---

## HTML

### 1. src和href的区别 

- src 表示的是对资源的引用，**它会将指向的资源下载并嵌入到标签所在位置**，比如 img、script、iframe 标签，会将图片嵌入到标签所在位置；浏览器在解析到这些资源的时候，**会暂停对其他资源的处理**，直到该资源加载执行完毕；
- href 是超文本引用，**它会将标签和资源建立起联系**，比如 a、link 标签，浏览器识别到这些资源的时候，会并行加载这些文件，**不会停止对其他资源的处理**。

### 2. 对HTML语义化的理解 

常见语义化标签：

- header 头部
- nav 导航栏
- section 区块
- main 主要区域
- article 主要内容
- aside 侧边栏
- footer 底部栏

### 3. DOCTYPE(文档类型) 的作用 

- DOCTYPE 是文档类型声明，它要放在 HTML 文档的第一行，用来告诉浏览器用哪一种文档类型去解析文档，比如 html 或者 xhtml；
- 浏览器渲染页面有两种模式，第一种是标准模式（默认模式），它指的是浏览器要用其支持的最高标准去渲染页面；第二种是怪异模式，它指的是用一种宽松的向下兼容的方式渲染页面。

### 4. script标签中defer和async的区别

- async

  浏览器解析 HTML 时会并行加载 script 脚本，当script 脚本加载完成之后，会停止 HTML 的解析，然后立即执行 script 脚本里的代码，执行完成之后再继续 HTML 的解析。如果有多个 async 的 script，不能保证执行的顺序，哪个脚本先加载完成，哪个脚本就先执行；

- defer

  浏览器解析 HTML 时会并行加载 script 脚本，当脚本加载完成时，不会立马执行里面的代码，而是会等到 HTML 解析完成之后再执行。多个 defer 的 script 可以保证执行的先后顺序。

### 5. 常用的meta标签有哪些

- charset 用来设置 html 文档的编码类型；
- keywords 页面关键词；
- description 页面描述；
- viewport 移动端适配，规定视口大小和缩放比例

### 6. HTML5有哪些更新

- 语义化标签
  - header
  - nav
  - section
  - main
  - article
  - aside
  - footer
- 媒体标签
  - audio
  - video
- DOM 查询操作
  - document.querySelector()
  - document.querySelectorAll()
- Web 存储
  - sessionStorage
  - localStorage
- Canvas、SVG
- WebSocket
- input 标签新增属性
  - placeholder
  - autocomplete
  - autofocus
  - required
- history API
  - go
  - back
  - forward
  - pushState
  - replaceState

### 7. img的srcset属性的作用是什么？ 

img 的 srcset 用来设置在不同的屏幕密度下，显示不同的图片。

### 8. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

行内元素：

- a
- span
- input
- select

块元素：

- div
- ul
- ol
- li
- h1 - h6 
- p

空元素：

- br
- hr
- img
- input
- link
- meta

### 9. display的block、inline和inline-block的区别

### 10. HTML5的离线储存怎么使用，它的工作原理是什么

### 11. 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

### 12. title与h1的区别、b与strong的区别、i与em的区别？

- title 表示网页的标题，h1 表示一级标题，属于网页的内容部分；
- strong 具有语义化，表示加强语气，b 只是加粗字体；
- i 表示斜体，em 表示强调的文本。

### 13. iframe 有哪些优点和缺点？

内联框架

### 14. label 的作用是什么？如何使用？

### 15. Canvas 和 SVG 有什么区别？

- svg 是可缩放矢量图形，它是基于 XML 的，svg 中每个图形都是一个对象，当对象的属性改变时，浏览器会自动重绘图形。
  - svg 不依赖分辨率；
  - 适合有大型渲染区域的应用，比如地图软件；
  - svg 的复杂度高会减慢渲染速度；
  - 不适合游戏应用。
- canvas 是画布的意思，用 JavaScript 绘制 2D 图形，是逐像素进行渲染的。
  - canvas 依赖分辨率；
  - 适合图像密集的程序，比如游戏应用。

### 16. head 标签中必不少的是？

head 标签用来定义文档的头部，它是所有头部元素的容器。

比如 meta、link、style、script、title，其中 title 是 head 标签中必不可少的元素。

### 17. Web Worker

在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本执行完毕之后才变为可响应。

Web Worker 是运行在后台的 JS，独立于其它的脚本，不会影响到页面的性能，并且可以通过 postMessage 将结果传回主线程，这样在进行复杂操作时就不会阻塞主线程了。



---

## CSS

### CSS基础

#### 1. CSS选择器及其优先级

1. !import 优先级最高
2. 内联样式：1000
3. id选择器：100
4. 类选择器、伪类选择器(:)、属性选择器：10
5. 标签选择器、伪元素选择器（::）：1
6. 子选择器（>）、后代选择器（ ）、相邻兄弟选择器（+）、通配选择器（*）：0

#### 2. CSS中可继承与不可继承属性有哪些

可继承：

1. 字体属性
   - font-size
   - font-family
   - font-weight
   - font-style
2. visibility
3. 文本属性
   - word-spacing
   - letter-spacing
   - color
   - line-height
   - text-align
4. list-style、cursor

不可继承：

1. display
2. 盒模型属性
   - width、height
   - border
   - padding
   - margin
3. 背景属性
   - background
   - background-color
   - background-image
   - background-repeat
   - background-position
4. 定位属性
   - position
   - float
   - clear
   - top、bottom、left、right

#### 3. display的属性值及其作用

- inline
- block
- inline-block
- flex
- table
- none

#### 4. 单行、多行文本溢出隐藏

```css
// 单行
.single {
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

// 多行
.multiple {
    width: 100px;
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```



#### 5. 隐藏元素的方法有哪些

- display: none
  - 渲染树中不会渲染该元素，因此元素不会在文档流中占据位置，也不会响应绑定的监听事件
- visibility: hidden
  - 元素仍然占据位置，但不会响应绑定的监听事件
- opacity: 0
  - 元素的不透明度为 0 ，元素仍然占据位置，且会响应绑定的监听事件
- transform: scale(0, 0)

#### 6. link和@import的区别

1. link 属于 XHTML 标签，而 @import 属于 CSS 提供的导入样式的方法；
2. link 的样式会在页面加载的同时加载，而 @import 的样式会在页面加载完之后加载；
3. Javascript 可以动态插入 link 标签改变样式，而 @import 不支持；
4. @import 只有 IE5 以上才能被识别，而 link 属于 XHTML 标签，没有兼容性问题；
5. link 方式的样式权重高于 @import 的权重。

#### 7. transition和animation的区别

- transition 是过渡属性，需要通过事件触发才能执行动画，而且需要设置开始关键帧和结束关键帧；

  ```js
  // transition 的四个属性：
  transition-property: 过渡属性(默认值为all)
  transition-duration: 过渡持续时间(默认值为0s)
  transiton-timing-function: 过渡函数(默认值为ease函数)
  transition-delay: 过渡延迟时间(默认值为0s)
  ```

- animation 是动画属性，不需要通过事件触发，可以自动执行，也可以循环执行，可以通过 @keyframe 设置多个关键帧。

#### 8. display:none与visibility:hidden的区别

- display: none，元素不在渲染树中，不会在文档流中占据位置，而 visibility: hidden 元素还在渲染树中，且占据位置；
- display: none，是非继承的属性，元素的后代元素也会在渲染树中消失，修改后代元素的属性也无法显示，而 visibility: hidden 是继承属性，后代元素也会继承这个属性，通过修改后代元素 visibility: visible 可以让后代元素显示出来；
- 修改 display 会造成回流，修改 visibility 会造成重绘。

#### 9. 伪元素和伪类的区别和作用？

- 伪元素会在元素的前后插入额外的元素或样式，但这些元素实际上不会出现在源代码中，它们只是外部可见；
- 伪类是在已有的元素上面添加新的类别，不会产生新的元素。

#### 10. 对requestAnimationframe的理解

这个方法和 `setTimeout`、`setInterval` 类似，也是在某段时间内执行回调函数，只不过 `requestAnimationFrame` 控制的更加精确，它是每隔 16.67 ms 执行一次（也就是每一帧执行一次，因为屏幕刷新率一般是 60 fps）。

window.requestAnimationFrame(callback)，需要传入一个回调函数，该回调函数会在浏览器下一次重绘之前执行以此来更新动画。requestAnimationFrame 会把每一帧的所有 DOM 操作集中起来，在一次回流或重绘中完成，以此减少 DOM 操作，提高性能。

优点：

- CPU 节能
- 函数节流
- 减少 DOM 操作

#### 11. 对盒模型的理解

- 分为标准盒模型和 IE 盒模型；
- 标准盒模型的 width 和 height 只包括 content，而 IE 盒模型的 width 和 height 包括 content、padding 和 border；
- 可以通过 box-sizing 设置盒模型的类型。

#### 12. Canvas和SVG的区别

#### 13. CSS中有哪些是空元素？

#### 14. CSS3中有哪些新特性

- 圆角 border-radius
- transform：平移 translate、伸缩 scale、旋转 rotate
- 动画 animation
- 线性渐变：gradient
- 文字特效：text-shadow
- 阴影：box-shadow

#### 15. 替换元素的概念及计算规则

#### 16. 常见的图片格式有哪些，使用场景

- BMP 无损图像，图片数据没有压缩
- JPEG 色彩丰富，用来存储照片
- PNG 支持透明度
- GIF 支持动画
- SVG 无损的矢量图，用来制作图标
- WEBP 谷歌开发的图片格式，图片体积更小，但兼容性不太好

#### 17. 阐述一下 CSSSprites

精灵图，将多张图片合并到一张图片中，利用 background-image、background-repeat、background-position 对背景图片进行定位。

可以减少 http 请求次数，也可以减少数据传输的大小。

#### 18. 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？

#### 19. margin和padding分别适合什么场景使用？

- margin：给元素 border 的外侧添加间隔，而且不需要背景色；
- padding：给元素 border 的内侧添加间隔，需要背景色。

#### 20. 对line-height 的理解及其赋值方式

#### 21. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

原因：因为 li 标签之间存在空格、tab 或者回车；

解决办法：

- 将 li 标签写在一行，并删除 li 之间的空格、tab；
- 将 font-size 设置为 0；
- 将 li 的字符间隔 letter-spacing 设置为负数。

#### 22. CSS 优化、提高性能的方法有哪些？

#### CSS预处理器/后处理器是什么？为什么要使用它们？

- 预处理器：less、sass 和 stylus，负责编译 less、sass，支持变量、循环、函数、运算。
- 后处理器：postcss，可以给一些属性添加浏览器厂商前缀，提高兼容性。

#### transform: translateZ(0) 的作用？

> https://segmentfault.com/a/1190000008015671

- translateZ(0) 将 2D 绘制转为了 3D 绘制，开启了 GPU 渲染（硬件加速），提高了浏览器渲染页面的性能；
- 使用 transform 和 opacity 做 CSS 动画时，会将元素提升为一个复合层，而使用 JS 操作 CSS 属性做动画时必须使用  `transfrom: translateZ(0)` 或 `will-change: transform` 才能将元素强行提升为一个复合层。

> 复合层（下图中的 GPU Layer）中的元素只发生 composite，不会经历前面的回流重绘。只发生 composite 的属性需要满足以下三点：
>
> - 不影响文档流。
> - 不依赖文档流。（position 的 left 等属性需要依赖文档流）
> - 不会造成重绘。
>
> CSS 中只有 transform 和 opacity 两个属性满足上面三点，所以这两个元素可以提升至复合层。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210904230848.png)

1. > 元素本身使用`transform`和`opacity`做CSS动画的时候，会提前告诉 GPU 动画如何开始和结束及所需要的指令；所以会创建一个复合层（渲染层），并把页面所有的复合层发送给 GPU；作为图像缓存，然后动画的发生仅仅是复合层间相对移动。

2. > 而使用 js 做动画，js 必须在动画的每一帧计算元素的状态；发送给 GPU，但不会将元素提升至一个复合层；所以想让元素提升至一个复合层，必须使用`translateZ`或`will-change: transform`, `opacity`。

#### transform与position:absolute 有什么区别？

> https://zhuanlan.zhihu.com/p/78230297

两者都能实现动画，但是 absolute 会造成回流和重绘，而 transform 不会。这是因为 transform 动画由 GPU 控制，支持硬件加速。

当浏览器收到一个 HTML 后，会进行解析并构建 DOM 树。随后，浏览器可以根据 DOM 树和 CSS 构建出渲染树，渲染树是由页面上**需要渲染的元素**（像 `head` 标签以及 `display: none` 的元素则不渲染）组成的。每个渲染元素都会被分配给一个图形层，每个图形层则会被作为一个纹理（texture）提交给 GPU，GPU会把多个图像合成到屏幕上。而这里的秘密在于，图形层有可能会在没有重绘的情况下直接在 GPU 中转变，就比如 3D 图像。这个转变是由一个独立的合成器（Compositor）流程完成的，你可以阅读 [the composition in Chrome here](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.chromium.org%2Fdevelopers%2Fdesign-documents%2Fgpu-accelerated-compositing-in-chrome) 了解更多。

CSS transform 创建了一个可以直接被 GPU 转换的合成层（composite layer），在 Chrome's DevTools 中可以通过勾选「Show layer borders」选项查看合成层，每个合成层周围都会有个橙色的边框。



#### CSS样式百分比单位相对关系

相对于父级宽度的：

`max-width`、`min-width`、`width`、`left`、`right`、`text-indent`、`padding`、`margin`、`grid-template-columns`、`grid-auto-columns`、`column-gap` 等；

相对于父级高度的：

`max-height`、`min-height`、`height`、`top`、`bottom`、`grid-template-rows`、`grid-auto-rows`、`row-gap` 等；

相对于主轴长度的：

`flex-basis` 等；

相对于继承字号的：

`font-size` 等；

相对于自身字号的：

`line-height` 等；

相对于自身宽高的：

`border-radius`、`background-size`、`border-image-width`、`transform: translate()`、`transform-origin`、`zoom`、`clip-path` 等；

相对于行高的：

`vertical-align` 等；

特殊算法的：

`background-position` （方向长度 / 该方向除背景图之外部分总长度）、`border-image-slice` （相对于图片尺寸）、`filter` 系列函数等；

如果自身设置 `position: absolute`，“父级”指：[Boring：破坏文档流的div高度设为百分比是相对谁而言的？](https://www.zhihu.com/question/35707704/answer/64079391)；

如果 `position: fixed`，“父级”指视口（父级不存在 `transform` 为非 `none` 值的情况下）。



#### flex: 1

`flex` 是 `flex-grow` 、`flex-shrink` 、 `flex-basis` 这三个属性的简写。

- flex-grow 定义了项目的放大比例，默认值为 0，表示即使存在剩余空间，也不放大；
- flex-shrink 定义了项目的缩小比例，默认值为 1，表示如果空间不足，就会缩小；
- flex-basis 定义了分配空间之前，项目在主轴占据的空间，默认值为 auto，表示项目原本大小。

flex 简写属性：

- `flex 为默认值`：0 1 auto （不放大会缩小）
- `flex 为none`：0 0 auto （不放大也不缩小）
- `flex 为auto`：1 1 auto（放大且缩小）
- `flex 为非负整数n`：n 1 0%
- `flex 为两个非负整数n1、n2`：n1 n2 0%
- `flex 为一个长度或百分比L`：1 1 L
- `flex 为一个非负整数n和一个长度或百分比L`：n 1 L





### 页面布局

#### 1. 常见的CSS布局单位

- px
- rem、em
  - em：相对于当前对象内文本的字体尺寸；
  - rem：相对于 html 元素的字体尺寸；
- vw、vh
- %

#### 2. px、em、rem的区别及使用场景

#### 3. 两栏布局的实现

1. float

   ```html
   <style>
     .left {
       width: 100px;
       height: 100px;
       background-color: green;
       float: left;
     }
     .right {
       height: 100px;
       background-color: pink;
       overflow: hidden;
     }
   </style>
   <body>
     <div class="left"></div>
     <div class="right"></div>
   </body>
   ```

2. flex

   ```html
   <style>
     .container {
       display: flex;
     }
     .left {
       flex-basis: 100px;
       height: 100px;
       background-color: green;
     }
     .right {
       height: 100px;
       background-color: pink;
       flex-grow: 1;
     }
   </style>
   <body>
     <div class="container">
       <div class="left"></div>
       <div class="right"></div>
     </div>
   </body>
   ```

3. absolute + margin-right（不用）

   ```html
   <style>
     .container {
       position: relative;
     }
     .left {
       width: 100px;
       height: 100px;
       position: absolute;
       margin-right: 100px;
       background-color: green;
     }
     .right {
       height: 100px;
       background-color: pink;
     }
   </style>
   <body>
     <div class="container">
       <div class="left"></div>
       <div class="right"></div>
     </div>
   </body>
   ```

4. absolute + left

   ```html
   <style>
     .container {
       position: relative;
     }
     .left {
       width: 100px;
       height: 100px;
       background-color: green;
     }
     .right {
       position: absolute;
       top: 0;
       bottom: 0;
       right: 0;
       left: 100px;
       height: 100px;
       background-color: pink;
     }
   </style>
   <body>
     <div class="container">
       <div class="left"></div>
       <div class="right"></div>
     </div>
   </body>
   ```

   

#### 4. 三栏布局的实现

1. flex

   ```html
   <style>
     .container {
       display: flex;
       height: 100px;
     }
     .left {
       width: 100px;
       height: 100px;
       background-color: green;
     }
     .right {
       width: 100px;
       height: 100px;
       background-color: pink;
     }
     .content {
       flex-grow: 1;
       height: 100px;
       background-color: greenyellow;
     }
   </style>
   <body>
     <div class="container">
       <div class="left"></div>
       <div class="content"></div>
       <div class="right"></div>
     </div>
   </body>
   ```

2. absolute

   ```html
   <style>
     .container {
       position: relative;
       height: 100px;
     }
     .left {
       width: 100px;
       height: 100px;
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       background-color: green;
     }
     .right {
       width: 100px;
       height: 100px;
       position: absolute;
       top: 0;
       bottom: 0;
       right: 0;
       background-color: pink;
     }
     .content {
       height: 100px;
       margin-left: 100px;
       margin-right: 100px;
       background-color: greenyellow;
     }
   </style>
   <body>
     <div class="container">
       <div class="left"></div>
       <div class="content"></div>
       <div class="right"></div>
     </div>
   </body>
   ```

#### 5. 水平垂直居中的实现

1. absolute

   ```html
   <style>
     .container {
       width: 300px;
       height: 300px;
       border: 1px solid black;
       position: relative;
     }
     .box {
       width: 50px;
       height: 50px;
       background-color: chartreuse;
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       margin: auto;
     }
   </style>
   <body>
     <div class="container">
       <div class="box"></div>
     </div>
   </body>
   ```

2. translate

   ```html
   <style>
     .container {
       width: 300px;
       height: 300px;
       border: 1px solid black;
       position: relative;
     }
     .box {
       width: 50px;
       height: 50px;
       background-color: chartreuse;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%, -50%);
     }
   </style>
   <body>
     <div class="container">
       <div class="box"></div>
     </div>
   </body>
   ```

3. flex

   ```html
   <style>
     .container {
       width: 300px;
       height: 300px;
       border: 1px solid black;
       display: flex;
       justify-content: center;
       align-items: center;
     }
     .box {
       width: 50px;
       height: 50px;
       background-color: chartreuse;
     }
   </style>
   <body>
     <div class="container">
       <div class="box"></div>
     </div>
   </body>
   ```

4. table-cell

   ```html
   <style>
     .container {
       width: 300px;
       height: 300px;
       border: 1px solid black;
       display: table-cell;
       vertical-align: middle;
       text-align: center; /* 如果子元素是行内元素 */
     }
     .box {
       width: 50px;
       height: 50px;
       background-color: chartreuse;
       margin: 0 auto; /* 如果子元素是块元素 */
     }
   </style>
   <body>
     <div class="container">
       <div class="box"></div>
       <!-- <span>nihao</span> -->
     </div>
   </body>
   ```

#### 6. 如何根据设计稿进行移动端适配？

#### 7. 对Flex布局的理解及其使用场景

#### Grid布局

> https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

Grid 布局和 Flex 布局类似，也是拥有两类属性：`容器属性` 和 `项目属性`。

容器属性：

- grid-template-rows：定义每一行的行高，单位可以是px、%、fr；
- grid-template-columns：定义每一列的列宽；（有这两个属性，可以非常方便的实现两栏布局或者12栏布局）
- grid-row-gap：定义行间距；
- grid-column-gap：定义列间距；
- grid-gap：上述两个属性的简写；
- align-items：定义单元格内容的垂直位置；
- justify-items：定义单元格内容的水平位置；
- place-items：上述两个属性的简写；
- align-content：定义整个内容区在容器内的垂直位置；
- justify-content：定义整个内容区在容器内的水平位置；
- place-content：上述两个属性的简写；

项目属性：

- grid-column-start：定义项目左边框的位置；
- grid-column-end：定义项目右边框的位置；
- grid-column：上述两个属性的简写；
- grid-row-start：定义项目上边框的位置；
- grid-row-end：定义项目下边框的位置；
- grid-row：上述两个属性的简写。



### 定位与浮动

#### 1. 为什么需要清除浮动？清除浮动的方式

#### 解决高度塌陷

1. overflow 创建 BFC

   ```html
   <style>
     .container {
       width: 300px;
       border: 1px solid black;
       overflow: hidden;
     }
     .box {
       width: 50px;
       height: 100px;
       background-color: red;
       float: left;
     }
   </style>
   <body>
     <div class="container">
       <div class="box"></div>
     </div>
   </body>
   ```

2. 使用 clear

   ```html
   <style>
     .container {
       width: 300px;
       border: 1px solid black;
     }
     .box {
       width: 50px;
       height: 100px;
       background-color: red;
       float: left;
     }
     .clearfix::after {
       content: ''; /* 元素为空 */
       clear: both; /* 清除浮动 */
       display: block; /* 伪元素默认为行内元素，需要设为块元素，使其独占一行，否则会被挤到右边去，无效 */
     }
   </style>
   <body>
     <div class="container clearfix">
       <div class="box"></div>
     </div>
   </body>
   ```

   比如（没有设置 display：block）：

   ![](https://gitee.com/gainmore/imglib/raw/master/img/20210824214650.png)

#### 解决外边距折叠

1. overflow 创建 BFC

   ```html
   <style>
     .box1, .box2, .box3 {
       width: 100px;
       height: 100px;
       background-color: greenyellow;
       margin: 50px 0;
     }
     .container {
       overflow: hidden;
     }
   </style>
   <body>
     <div class="container">
       <div class="box1"></div>
     </div>
     <div class="container">
       <div class="box2"></div>
     </div>
     <div class="container">
       <div class="box3"></div>
     </div>
   </body>
   ```

2. clear

   ```html
   <style>
     .box1, .box2, .box3 {
       width: 100px;
       height: 100px;
       background-color: greenyellow;
       margin: 50px 0;
     }
     .clearfix::after {
       content: '';
       display: table;
     }
   </style>
   <body>
     <div class="cotainer clearfix">
       <div class="box1"></div>
     </div>
     <div class="cotainer clearfix">
       <div class="box2"></div>
     </div>
     <div class="cotainer clearfix">
       <div class="box3"></div>
     </div>
   </body>
   ```

   clearfix 合并（应用在容器元素上，用于消除外边距重叠和高度塌陷）：

   ```css
   .clearfix::after {
       content: '';
       display: table;
       clear: both;
   }
   ```

   

#### 2. 使用 clear 属性清除浮动的原理？

#### 3. 对BFC的理解，如何创建BFC

BFC 块级格式上下文。

特点：

1. 同一个 BFC 的相邻元素会外边距折叠；
2. BFC 不会和浮动元素重叠；
3. BFC 内的元素布局不会影响到 BFC 外部的元素布局；
4. BFC 在计算高度时会把浮动元素计算在内。

开启 BFC：

1. float：left || right；
2. position：absolute || fixed；
3. display：flex || table-cell || inline-block；
4. overflow：hidden || auto || scroll
5. 根元素 html，本身是一个 BFC

作用：

1. 清除浮动的影响
2. 防止外边距折叠
3. 自适应布局

#### 4. 什么是margin重叠问题？如何解决？

#### 5. 元素的层叠顺序

#### 6. position的属性有哪些，区别是什么

#### 7. display、float、position的关系

### 场景应用

#### 1. 实现一个三角形

```css
#tri {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid red;
}
```



#### 2. 实现一个扇形

```css
#shan {
    width: 0;
    height: 0;
    border-top: 10px solid red;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-radius: 10px;
}
```



#### 3. 实现一个宽高自适应的正方形

```css
#rect {
    width: 10%;
    height: 10vw;
    background: red;
}

/*-----------------------------------*/

#rect {
    width: 10%;
    height: 0;
    padding-top: 10%; /* padding 的百分比基于父元素的 width */
    background: red;
}

/*-----------------------------------*/

#rect {
    width: 10%;
    height: 0;
    overflow: hidden;
    background: red;
}
#rect::after {
    content: '';
    display: block;
    margin-top: 100%; /* margin 的百分比也是基于父元素的 width */
}
```



#### 4. 画一条0.5px的线

1. `transform: scale()`
2. `meta viewport`

#### 5. 设置小于12px的字体

- `transform: scale()`

#### 6. 如何解决 1px 问题？

> https://juejin.cn/post/6844903877947424782
>
> https://blog.csdn.net/u010059669/article/details/88953620
>
> https://juejin.cn/post/6994196887402184734

产生原因：

**设计图一般是二倍图或三倍图，在多倍的设计图中设计了1px的边框，在手机上缩小呈现时，1px的边框就会缩小，由于css最低只支持显示1px大小，所以边框依然会是1px。因此之所以边框较粗，实际上只是设计图整体缩小了，而1px的边框没有跟着缩小导致的。（ps：ios较新版已支持0.5px，这里暂且忽略）**

1. 伪元素 + scale

   - 1 条 border

     ```css
     .setOneBorder {
         width: 200px;
         height: 200px;
         position: relative;
         border: none; /* 隐藏父元素的边框 */
     }
     .setOneBorder::after{
         content: '';
         position: absolute; /* 伪元素设置绝对定位 */
         top: 0; /* 伪元素和父元素左上角对齐 */
         left: 0;
         background-color: green; /* 设置边框颜色 */
         display: block; /* 块元素独占一行 */
         width: 100%; /* 设置边框宽度 */
         height: 1px; /* 设置边框高度 */
         transform: scale(1, 0.5); /* 垂直方向缩小一半 */
     }
     ```

   - 4 条 border

     ```css
     .setBorderAll {
         width: 200px;
         height: 200px;
         position: relative;
         border: none; /* 隐藏父元素的边框 */
     }
     .setBorderAll::after{
         content: '';
         position: absolute; /* 伪元素设置绝对定位 */
         top: 0; /* 伪元素和父元素左上角对齐 */
         left: 0;
         border: 1px dashed green; /* 重新设置边框 */
         box-sizing: border-box;
         width: 200%; /* 将伪元素放大两倍 */
         height: 200%;
         transform: scale(0.5); /* 将伪元素缩小回原来的大小 */
         transform-origin: left top; /* 以左上角为中心缩小 */
     }
     ```

2. viewport + rem + js

   通过设置缩放，让 `CSS` 像素等于真正的物理像素。

   ```js
   const scale = 1 / window.devicePixelRatio;
   const viewport = document.querySelector('meta[name="viewport"]');
   if (!viewport) {
       viewport = document.createElement('meta');
       viewport.setAttribute('name', 'viewport');
       window.document.head.appendChild(viewport);
   }
   
   viewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
   
   // 设置根字体大小
   var docEl = document.documentElement; 
   var fontsize = 10 * (docEl.clientWidth / 320) + 'px'; 
   docEl.style.fontSize = fontsize;
   
   // 在CSS中用rem单位就行了
   
   ```

3. `box-shadow` 模拟边框

4. `svg` 实现





---

## Javascript

### 数据类型

#### 数据类型检测

1. typeof

   基本能检测大部分数据类型，有两个例外：

   - null  -->  'object'
   - Array  -->  'object'

2. instanceof

   - 只能检测引用数据类型
   - 本质上是查找实例原型链中是否有类型的原型对象

3. construtor

   - 不能检测 null 和 undefined 类型
   - 如果构造函数改变了原型对象，就不能通过这种方法判断了

4. Object.prototype.toString.call()

   基本上可以判断所有数据类型

5. Array.isArray()

   ES6语法，用于判断数组

6. isNaN()  /  Number.isNaN()

   ```js
   isNaN('test') // true，isNaN会先尝试将数据转换成number，如果不能转换则返回true
   isNaN('') // false, '' -> 0 -> number
   
   Number.isNaN('') // false, 会先判断是不是number，如果不是，返回false，如果是，再判断是不是NaN
   Number.isNaN(NaN) // true
   ```

   判断是否为 NaN，后者更为精确，不会将数据转为number

### ES6

#### 新特性

`赖箭扩双P`

- let const
- 箭头函数
- 扩展运算符
- Promise
- Proxy
- 解构
- 模板语法
- 字符串 api：`includes()  startsWith()  endsWith()  repeat()`

####  let、const、var的区别

`块变挂重暂初指`

1. 块级作用域

2. 变量提升

   编译时，会把所有用 var 声明的变量收集起来，放在头部，并且赋值为 undefined。

3. 挂载到全局变量

   本质上是，如果不用声明变量，会沿着作用域链一层层往上找，直到 window 对象，所以直接给为声明的变量赋值，会被挂载到全局变量 window 上。

4. 重复声明

5. 暂时性死区

   在相应花括号形成的作用域中，存在一个“死区”，起始于函数开头，终止于相关变量声明的一行。在这个范围内无法访问 let 或 const 声明的变量。

   在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用var声明的变量不存在暂时性死区。

6. 初始值设置

7. 指针指向修改

#### 箭头函数

- 箭头函数没有 prototype
- 箭头函数没有自己的 this
- 箭头函数没有 arguments

#### 扩展运算符

对象扩展运算符

数组扩展运算符

#### Proxy

Proxy 是 ES6 提出的一个构造函数，需要传入两个参数 target 和 handler。它可以构造出一个代理对象，这个代理对象可以代理目标对象 target 拦截某些操作。

handler 也叫拦截器，提供了 13 种方法，对应 13 种拦截操作，比如 get、set、has、deleteProperty 等操作。

相比于 `Object.defineProperty()`，Proxy 可以代理整个对象，而不用一层层的递归为每个属性添加添加代理，它可以完美的监听到任何方式的数据改变，缺点是兼容性不好。

#### Promise







### 浅拷贝

`如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值；如果是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。`

实现方式：

```js
// --------------------------1.Object.assign-----------------------------------
const obj1 = {sports: ['basketball', 'football', 'swim']}
const obj2 = {info: {name: 'obj2', gender: 'male', age: 10}}
// 第一个参数为{}，返回一个新对象
const newObj = Object.assign({}, obj1, obj2)
// 第一个参数不为{}，返回第一个参数
// Object.assign(obj1, obj2)

// 浅拷贝，地址共用
console.log(newObj);
obj1.sports[0] = 'basket'
obj2.info.age = 25
console.log(newObj);
newObj.sports[0] = '111'
newObj.info.name = '222'
console.log(obj1);
console.log(obj2);

// --------------------------2.扩展运算符-----------------------------------------
const obj1 = {
  sports: ['basket', 'football'],
  info: {
    name: 'obj1',
    gender: 'male'
  }
}
const newObj = {...obj1}
console.log(newObj);
// 浅拷贝，地址共用
obj1.sports[0] = 'basketball'
obj1.info.name = 'obj1111'
console.log(newObj);

// --------------------------3.slice-----------------------------------------
const arr = [
  {
    name: 'arr',
    age: 18
  },
  ['basket', 'football']
]
const newArr = arr.slice()
console.log(newArr);
// 浅拷贝，地址共用
arr[0].name = 'arr1111'
arr[1][0] = 'basketball'
console.log(newArr);

// --------------------------4.concat-----------------------------------------
const arr = [
  {
    name: 'arr',
    age: 18
  },
  ['basket', 'football']
]
const newArr = arr.concat()
console.log(newArr);
// 浅拷贝，地址共用
arr[0].name = 'arr1111'
arr[1][0] = 'basketball'
console.log(newArr);
```

手写：

```js
function shallowCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  const newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    // hasOwnProperty用于判断对象属性是否是实例上的属性，原型对象上的属性不算
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key] // 本质上，赋值的是内存地址
    }
  }
  return newObj
}
```

### 深拷贝

实现方式：

```js
// JSON.stringify()
const obj = {
  info: {
    name: 'obj'
  }
}
const newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj); // { info: { name: 'obj' } }
obj.info.name = 'obj111'
console.log(obj); // { info: { name: 'obj111' } }
console.log(newObj); // { info: { name: 'obj' } }

// 缺陷：拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。
// 比如：
const obj = {
  info: Symbol(),
  gender: undefined,
  getName() {
    console.log('getName');
  }
}
const newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj); // {}
```

手写：

```js
function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  const newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归实现引用类型的拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

### 对类数组对象的理解，如何转化为数组

类数组（伪数组）对象具有 length 属性和一些其它的属性，但是不能调用数组的原生方法。比如函数的 arguments 和 DOM 操作的获取结果。

伪数组转换成数组：

```js
function test() {
  console.log(arguments)
  // 1. slice
  const arr = Array.prototype.slice.call(arguments)
  // 2. splice
  const arr = Array.prototype.splice.call(arguments, 0)
  // 3. Array.from()
  const arr = Array.from(arguments)
  // 4. 扩展运算符
  const arr = [...arguments]
  console.log(arr)
}

test(1,2,3,4,5,6)
```

### 常见的DOM操作

查询：

```js
document.getElementById()
document.getElementByTagName()
document.getElementByClassName()
document.querySelector()
document.querySelectorAll()
```

创建：

```js
document.createElement()
node.cloneNode()
```

删除：

```js
container.removeChild()
```

修改：

```js
container.insertBofore()
container.appendChild()
```

### 作用域

> 编译时就确定好了

作用域是定义变量的区域，它有一套访问变量的规则，通过这套规则可以访问到代码内各个区域内的变量。

作用域又分为**全局作用域**、**函数作用域**还有**块级作用域**。

查找变量时，会从当前作用域中查找该变量，如果找不到就从父级作用域中查找，这样一层层从内到外查找变量，直到全局作用域，这种变量查找的次序就叫做作用域链。

### 执行上下文

> 执行时才创建

执行上下文可以分为**全局执行上下文**、**函数执行上下文**和 **eval 函数执行上下文**。

- 任何不在函数内部的上下文都是全局执行上下文，一个程序只有一个全局执行上下文；
- 当函数被调用时，就会创建一个函数执行上下文，一个程序中可以有多个函数执行上下文；
- eval 函数有自己的执行上下文。

JS 引擎通过执行上下文栈管理所有的执行上下文。

当 JS 执行全局代码时，会创建一个全局执行上下文，然后把它压入到执行上下文栈中，当调用函数时，就会创建一个函数执行上下文并把它压入到栈顶。JS 引擎会首先执行栈顶的上下文，执行完成之后就把上下文弹出栈，最后执行完所有代码之后把全局执行上下文弹出，程序执行完毕。

### 创建对象的方式

1. 字面量模式

   {}创建，**简单方便，但要创建多个对象时，代码冗余**。

2. 工厂函数模式

   **用函数封装创建对象的细节，但只是复用了代码，没有建立起对象和类型之间的联系**。

   > 工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系

3. 构造函数模式

   每一个函数都是构造函数，可以通过new来调用。**缺点是如果对象中包含函数，那么每一个创建的对象中都要相同的函数空间，浪费了不必要的内存空间**。

   > js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

4. 原型模式

   可以向构造函数的原型对象中添加公用属性和方法，**缺点就是如果是引用类型的话比如Array，那么所有的对象实例都会共用引用类型的内存，容易造成数据的篡改**。

   > 因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

5. 构造函数 + 原型模式

   组合了构造函数模式和原型模式，**通过构造函数模式可以初始化对象的属性，利用原型模式设置对象的公共方法**。
   
   > 这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

### 继承的方式

1. 原型链继承

   子类构造函数的原型对象指向父类构造函数的实例。

   缺点：

   - 当父类的原型对象包含有引用类型的数据时，会被所有实例共享，容易造成数据的篡改。
   - 创建子类型时不能向父类型传递参数。

   ```js
    function Super() {
     this.name = 'super_name'
     this.age = 'super_age'
   }
   Super.prototype.sayName = function() {
     console.log(this.name);
   }
   
   function Sub(gender) {
     this.gender = 'sub_gender'
   }
   
   Sub.prototype = new Super()  // 修改子类的原型对象，使之指向父类的实例
   Sub.prototype.construtor = Sub
   
   const sub = new Sub()
   sub.sayName() // super_name
   ```

   

2. 构造函数继承

   在子类构造函数中调用父类构造函数，解决了子类不能向父类传递参数的问题。

   缺点：不能继承父类原型对象中的属性和方法。

   ```JS
   function Super() {
     this.name = 'super_name'
     this.age = 'super_age'
   }
   Super.prototype.sayName = function() {
     console.log(this.name);
   }
   
   function Sub() {
     Super.call(this)
     this.gender = 'sub_gender'
   }
   const sub = new Sub()
   console.log(sub.name);  // 只能继承父类在构造函数中的属性或方法，不能继承原型链中的属性或方法
   console.log(sub.age);
   console.log(sub.gender);
   ```

   

3. 组合继承

   结合了原型链继承和构造函数继承。

   缺点是整个过程调用了两次父类的构造函数，会在子类的原型对象和实例对象中创建两份相同的属性或方法。

   ```js
   function Super() {
     this.name = 'super_name'
     this.age = 'super_age'
   }
   Super.prototype.sayName = function() {
     console.log(this.name);
   }
   
   function Sub() {
     Super.apply(this) // 第二次调用Super()：给sub实例写入两个属性name，age
     this.gender = 'sub_gender'
   }
   
   Sub.prototype = new Super() // 第一次调用Super()：给Sub.prototype写入两个属性name，age
   Sub.prototype.construtor = Sub
   const sub = new Sub()
   console.log(sub.name); // 通过上述两种方式的组合，实现了构造函数和原型链中的继承
   console.log(sub.age);
   console.log(sub.gender);
   sub.sayName() 
   // 缺点：是在创建子类对象的过程中调用了两次父类构造函数，使得子类的实例对象和原型对象中有两份相同的属性/方法。
   ```

   

4. 寄生组合继承

   是组合继承的改进，寄生组合继承创建了空的实例对象，将其指向了父类的原型对象，这样在构造函数里面执行的初始化不会作用到创建的实例对象上，从而避免了属性或方法的重复。

   ```js
   function Super() {
     this.name = 'super_name'
     this.age = 'super_age'
   }
   Super.prototype.sayName = function() {
     console.log(this.name);
   }
   
   function Sub() {
     Super.apply(this) // 第二步，新建子类实例时，调用父类构造函数，继承其属性/方法
     this.gender = 'sub_gender'
   }
   
   (function() {
     let prototype = Object.create(Super.prototype) // 第一步，根据父类的原型对象创建一个实例对象（和直接使用 new 创建实例对象相比，不会执行构造函数里面的代码，相当于创建的是一个空的实例对象，将实例对象的 __proto__指向 prototype）
     Sub.prototype = prototype // 使子类原型对象指向这个空的实例对象
     prototype.constructor = Sub
   })()
   
   const sub = new Sub()
   
   console.log(sub.name); // 通过上述两种方式的组合，实现了构造函数和原型链中的继承
   console.log(sub.age);
   console.log(sub.gender);
   sub.sayName() 
   ```

   

5. class的extends继承

   extends后面加上父类class的形式继承，通常需要在constructor中调用super函数，完成对父类数据的初始化。

### 原型、原型链

在 JS 中可以通过构造函数来创建对象，每个构造函数都有一个 prototype 属性，这个 prototype 指向的一个 Object 对象，也叫做原型对象，可以向原型对象里面添加公用的属性和方法，所有实例都会共享这些属性和方法。另外，prototype 属性中还有一个 constructor 属性，指向了构造函数。

所有实例对象中都会有一个 \__proto\__ 属性，它指向的是构造函数的原型对象，当我们在实例中查找属性时，如果在当前实例中找不到该属性，就会到 \__proto\__ 指向的内存中查找，如果找不到，就会再去 \__proto\__ 中找，直到 \__proto\__ 为空，这也就叫做原型链，查找变量时会顺着这条原型链一层层往上找。

### 闭包

闭包是指有权访问另一个函数作用域中变量的函数，形成闭包需要两个条件：在函数内创建一个嵌套函数、嵌套函数有对外部函数变量的引用。

闭包有两个常用的作用：

- 使函数外部可以访问到函数内部的变量，可以创建私有变量。
- 使函数执行完之后，函数内部的变量不会立马被销毁，而是留在内存中。

应用场景：

1. 防抖函数、节流函数
2. 单例模式的实现
3. IIFE 自执行函数，可能会引用外部变量
4. 定时器中的回调函数，可能会引用外部变量

### Iterator Generator

Iterator 为各种数据结构提供一个统一的、简便的访问接口，主要用于 ES6 中的 for...of 循环。

当给一个对象添加 `[Symbol.iterator]` 属性后，对象就会变为可迭代对象，就可以使用 for...of 遍历。

这个属性是一个函数，函数必须返回一个对象，这个对象必须包含一个 next 函数，next 函数必须返回一个对象，这个对象必须要有 value 和 done 两个字段，value 表示当前遍历的值，done 表示是否遍历完。

Generator 函数可以说是 Iterator 接口的具体实现方式。可以通过 yield 代替 返回的 next 函数，更加简便。

```js
const person = {
  info: {
    name: 'John',
    gender: 'male',
    address: 'beijing',
    age: 18
  }
}

// 使用普通函数构造迭代器
person[Symbol.iterator] = function() {
  let info = this.info
  let keys = Reflect.ownKeys(info) // 键名
  let index = 0 // 指针索引
  return {
    next() {
      if (index < keys.length) {
        return {
          done: false, // 是否遍历完成
          value: info[keys[index++]] // 当前值
        }
      } else {
        return {
          done: true,
          value: undefined
        }
      }
    }
  }
}

// 使用Generator构造迭代器
person[Symbol.iterator] = function * () {
  let info = this.info
  let keys = Reflect.ownKeys(info)
  let index = 0
  while (true) {
    if (index < keys.length) {
      yield info[keys[index++]] // 相当于next函数
    } else {
      return false
    }
  }
}

for (let i of person) {
  console.log(i); 
  // John
  // male
  // beijing
  // 18
}
```



### 垃圾回收

参考：https://juejin.cn/post/6844903833387155464

垃圾回收有两种方法：**标记清除**、**引用计数**（不常用）。

标记清除：

- 当变量进入执行环境，就给变量标记为 `进入环境`，被标记为 `进入环境` 的变量不能被回收，因为它们正在被使用；

- 当变量离开执行环境，就会被标记为 `离开环境` ，被标记为 `离开环境` 的变量就会被内存释放；

- ```js
  var m = 0,n = 19 // 把 m,n,add() 标记为进入环境。
  add(m, n) // 把 a, b, c标记为进入环境。
  console.log(n) // a,b,c标记为离开环境，等待垃圾回收。
  function add(a, b) {
    a++
    var c = a + b
    return c
  }
  ```

引用计数：

- 当一块内存被一个变量引用，这块内存的引用次数就 + 1；
- 当这块内存不再被变量引用，这块内存的引用次数就 - 1；
- 当引用次数为 0 时，这块内存就成了垃圾对象，会被回收；
- 但这种方法会引起**循环引用**的问题，如两个对象通过属性进行相互引用，它们的引用次数就不会0，所以会一直存在内存当中。

### 减少垃圾回收

- 对数组进行优化

  在清空数组时，尽量不要使用给数组重新赋一个空数组的方式，而是将数组长度设置为 0，这样不仅能少创建一个数组，而且可以复用原来的数组。

  ```js
  const arr = [1,2,3,4]
  // arr = [] // 尽量不要这么做
  arr.length = 0
  console.log(arr) // []
  ```

  

- 对对象进行优化

  尽量复用对象，对于不用的对象，把它赋值为 null，让它尽快被回收。

- 对函数进行优化

   在循环中的函数表达式，如果可以复用，尽量放在函数的外面，如果不用的函数，把它赋值为 null，让它尽快被回收。

### 内存泄漏

1. 意外的全局变量
   - 没有对变量进行声明，让它变成了一个全局变量；
   - 或者在函数内存使用了 this 添加变量，而函数是通过全局调用的，那么也会增加一个意外的全局变量；
   - 解决方法可以在 JS 文件头部添加 `use strict`，这样就会开启严格模式，避免这种情况发生。
2. 被遗忘的定时器或者回调函数
   - 设置了一个定时器，但忘记将它取消，如果回调函数里面有对外部变量的引用的话，那么变量就会一直存在内存当中。
3. 没有清理的 DOM 引用
   - 获取了一个 DOM 元素，而后 DOM 元素被删除，然而一直保留着对这个 DOM 元素的引用，所以这个 DOM 元素会一直留在内存中，无法被回收。
4. 闭包
   - 不合理的使用闭包，导致某些变量一直留在内存中。

### V8垃圾回收

V8 引擎采用的是分代式垃圾回收。在堆内存中分为新生代空间和老生代空间，新生代采用的是 `Scavenge算法`，而老生代早先采用的是`引用计数`，后来采用了`标记清除`，之后又改进为`标记整理`。

Scavenge 算法主要是在进行垃圾回收时，给新生代中的 From 空间里的不活动对象打上标记，然后将活动对象复制到 To 空间里，之后再清除 From 空间的所有对象，将 From 空间和 To 空间进行交换，如此往复。

当对象进行了一次 Scavenge 算法或者 To 空间里的内存大于 25% 时，就会将对象转移到老生代空间中，这个过程称为对象晋升。

老生代一开始采用的引用计数方法，指的是创建一个对象，如果该对象被一个变量引用，那么这个对象的引用次数 +1，失去一个变量的引用，那么引用次数 -1，当引用次数变为 0 时，这个对象就成了垃圾对象，被 GC 回收。

由于这个方法存在循环引用问题，所以后来采用了标记清除算法。标记清除算法分为 `标记` 和 `清除` 两个阶段，在标记阶段，垃圾回收器会从所有根节点出发，遍历所有可以访问到的节点，将可以访问到的节点标记为活动对象，不能访问到的则标记为不活动，视为垃圾对象。在清除阶段，垃圾回收器会释放所有垃圾对象的内存。

而由于标记清除算法会造成剩余空间不连续，容易产生内存碎片，所以提出了标记整理算法，这个算法在标记阶段和标记清除算法相同，只是在标记结束后，会把所有活动对象移到内存的一端上，使剩余内存变成一段连续的空间。

### 实现无缝轮播

轮播图一般需要三个组件，分别是图片、左右箭头和圆点。一般会封装两个函数：nextImg，prevImg。nextImg 负责切换下一张图片，prevImg 负责切换上一张图片。然后创建一个 Interval 定时器，回调函数为 nextImg，表示每隔一段时间就切换下一张图片。然后给左箭头绑定一个点击事件，回调函数为 prevImg，给右箭头绑定一个点击事件，回调函数为 nextImg，实现手动切换图片。

之后，会创建一个 index 变量，表示当前轮播图片的索引，每进行一次轮播，index 会随之改变，使得图片组的 translateX() 值改变，实现图片左右切换的效果，同时会改变圆点的样式。

实现无缝轮播的效果需要复制两张图片，如果现在有三张图片需要轮播，一般会在复制第一张图片到这组图片的末尾，然后复制第三张图片到这组图片的开头，这两张图片作为跳板，实现无缝轮播的效果。当用户在图片组的中间位置进行切换时，会结合 transition 属性实现过渡效果，如果切换到边界位置，比如第三张图片切换到末尾的跳板图片，会开启一个定时器，当切换完成后，将 index 值变为 1，并且不设置 transition 属性，表示瞬间切换到第一张图片，由于末尾的跳板图片和第一张图片是相同的，所以用户察觉不到图片的变换，从而实现无缝切换。



---

## Vue

### Vue基础

#### 1. Vue的基本原理

#### 2. 双向数据绑定的原理

#### 3. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

不能监听到数组的变化以及对象的属性增加。

#### 4. MVVM和MVC的区别

MVVM

- View，视图层，负责页面的展示，一般由 html 和 css 构建；
- Model，数据逻辑层，相当于后端的 api 接口；
- ViewModel，视图数据层，和 View 层进行了双向绑定，相当于 Vue 里面的 data、methods 这类代码，用于描述视图状态或者行为。

MVC

- View，视图层，负责页面展示；
- Model，数据层，负责数据的存储以及修改；
- Controller，控制层， 当用户与页面产生交互时，controller 会开始工作，然后通知 model 进行数据修改，然后 model 再通知 view 进行页面更新。

#### 5. Computed和Watch的区别

- computed 是计算属性，它可以缓存值，只有当它依赖的属性发生改变时，computed 的值才会改变；
- watch 可以监听属性，没有缓存性，当监听的属性改变时就会执行回调，而且可以监听异步操作。

#### 6. Computed 和 Methods 的区别

#### 7. slot是什么？有什么作用？原理是什么？

#### 8. 过滤器的作用，如何实现一个过滤器

#### 9. 如何保存页面的当前的状态

#### 10. 常见的事件修饰符及其作用

- `.stop` 阻止事件冒泡，相当于 `event.stopPropagation()`
- `.prevent` 阻止默认事件的发生，相当于 `event.preventDefault()`
- `.once` 事件只触发一次
- `.capture` 事件在捕获阶段触发
- `.native` 把组件变成一个普通标签，使其可以触发原生事件
- `.self` 表示事件只能由自身触发，而不能在冒泡或捕获阶段触发

#### 11. v-if、v-show、v-html 的原理

#### 12. 

#### 13. v-if和v-show的区别

- v-if 会根据条件动态的向 DOM 树中增加或删除元素，而且是惰性的，当条件为假时，什么也不会做；
- v-show 无论条件真假都会渲染元素，通过 css 的 display 属性控制元素的显示和隐藏；
- v-show 适合切换频繁的场景，而 v-if 适合切换不那么频繁的场景。

#### 14. v-model 是如何实现的，语法糖实际是什么？

#### 15. v-model 可以被用在自定义组件上吗？如果可以，如何使用？

#### 16. data为什么是一个函数而不是对象

#### 17. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？

#### 18. $nextTick 原理及作用

#### 19. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

#### 20. Vue中封装的数组方法有哪些，其如何实现页面更新

#### 21. Vue 单页应用与多页应用的区别

#### 22. Vue template 到 render 的过程

#### 23. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

#### 24. 简述 mixin、extends 的覆盖逻辑

#### 25. 描述下Vue自定义指令

#### 26. 子组件可以直接改变父组件的数据吗？

#### 27. Vue是如何收集依赖的？

#### 28. 说一下对 React 和 Vue 的理解，它们的异同

#### 29. Vue的优点

#### 30. assets和static的区别

#### 31. delete和Vue.delete删除数组的区别

#### 32. vue如何监听对象或者数组某个属性的变化

#### 33. 什么是 mixin ？

#### 34. Vue模版编译原理

#### 35. 对SSR的理解

#### 36. Vue的性能优化有哪些

#### 37. 对 SPA 单页面的理解，它的优缺点分别是什么？

SPA 即单页面应用，是指在页面初始化时就加载完所有的 html、JavaScript、css，一旦加载完成就不会因为内容变换而重新加载页面，而是利用路由机制实现内容的变换。

优点：

1. 内容的变换不需要重新加载整个页面，用户体验好；
2. 对服务器的压力小；
3. 便于前后端分离。

缺点：

1. 初次加载比较耗时；
2. 单页应用在一个页面加载完所有内容，所以不能使用浏览器的前进后退功能；
3. SEO 难度较大，因为所有内容在一个页面中动态替换显示。

#### 38. template和jsx的有什么分别？

#### 39. vue初始化页面闪动问题

#### Class 与 Style 如何动态绑定？

都可以通过对象语法和数组语法绑定。

```js
// class
:class = "{ active: isActive }" // 对象语法
:class = "[ isActive ? 'active' : '' ]" // 数组语法

// style
:style = "{ color: boxColor }" // 对象语法
:style = "[ boxColor ]" // 数组语法
color = {
    color: 'red'
}
```

#### 怎样理解 Vue 的单向数据流？

父组件的 data 更新会影响到子组件的 props 属性，但反过来却不行，而且在子组件中也不能直接去修改 props 属性，这样会报错。这种单向数据流可以防止子组件意外的修改父组件的数据。

子组件要修改 props 的属性可以：

- 通过 $emit 发送自定义事件，然后通知父组件修改 data 属性；
- 子组件将 props 属性赋值给一个 data 属性，直接修改 data 属性。

#### Vue 不能检测到变化的情况

https://cn.vuejs.org/v2/guide/reactivity.html

1. 对于对象：

   - 不能直接往 data 中添加根级别的响应式属性，比如：

     ```js
     var vm = new Vue({
       data:{
         a:1
       }
     })
     
     // `vm.a` 是响应式的
     
     Vue.set(vm, 'b', 2) // 无法向 data 添加根属性 b
     vm.b = 2            // 无法向 data 添加根属性 b
     ```

   - 但是可以通过 `Vue.set(object, propertyName, value)` 方法向**嵌套的对象**中添加响应式属性，比如：

     ```js
     var vm = new Vue({
       data:{
         a:1,
         info: {}
       }
     })
     
     vm.info.name = 'Tom' // 只能添加普通属性，不能添加响应式属性
     
     Vue.set(vm.info, 'name', 'Tom') // `vm.info.name` 是响应式的
     ```

     ![image-20210829085903768](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20210829085903768.png)

2. 对于数组：

   ```js
   var vm = new Vue({
       el: '#app',
       data: {
           sports: ['basketball', 'football', 'tennis']
       }
   })
   ```

   Vue 不能检测以下数组的变动：

   1. 当你利用索引直接设置一个数组项时，例如：`vm.sports[0] = 'basket'`
   2. 当你修改数组的长度时，例如：`vm.sports.length = 7`

   这两种操作虽然可以修改属性的值，但却无法触发视图更新。

   为了解决这一问题，可以使用如下两种方法：

   1. `Vue.set(vm.sports, 0, 'basket')`
   2. `vm.sports.splice(0, 1, 'basket')`

#### nextTick(异步更新队列)

Vue 在更新 DOM 是异步执行的。只要监听到数据变化，Vue 就会开启一个异步更新队列，并把在同一个事件循环的所有数据变更都缓存起来。如果同一个 watcher 触发了多次，只会保存最新的一次变化。然后，在下一个事件循环中，Vue 才会刷新队列并更新视图。

Vue.nextTick(callback) / this.$set(callback) 里的回调函数会在 DOM 更新完成后调用。

nextTick() 返回的是一个 Promise 对象。

#### 父组件可以监听到子组件的生命周期吗？

可以

- 通过子组件 $emit 发送自定义个事件给父组件
- 在父组件中调用子组件的 @hook 监听函数

#### Vue有几类Watcher？

> https://blog.csdn.net/qq_40413670/article/details/117714765

1. data 里面的 Watcher；
2. computed 里面的 Watcher；
3. 用户自定义的 Watcher，即 watch 属性，可以定义 deep 和 immediate 属性。

#### Vue封装组件

Vue 实现组件的封装主要是靠三个属性：prop、event、slot。

prop 用于父组件向子组件传递参数，event 用于子组件向父组件传递参数，slot 用于父组件向子组件传递内容节点。

比如二次封装 Echarts：

```vue
// 封装：
<template>
  <div :ref="id" />
</template>

<script>
import echarts from 'echarts'
// 监听元素大小（尺寸）变化
import { addListener, removeListener } from 'resize-detector'
// 防抖
import debounce from 'lodash/debounce'
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: 'chartDom'
    }
  },
  data() {
    return {
    }
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(this.option)
      },
      deep: true
    }
  },
  created() {
    // 防抖，性能优化
    this.resizefn = debounce(this.resize, 300)
  },
  mounted() {
    this.renderCharts()
    // 监听元素尺寸变化
    addListener(this.$refs[this.id], this.resizefn)
  },
  beforeDestroy() {
    // 移除监听器
    removeListener(this.$refs[this.id], this.resizefn)
    // 销毁echarts实例
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize() {
      this.chart.resize()
    },
    // 初始化
    renderCharts() {
      this.chart = echarts.init(this.$refs[this.id])
      if (this.option) {
        this.chart.setOption(this.option)
      }
      const _this = this
      // 注册点击事件
      this.chart.on('click', function(params) {
        _this.$emit('onClick', params)
      })
    }
  }
}
</script>

// 使用：
<template>
  <div>
    <h5 style="text-align:center;">echarts图表的封装</h5>
    <Charts v-if="chartOption" :option="chartOption" style="height:600px;"></Charts>
  </div>
</template>
<script>
import Charts from './components/Charts'
export default {
  components: {
    Charts
  },
  data() {
    return {
      chartOption: null
    }
  },
  created() {
    this.getChartsData()
  },
  methods: {
    getChartsData() {
      setTimeout(() => {
        this.chartOption = {
          title: {
            text: '疯狂测试'
          },
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'pie',
            data: [100, 150, 50, 200, 120, 300]
          }]
        }
      }, 1000)
    }
  }
}
</script>
```





---

### 生命周期

#### 1. 简单说一下Vue的生命周期

Vue 实例会经历：开始创建、初始化数据、编译模板、挂载DOM、渲染更新、渲染卸载等一系列过程，这就是生命周期。

生命周期总共会涉及到十个钩子函数。

- beforeCreate: 这个阶段 Vue 实例刚开始创建，还不能访问 data、computed、methods、watch 里的属性和方法。
- created: 这个阶段实例已经创建完成，可以访问所有的 options，但此时还没进行模板编译，不能访问 $el 属性。
- beforeMount: 这个阶段完成了模板编译（template、outerHTML、render），将模板中的一些属性（插值表达式）替换成了 data 中的数据，但此时还没有将 DOM 挂载到页面上。
- mounted：这个阶段编译好的 DOM 挂载到页面上，然后 vue 实例增加了 $el 属性。
- beforeUpdate: 响应式数据更新时就会触发该钩子函数，但此时页面视图还没有更新。
- updated：这个阶段页面视图已经完成了更新。
- beforeDestroy：实例销毁前触发该钩子函数，但此时实例还可以被调用。
- destroyed：这个阶段实例完全销毁，数据、事件监听器、子实例全部被移除。
- activated： keep-alive 缓存组件被激活时触发。
- deactivated：keep-alive 缓存组件被切换时触发。

#### 2. Vue 的父组件和子组件生命周期钩子执行顺序是什么

1. 加载渲染过程
   - 父：beforeCreate
   - 父：created
   - 父：beforeMount
   - 子：beforeCreate
   - 子：created
   - 子：beforeMount
   - 子：mounted
   - 父：mounted
2. 更新过程
   - 父：beforeUpdate
   - 子：beforeUpdate
   - 子：updated
   - 父：updated
3. 销毁过程
   - 父：beforeDestroy
   - 子：beforeDestory
   - 子：destroyed
   - 父：destroyed

#### 3. Vue 子组件和父组件执行顺序

#### 4. created和mounted的区别

#### 5. 接口请求一般放在哪个生命周期中？

### 组件通信

#### 1. props  /   $emit

实现父子组件的数据通信。

props：父组件向子组件传递数据

$emit：子组件向父组件传递数据

#### 2. eventBus事件总线（$emit / $on）

实现任意组件的数据通信。

eventBus 本质上是一个新建的 Vue 实例。

#### 3. 依赖注入（provide / inject）

实现隔代组件的数据通信。

provide 和 data 用法形式一样，用于父组件提供出数据。

inject 是一个数组，用于接收数据。

#### 4. ref / refs

实现父子组件的数据通信。

给子组件一个 ref 属性，然后通过 this.$refs[xxx] 获取到子组件实例。

#### 5. $parent / $children

实现父子组件的数据通信。

$parent 是上一级父组件的实例，它是一个对象。

$children 是所有子组件的实例，它是一个数组。

#### 6. $attrs / $listeners

实现隔代组件的数据通信。

$attrs: 继承了所有父组件的属性。

$listener: 包含了组件所有的事件监听器。

#### 7.vuex

实现任意组件的数据通信。

### 路由

#### vue-router 中常用的 hash 和 history 路由模式实现原理

1. hash 模式
   - URL 的哈希值是浏览器的一种状态，向服务器发送请求的时候，URL 的 hash 部分不会被发送；
   - hash 值的改变都会在浏览器的访问历史中增加一个记录，可以通过浏览器的前进后退按钮控制 hash 的切换；
   - 通过 location.hash 改变 hash 值；
   - 可以监听 hashchange 事件监听 hash 的变化，从而控制页面的跳转（`window.onhashchange = function(){}`）。
2. history 模式
   - history 模式通过 `window.history` 的 pushState 和 replaceState 这两个 API 实现的，前者会增加一个历史记录，后者会替换当前历史记录；
   - 通过监听 popstate 事件监听 url 的变化，从而控制页面的跳转（`window.onpopstate = function() {}`）；
   - pushState 和 replaceState 不会触发 popstate 事件，需要使用 history 的 go、back、forward 跳转页面；
   - history 需要前后端的配置，兼容性不是很好。

#### 1. Vue-Router 的懒加载如何实现

#### 2. 路由的hash和history模式的区别

#### 3. 如何获取页面的hash变化

#### 4. $route和 $router 的区别

#### 5. 如何定义动态路由？如何获取传过来的动态参数？

#### 6. Vue-router 路由钩子在生命周期的体现

#### 7. Vue-router跳转和location.href有什么区别

#### 8. params和query的区别

#### 9. Vue-router 导航守卫有哪些

全局导航守卫：

- beforeEach
- beforeResolve
- afterEach

路由独享守卫：

- beforeEnter

组件内守卫：

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

### Vuex

#### 1. Vuex 的原理以及自己的理解

Vuex 是 Vuejs 开发的状态管理模式。一个 vuex 的核心就是一个 store（仓库），store 里面包含了大部分的 state 状态。

Vuex 里的状态都是响应式的，而且改变状态的唯一途径是通过 commit Mutation。

Vuex 主要包含五个部分：state、getters、mutations、actions 和 modules。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210829154348.png)

#### 2. Vuex中action和mutation的区别

mutation 只能进行同步操作，用于修改 state，mutation 的函数参数是 state，通过 vuex 实例调用 commit 可以触发 mutation 函数。

action 可以进行异步操作，通过 commit mutation 间接修改 state，action 的函数参数是 context，context 就是一个 vuex 实例，包含 state 和 getters，通过调用 vuex 实例的 dispatch 可以触发 action 函数。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++      // 变更状态
    }
  }
})
store.commit('increment')


const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
store.dispatch('increment')
```

### Vue3

#### 1.vue3.0版本新特性有哪些?

1. Composition API

   Vue3 引入了 Composition API，相比于 Vue2 的 Options API，Composition API 可以带来更好的代码组织和逻辑复用。

   比如，可以将公用的一段代码封装到一个函数中，以 useXxx 的格式命名，然后在需要的组件中引入这个函数。一般会在组件的 setup() 函数中用解构的方式引入这个函数中的变量，然后 return 这些变量，在模板中用插值表达式引用这些变量。

2. reactive、ref、toRef 和 toRefs

   Vue3 中使用 reactive 封装响应式对象，用 ref 封装响应式的值类型数据，toRef 和 toRefs 用于将 reactive 对象解构单个或全部响应式属性。（这些属性都会用在 Composition API 中）

3. Proxy
   Vue3 响应式数据的监测是基于 ES6 中的 Proxy。

4. 生命周期

   Vue3 的生命周期可以分为 Composition API 的生命周期和 Options API 的生命周期。

   Options API 和 Vue2 差不多，除了 beforeDestroy 变成 beforeUnmount 和 destroyed 变成 unmounted 之外，其他钩子函数都一样。

   Composition API 有六个生命周期钩子函数：onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount 和 onUnmounted，这些钩子函数要插入到 setup() 函数中，setup() 函数就相当于 beforeCreate 和 created。

5. createApp
   Vue3 用 createApp 方法创建一个 vue 实例。

#### 2.proxy相比于2.0有什么优势？

1. Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。
2. Proxy 可以监听数组的变化。

而 Object.defineProperty() 不能监听到**对象属性的增加和删除**，也不能监听到**数组通过下标的修改和长度的变化**。

### 虚拟DOM

h 函数 - 将对象转换为虚拟节点；

patch 函数 - 比较新旧节点的差异，将差异修补到旧节点上，实现 DOM 的更新；

diff 算法 - 通过 diff 算法比较新旧节点的差异，实现 DOM 的最小量更新。

### keep-alive实现原理

> https://www.jianshu.com/p/9523bb439950

keep-alive 作用？

**keep-alive 用于保存组件的渲染状态，当使用 keep-alive 包裹动态组件时，会缓存不活动的组件，而不是销毁它们。**

keep-alive 有三个常用属性：include、exclude、max。

- include 是缓存白名单，被命中的组件会缓存；
- exclude 是缓存黑名单，被命中的组件不会缓存；
- max 是缓存组件的上限，超出上限的组件会按照 LRU 策略置换缓存数据。



keep-alive 源码？

keep-alive 本质上是 Vue 实现的一个抽象组件。在源码中也是通过 export 这种方式导出一个对象，该对象共有以下几个部分：

- `name: keep-alive`，组件名称。
- `abstract: true`，表示 keep-alive 是一个抽象组件，在构建组件树的时候会忽略这个组件，所以 keep-alive 相关的节点也不会出现在 DOM 树上。
- `props: {}`，其中包含 include、exclude 和 max 三个属性，分别表示缓存白名单，缓存黑名单和缓存上限。
- `created() {}`，在这个钩子函数中，初始化 cache 和 keys 两个对象，分别表示缓存的 vnode 和 vnode 对应的键。
- `mounted() {}`，在这个钩子函数中，对 include 和 exclude 这两个属性进行监听，然后通过 pruneCache 这个函数实时地更新或删除 cache 对象的数据。
- `destroyed() {}`，在这个钩子函数中，遍历 cache 对象，通过调用 pruneCacheEntry 删除缓存的 vnode。
- `render() {}`：
  1. 获取 keep-alive 包裹的第一个子组件对象及组件名（所以 keep-alive 一般只有一个子元素：动态组件或 router-view）；
  2. 根据设置的黑白名单进行条件匹配，决定是否缓存。如果不匹配，直接返回组件实例，否则进行下一步；
  3. 根据组件 ID 和 tag 生成缓存 key，并在 this.cache 对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该 key 在 this.keys 中的位置（更新 key 的位置是实现 LRU 置换策略的关键），否则进行下一步；
  4. 在 this.cache 对象中存储该组件实例并保存 key 值，之后检查缓存实例的数量是否超过 max 值，如果超过则根据 LRU 置换策略删除最近最久未使用的实例（即下标为 0 的 key）；
  5. 最后，将组件实例的 keepAlive 属性值设置为 true，表示组件被缓存，不再触发 created、mounted 这些钩子函数。







---


## 手写代码

### Javascript基础

#### 1. Object.create

```js
function create(obj) { // 将传入的对象作为原型
    function F() {} // 定义一个函数对象
    F.prototype = obj // 将函数对象的显示原型指向 obj
    return new F() // 生成一个实例对象，实例对象的隐式原型指向 obj
}
```



#### 2. instanceof

```js
function myInstanceof(instance, constructor) {
  let proto = Object.getPrototypeOf(instance)
  let prototype = constructor.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

const rst = myInstanceof(1, Number)
console.log(rst)
```



#### 3. new

```js
function myNew(constructor, args) {
    if (typeof constructor !== 'function') {
        throw new Error('Type Error!')
    }
    const newObj = Object.create(constructor.prototype) // 创建实例对象（空对象）
    const result = constructor.apply(newObj, args) // 实例对象属性初始化
    const flag = result && (typeof result === 'object' || typeof result === 'function')
    return flag ? result : newObj // 如果构造函数执行结果是对象或函数则返回它，否则返回实例对象
}
```



#### 4. Promise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
		this.status = PENDING
         this.value = undefined
         this.reason = undefined
         this.resolvedCallbacks = []
         this.rejectedCallbacks = []
         const resolve = value => {
             if (value instanceof MyPromise) {
                 value.then(resolve, reject)
             }
             if (this.status === PENDING) {
                 this.value = value
                 this.status = RESOLVED
                 this.resolvedCallbacks.forEach(callback => {
                     callback(value)
                 })
             }
         }
         const reject = reason => {
             if (this.status === PENDING) {
                 this.reason = reason
                 this.status = REJECTED
                 this.rejectedCallbacks.forEach(callback => {
                     callback(reason)
                 })
             }
         }
         try {
             executor(resolve, reject)
         } catch (ex) {
             reject(this.reason)
         }
    }
    then(onfulfilled, onrejected) {
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
         onrejected = typeof onrejected === 'function' ? onrejected : error => { throw new Error(error) }
         if (this.status === PENDING) {
             this.resolvedCallback.push(onfulfilled)
             this.rejectedCallback.push(onrejected)
         }
        if (this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onrejected(this.reason)
        }
    }
}
```



#### 5. 手写 Promise.then

#### 6. 手写 Promise.all

> 应用场景：发送 a、b、c 三个请求，希望按顺序返回响应结果，可以使用 `Promise.all()`

```js
function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    throw new Error('Type Error!')
  }
  return new Promise((resolve, reject) => {
    // 计数，结果
    let count = 0, rst = []
    promises.forEach((promise, index) => {
      promise.then(res => {
        rst[index] = res
        count++
        count === promises.length && resolve(rst)
      }, err => {
        reject(err)
      })
    })
  })
}

// test
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('World')
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('!!!')
  }, 4000)
})
promiseAll(p1, p2, p3).then(res => {
  console.log(res)
})
```



#### 7. 手写 Promise.race

> 应用场景：给某个请求设置一个超时时间，超时后执行相应操作，可以使用 `Promise.race()`

```js
function promiseRace(promises) {
  if (!Array.isArray(promises)) {
    throw new Error('Type Error!')
  }
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  })
}

// test
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('World')
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('!!!')
  }, 4000)
})
promiseRace([p1, p2, p3]).then(res => {
  console.log(res)
})
```



#### 8. debounce

```js
function debounce(fn, wait) {
    let timer = null
    return function() {
        let self = this, args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
			fn.apply(self, args)
        }, wait)
    }
}
```



#### 9. throttle

```js
function throttle(fn, wait) {
    let prev = Date.now()
    return function() {
		const self = this, args = arguments
         let cur = Date.now()
         if (cur - prev >= wait) {
             prev = Date.now()
             fn.apply(self, args)
         }
    }
}
```



#### 10. 类型判断函数

```js
function getType(data) {
    let rst = Object.prototype.toString.call(data)
    return rst.split(/[ \]]/)[1].toLowerCase()
}

const data = 'string'
const rst = getType(data)
console.log(rst)
```



#### 11. call

```js
Function.prototype.myCall = function(context, ...args) {
    let rst = null
    context = context || window
    context.fn = this
    rst = context.fn(...args)
    delete context.fn
    return rst
}

// test
const obj =  {}

function setName(name) {
    this.name = name
}

setName.myCall(obj, 'HELLO')
console.log(obj)
```



#### 12. apply

```js
Function.prototype.myApply = function(context, args) {
    let rst = null
    context = context || window
    context.fn = this
    if (args) {
        rst = context.fn(...args)
    } else {
        rst = context.fn()
    }
    delete context.fn
    return rst
}

// test
const obj =  {}

function setInfo(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}

setInfo.myApply(obj)
console.log(obj)
```



#### 13. bind

```js
Function.prototype.myBind = function(context, ...args1) {
    const self = this
    return function Fn(...args2) {
        return self.apply(
        	this instanceof Fn ? this : context,
            args1.concat(args2)
        )
    }
}

// test
const obj =  {}

function setName(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}

const f = setName.myBind(obj, 'Tom')
f(18, 'male')
console.log(obj)
```



#### 14. 函数柯里化

```js
function curry(fn, ...args) {
    // 如果 fn 参数少于或等于传入的参数，直接执行 fn；
    // 否则进行递归
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// 当传入参数多于函数参数
let curryPlus = curry((a,b,c,d) => a+b+c+d, 1,2,3,4,5)
console.log(curryPlus) // 10

// 当传入参数少于函数参数，注意参数不能多，否则会报错
let curryPlus2 = curry((a,b,c,d) => a+b+c+d)
const res = curryPlus2(1)(3)(2,5)
console.log(res) // 11
```



#### 15. AJAX

```js
function ajax(url, method, isAsync) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, isAsync)
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200 || this.status === 304) {
        handle(this.response)
      } else {
        console.error(this.statusText)
      }
    }
  }
  xhr.onerror = function() {
    console.error(this.statusText)
  }
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.responseType = 'json'
  xhr.send(null)
}

// test
const url = 'http://www.baidu.com'
const method = 'GET'
const isAsync = true
ajax(url, method, isAsync)
```

#### 16. Promise封装AJAX

```js
function ajax(url, method, isAsync) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, isAsync)
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200 || this.status === 304) {
          resolve(this.response)
        } else {
          reject(new Error(this.statusText))
        }
      }
    }
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.responseType = 'json'
    xhr.send(null)
  })
}

// test
const url = 'http://www.baidu.com'
const method = 'GET'
const isAsync = true
ajax(url, method, isAsync).then(res => {
  console.log(res)
})
```



### 数据处理

#### map

```js
Array.prototype.myMap = function(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Type Error!')
    }
    const rst = []
    for (let i = 0, len = this.length; i < len; i++) {
		rst.push(fn(this[i]))
    }
    return rst
}

// test
const arr = [1, 2, 3]
const rst = arr.myMap(item => item + 3)
console.log(rst)
```

#### filter

```js
Array.prototype.myFilter = function(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Type Error!')
    }
    const rst = []
    for (let i = 0, len = this.length; i < len; i++) {
		fn(this[i]) && rst.push(this[i])
    }
    return rst
}

// test
const arr = [2, -1, 0, 3, -2]
const rst = arr.myFilter(item => item <= 0)
console.log(rst)
```

#### reduce

```js
Array.prototype.myReduce = function(fn, initVal) {
    if (typeof fn !== 'function') {
        throw new Error('Type Error!')
    }
    let val, i
    if (initVal === undefined) {
        val = this[0]
        i = 1
    } else {
        val = initVal
        i = 0
    }
    for (i, len = this.length; i < len; i++) {
		val = fn(val, this[i], i, this)
    }
    return val
}

// test
const arr = [3, 1, 3, 2, 4]
const rst = arr.reduce((p, c, i, a) => {
  console.log(p, c, i, a)
  return p + c
})
console.log(rst)
```

#### forEach

```js
Array.prototype.myForEach = function(fn) {
  if (typeof fn !== 'function') {
    throw new Error('Type Error!')
  }
  for (let i = 0; i < this.length; i++) {
    // forEach 的回调函数可以有三个参数
    fn(this[i], i, this)
  }
}

// test
const arr = [3, 1, 'test', 'fff']
arr.myForEach((item, index, arr) => console.log(item, index, arr))
```



#### 1. 实现日期格式化函数

```js
function dateFormat(date, format) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)
  return format
}

// test
const rst1 = dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
const rst2 = dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
const rst3 = dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日')
console.log(rst1)
console.log(rst2)
console.log(rst3)
```



#### 2. 交换a,b的值，不能用临时变量

```js
a = 111
b = 222
a = a + b
b = a - b
a = a - b

// test
console.log(a, b) // 222 111
```



#### 3. 实现数组的乱序输出

```js
const arr = [1,2,3,4,5]
for (let i = 0, len = arr.length; i < len; i++) {
  let randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i
  ;[arr[randomIndex], arr[i]] = [arr[i], arr[randomIndex]]
}

// test
console.log(arr)
```



#### 4. 实现数组元素求和

```js
function getSum(arr) {
  arr = arr.flat(Infinity) // 扁平化
  return arr.reduce((p, c, i, a) => p += c, 0)
}

// test
const arr = [1, 3, 5, [6, [7, [9, 10], 22]]]
const rst = getSum(arr)
console.log(rst)
```



#### 5. 实现数组的扁平化

```js
function flatten(arr) {
  // 1. 使用 some + 扩展运算符
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
    
  // 2. 使用 toString() + split()
  // return arr.toString().split(',')
    
  // 3. 使用 ES6 语法 flat，
  // return arr.flat(Infinity) // 扁平化无数层
}

// test
const arr = [1, 2, [3, 4], [7, [8, [9, [10]]]]]
const rst = flatten(arr)
console.log(rst)
```



#### 6. 实现数组去重

```js
function uniqueArray(arr) {
  // 1. 使用 Set
  // return Array.from(new Set(arr))
    
  // 2. 使用 Map
  const rst = [], map = new Map()
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!map.get(arr[i])) {
      map.set(arr[i], 1)
      rst.push(arr[i])
    }
  }
  return rst
}

// test
const arr = [1,2,3,4,3,2,4,4,4,4,5]
const rst = uniqueArray(arr)
console.log(rst)
```



#### 7. 实现数组的flat方法

#### 8. 实现数组的push方法

```js
Array.prototype.myPush = function() {
  for (let i = 0, len = arguments.length; i < len; i++) {
    this[this.length] = arguments[i]
  }
  return this.length
}

// test
const arr = []
console.log(arr.myPush(1,2,3))
console.log(arr.myPush(4))
console.log(arr)
```



#### 11. 实现字符串的repeat方法

```js
function repeat(data, n) {
  return new Array(n + 1).join(data)
}

// test
const rst = repeat('hello', 10)
console.log(rst)
```



#### 12. 实现字符串翻转

```js
String.prototype.myReverse = function(str) {
  // 1. 使用 reverse
  // return str.split('').reverse().join('')

  // 2. 双指针 + 交换
  const arr = str.split('')
  let left = 0, right = str.length - 1
  while (left < right) {
    ;[arr[left], arr[right]] = [arr[right], arr[left]]
    left++
    right--
  }
  return arr.join('')
}

// test
const obj = new String()
const rst = obj.myReverse('Hello World!')
console.log(rst)
```



#### 13. 将数字每千分位用逗号隔开

```js
function format(n) {
  let num = n.toString()
  let decimals = '', integer = num
  // 提取整数位、小数位
  if (num.indexOf('.') !== -1) {
    ;[integer, decimals] = num.split('.')
  }

  let len = integer.length
  if (len <= 3) return num
  let remainder = len % 3, temp = ''
  decimals ? temp = '.' + decimals : temp
  if (remainder === 0) {
    return integer.match(/\d{3}/g).join(',') + temp
  } else {
    return integer.slice(0, remainder) + ',' + integer.slice(remainder).match(/\d{3}/g).join(',') + temp
  }
}

// test
console.log(format(12))
console.log(format(12345))
console.log(format(12.1234))
console.log(format(1232.123))
```



#### 14. 实现非负大整数相加

#### 15. 实现 add(1)(2)(3)3

#### 16. 实现类数组转化为数组

#### 实现一个 normalize 函数

```js
function normalize(data) {
    const rst = {}
    // 分割 [ 或 ]
    data.split(/[\[\]]/).filter(Boolean).reduce((p, c, i, a) => {
        p.value = c
        if (i !== a.length - 1) {
            p.children = {}
            return p.children
        }
    }, rst)
    return rst
}

data = "[abc[bcd[def]]]"

const rst = normalize(data)
console.log(rst)
```



### 场景应用

#### 1. 循环打印红黄绿

#### 2. 实现每隔一秒打印 1,2,3,4

#### 3. 小孩报数问题

#### 4. 用Promise实现图片的异步加载

#### 5. 实现观察者模式

#### 6. 查找文章中出现频率最高的单词

#### 7. 封装异步的fetch，使用async await方式来使用

#### 8. 实现基本的 Event Bus

#### 9. 实现双向数据绑定

#### 10. 实现简单路由

#### 11. 实现斐波那契数列

#### 12. 字符串出现的不重复最长长度

#### 13. 为什么使用 setTimeout 实现 setInterval？如何实现？

#### 14. 实现 jsonp

#### 15. 解析 URL Params 为对象

### 深拷贝与浅拷贝

#### 1. 浅拷贝

```js
function shallowCopy(obj) {
    // 如果不是object，直接返回原值
    if (!obj || typeof obj !== 'object') {
        return obj
    }
    // 判断是否是数组还是对象
    const newObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

// test
const obj = {
    name: 'Tom',
    info: {
        gender: 'male',
        age: 18
    }
}

const newObj = shallowCopy(obj)
console.log(newObj)
```



#### 2. 深拷贝

```js
function deepClone(obj, map = new WeakMap()) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  const newObj = Array.isArray(obj) ? [] : {}

  // 解决循环引用
  if (map.has(obj)) {
    return map.get(obj)
  } else {
    map.set(obj, newObj)
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key], map) : obj[key]
    }
  }

  return newObj
}

// test
const obj = {
    name: 'Tom',
    info: {
        gender: 'male',
        age: 18
    }
}

const newObj = deepClone(obj)
obj.info.gender = 'fdsfsd'
console.log(newObj)
```



#### 3. 解决递归爆栈

#### 4. 解决循环引用



---

## Webpack

> https://juejin.cn/post/6844904094281236487

### 1.常见loader

- 处理图片、字体文件的 loader：file-loader、url-loader
- 处理 CSS 文件的 loader：css-loader、style-loader、sass-loader、postcss-loader
- 处理 ES6 语法：babel-loader
- eslint-loader
- vue-loader

### 2.常见plugin

- html-webpack-plugin：打包结束后生成 html 文件
- clean-webpack-plugin：打包开始前删除指定目录
- webpack.HotModuleReplacementPlugin：热更新
- mini-css-extract-plugin：提取 css 文件
- webpack-bundle-analyzer：分析打包文件
- webpack-merge：提取公共配置

### 3.loader和plugin的区别

- loader 本质上是一个函数，它负责将函数接收到的内容 source 进行转换，然后返回转换后的结果。因为 webpack 只能识别 JavaScript，所以 loader 就相当于翻译官，将其它格式的文件转换成 JavaScript。
- plugin 本质上是一个类，它负责在 webpack 打包过程的某一时刻处理一些事情，webpack 运行过程（生命周期）中会广播出一些钩子函数，plugin 可以监听到这些钩子函数并完成某些操作。

### 4.module、chunk、bundle 区别

- module：各个源码文件，import 引入的、export 引出的代码都是 module；
- chunk：多个模块合并成的代码块，一般在内存中；
- bundle：打包生成的文件。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210731101526.png)

### 5.Webpack构建流程简单说一下

1. 启动构建，读取并合并配置参数，加载 plugin，实例化 Compiler；
2. 从 entry 开始，针对每个模块调用调用对应的 loader 去翻译文件的内容，再找到模块依赖的 module，然后递归地进行编译；
3. 将编译后的 module 组合成 chunk，将 chunk 转换成文件，输出到文件系统中。

### 6.Webpack 的热更新原理

- webpack-dev-server 和浏览器之间维护了一个 websocket，当本地资源发生变化时，webpack-dev-server 会向浏览器推送更新，并且带上构建时的 hash 值；
- 浏览器将 hash 值和上一次的比对之后会向 webpack-dev-server 发送 ajax 请求来获取更改的内容，之后浏览器根据这些内容继续向 webpack-dev-server 发送 jsonp 请求获取该 chunk 的增量更新。

### 7.如何优化 Webpack 的构建速度？

`高速多缩压D`

- 使用`高版本`的 Webpack 和 Node.js；
- `多进程/多实例构建`：HappyPack(不维护了)、thread-loader；
- `缩小打包的作用范围`：1. 使用 include 或者 exclude 确定 loader 的作用范围；2. 使用 `IgnorePlugin` 完全忽略某些模块的打包；3. 使用 `noParse` 跳过某些已经打包过的文件（比如一些第三方库 min.js）；
- `压缩代码`：1. webpack-parallel-uglify-plugin 多进程并行压缩 JS；2. 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启压缩 CSS；
- `CDN加速`：对于一些体积较大的第三方库，使用 CDN 引入；
- `DLLPlugin`：使用 DLLPlugin 将一些体积较大且改动较少的第三方模块提取出来，只打包一次，后面就不再打包这些模块；

### 8.什么是polyfill？

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

### 9.babel-polyfill和babel-runtime的区别

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-runtime

### 10.webpack相关概念

配置项：

- mode
- entry
- output
- module: [{ rules: {} }]
- plugins

高级概念：

- HMR
- Tree Shaking
- Code Splitti





---

## 项目

### 移动端适配

### 浏览器兼容问题

> https://juejin.cn/post/6972937716660961317
>
> https://juejin.cn/post/6844903493161975822

兼容问题可以分成 `html`、`css`、`javascript` 三个方面，其中 `css` 兼容问题最多，而且大部分针对 `ie` 浏览器。

1. 不同浏览器的默认样式存在差异，可以使用 `Normalize.css` 抹平这些差异。当然，你也可以定制属于自己业务的 `reset.css`。
2. 不同浏览器对 CSS 样式兼容性不同，可以使用 `postcss` 这个插件给样式添加浏览器厂商前缀。
3. 使用 `html5shiv.js` 解决 `ie9` 以下浏览器对 `html5` 新增标签不识别的问题。
4. 使用 `respond.js` 解决 `ie9` 以下浏览器不支持 `CSS3 Media Query` 的问题。

### 前端性能优化

#### 1.减少HTTP请求

减少图片请求：

1. 通过懒加载的方式处理非首屏的图片；
2. 对于小图标可用采用 iconfont 的方式解决；
3. 对于小图片可用采用 Sprite 精灵图解决或者将小图片转成 base64 格式让它们随着 CSS 文件一起加载。比如在 webpack 中配置 url-loader，给它设置一个 limit 值，当图片小于这个 limit 值就会将图片转成 base64 格式，但这种方法会导致 CSS 文件非常臃肿。

减少首页请求：

`懒合打按防点缓`

1. 使用路由懒加载，按需加载路由；
2. 通过 nginx 服务器（可用来做 CDN，用来处理静态资源）来做资源文件的合并（combo）-- 将多个资源的 CDN 地址合并到一起，同时加载多个 JS 文件或 CSS 文件；
3. 通过打包工具（Webpack）来做资源文件的物理打包（相对没有第一种灵活）；
4. 对于引入的一些大型的第三方库，如 lodash、elementUI，务必使用按需加载（一般都是用 Babel 插件实现的）；
5. 使用防抖、节流函数减少请求次数；
6. 给一些按钮组件添加禁用的效果，不让用户频繁点击，减少 HTTP 请求；
7. 服务器可以给一些频繁访问的资源设置缓存，通常可以使用 expires 或者 cache-control 字段给资源设置一个过期时间，这样在这段时间内，就可以减少HTTP请求；

#### 2.减少静态资源的体积

1. 服务端开启 gzip 压缩，如果后端是 nodejs 写的，可以使用中间件 compression 开启 gzip 压缩；
2. JS 和 CSS 文件可以通过 Webpack 进行**混淆**和**压缩**；
3. 图片可以工具进行**等比例无损压缩**，或者使用 **webp 格式**减小体积；
4. 优化 CSS 代码，css 代码尽量不要冗余，减少 css 样式的嵌套深度；
5. 使用 HTTP2 。

#### 3.用户感知优化

1. 进度条、加载动画、骨架屏；
2. 减少 DOM 操作，用 requestAnimationFrame 逐帧渲染动画，减少卡顿。

#### 4.减少请求时间

1. 使用 CDN，利用离用户最近的服务器，缩短资源传输距离，减少请求时间。

![](https://gitee.com/gainmore/imglib/raw/master/img/20210901201639.png)



### 项目难点

#### 大数字问题

在做文章详情页面的时候，点击某篇文章跳转到对应的详情页时，会出现 404 的问题。后来检查发现，请求时的文章 id 和后端返回的文章 id 不一致。

经过查缺资料，了解到 JavaScript 有一个安全整数范围，只有 number 类型的值在这个范围之内才能准确表示（±2^53）。

后端返回的数据是 JSON 类型的字符串，而 axios 会自动把后端返回的数据通过 `JSON.parse()` 转换成 JavaScript 对象，在这个过程中，如果有一些数据超出了安全整数范围就会变得不准确，所以请求就可能会出现 404。

为了解决这个问题，在项目中引入了一个第三方包 `json-bigint`，使用这个包的 `parse` 方法可以将大数字转换成一个 bignumber 的对象，然后通过 `toString` 方法可以将这个对象转换成字符串。

通常会把转换的操作放到 axios 里的 `transformResponse` 里完成，在这个 API 里可以自定义处理从后端返回的原始数据。

#### 修改头像

**1. 点击按钮，弹出文件选择框**

首先会增加一个 type 为 file 的 input 标签，通常会这个标签隐藏起来，然后通过点击某个按钮，触发 input 标签的点击事件，弹出文件选择窗口。

**2. 根据选择的图片，生成预览图片**

监听到 input 标签的 fileChange 事件，使用 `window.URL.createObjectURL` 生成一个预览图片的链接，用于本地预览。

**3. 使用第三方库，实现图片裁切的效果**

创建一个 cropperjs 实例，配置一些关于图片裁切的参数。

**4. 更新图片**

当用户点击确认修改按钮后，首先把生成的预览图片链接替换掉原来图片的 URL（减少一次图片请求），然后再把裁切后的文件上传到服务器。

上传图片，首先新建一个 FormData() 对象，然后向这个对象中 `append` 一些字段和对应的数据，再调用接口请求将这个 FormData 对象作为请求体的参数传入即可。

#### 登录

> https://www.jianshu.com/p/cab856c32222

项目使用的 JWT 实现登录的认证。

- 首先，用户在浏览器输入用户名和密码，服务器校验用户名和密码，校验通过后生成 Access Token 和 Refresh Token 并返回给浏览器；
- 浏览器收到两个 Token 之后，就把它们存储到 localStorage 之中，浏览器每次请求的时候，都会取出 Access Token 放到请求头中的 Authorization 字段中（`Bearer `）；
- 服务器收到请求之后，就会检验 Token，Token 一般由三个部分组成：header、payload、signature，header 指明了签名算法，payload 指明了用户 id 以及一些基本信息，signature 是服务端根据签名算法和密钥将 header 和 payload 加密生成的数字签名；
- 当服务器收到 Token 之后，首先取出其中的 header 和 payload，根据密钥和签名算法将它们进行加密生成签名，然后再和 Token 中的 signature 进行比对，如果一致说明 Token 未被篡改，然后就取出 payload 的用户 id 查询数据库，返回相应数据给浏览器；
- Access Token 的有效时间一般比 Refresh Token 短，所以当 Access Token 过期之后，浏览器就会发送 Refresh Token 给服务器，服务器验证通过后，就返回新的 Access Token 和 Refresh Token。

#### 处理页面访问权限

利用路由中的 meta 属性，将 meta 属性加入 requireAuth 字段，需要登录的页面设置为 true，不需要登录的页面设置为 false。

然后使用全局路由导航守卫的 beforeEach 钩子函数，在每次路由跳转之前，检查跳转到的路由的 requireAuth 是否为 true，如果是 true 说明需要登录验证，然后检查 localStorage 中是否有 token，有的话就直接跳转。

#### 数据持久化

#### 性能优化





---

## 开放题

### 1.对前端工程化的理解

### 2.为什么选择前端？

首先，前端实现出来的效果可以立马看见，当自己看见这些页面被渲染出来后会有一种成就感，而像后端，更多的是和数据层面打交道，感觉比较无趣；

然后，前端更加贴近用户，因为需要考虑到用户的交互体验，而自己作为一名前端开发工程师，同时也作为一名用户，当自己有一些交互需求或是想法时，自己可以去动手实现，这也是十分有成就感的；

另外，前端技术十分多样，而且更新迭代也快，需要不断学习，这是一个富有挑战性的过程。

### 3.了解哪些前端新技术？

移动端 APP 开发

- Native APP 开发（原生应用）
- Hybrid APP 开发（混合应用）
- Web APP 开发
- 跨平台开发
  - Flutter
  - React Native
  - Weex
- 另类 APP
  - 小程序
  - 公众号
  - 快应用
  - PWA 离线应用

打包工具 Vite、Parcel





---

## 算法题

### 在一个字符串数组中有红、黄、蓝三种颜色的球，请为该数组排序。

> 例如：红蓝蓝黄红黄蓝红红黄红 -> 黄黄黄红红红红红蓝蓝蓝

```js
function sortBalls(str) {
  let arr = str.split('')

  arr.sort((a, b) => {
    // 数值越大，对应元素排列越靠右
    return getNumByType(a) - getNumByType(b)
  })

  return arr.join('')
    
  function getNumByType(type) {
    switch (type) {
      case '黄':
        return 1;
      case '红':
        return 2;
      default:
        return 3;
    }
  }
}

sortBalls('红蓝蓝黄红黄蓝红红黄红'); // 输出：'黄黄黄红红红红红蓝蓝蓝'
```

### 一个数的二进制数有多少1

> 15 - > 4，-15 -> 29

```js
function transform(n) {
    let rst = 0
    while (n) {
        n &= (n - 1)
        rst++
    }
    return rst
}

const rst = transform(-15)
console.log(rst) // 29
```





---

## 智力题

### 赛马问题

64匹马，8个跑道，问最少比赛多少场，可以选出跑得最快的4匹马？假设每场比赛每个跑道只允许一匹马，且不存在并列情形。

答：10~11 场。

> https://zhuanlan.zhihu.com/p/103572219
>
> https://blog.csdn.net/jiutianhe/article/details/40744023

### 装水问题

有三个没有容量刻度的杯子，它们的容量分别是3升、7升、10升。现在把10升杯子装满水，请问用这三个杯子，怎么样能将10升水分成两个5升？

```js
0 -- 0 -- 10
3 -- 0 -- 7
0 -- 3 -- 7
3 -- 3 -- 4
3 -- 6 -- 1
2 -- 7 -- 1
2 -- 0 -- 8
0 -- 2 -- 8
3 -- 2 -- 5
0 -- 5 -- 5
```

### 拿球问题

有 100 个球，有两个人，每人一次可以拿 1-5 个球，最后拿完球的人获胜，假如你先拿，怎样保证自己获胜？

答：因为一次最多可以拿 5 个球，所以每次拿`剩余球数量除以 6 的余数`即可。
		比如，你先拿 100 % 6 == 4 个，此时剩下 96 个，96 可以被 6 整除。所以，只要对方拿 n 个，而你就拿 6 - n 个，这样一个回合拿完的球就是 6 个，所以你一定是最后拿完球的。
		至于为什么是 6 ？这是因为我们要保证两人一个回合拿的球是一个常数，所以你拿的球是要根据对方拿的球变化的。比如对方拿了 n 个球，那么你就需要拿 c - n 个球，其中 c 就是这个常数。
		题目要求一个人拿 1-5 个球，所以有 `0 < n < 6`、`0 < c - n < 6`，将右式转换得到：`c - 6 < n < c`，因此可以得到 c = 6，所以 c 只能为 6 。

### 卖鞋问题

王师傅卖鞋，一双鞋进价30元，老王赔本卖，甩卖20元。骗子来买鞋，给王师傅50元的假钞，老王没识别，也没有零钱。将这假钞找邻居换了50元，事后邻居发现钱是假的，老王赔了邻居50元的真钞。请问老王损失了多少钱？

答：王师傅收入：50元假钞（价值为 0）+ 换的 50元；王师傅支出：一双鞋（30元）+ 找给骗子 30 元 + 赔给邻居 50元。

所以变化：0 + 50 - (30 + 30 + 50) = -60 元。因此，老王损失了 60 元。

### 帽子问题

A、B、C、D四个小孩分别带着一顶帽子，共两顶黑帽子，两顶白帽子。D和A、B、C三个隔了一堵不透明的墙，A可以看到B、C帽子的颜色，B可以看到C帽子的颜色。只要能判断自己的帽子颜色，就需要立刻说出。片刻后，有一位小孩说出自己帽子的颜色，请问这个小孩是谁？

答：B 。因为 A 可以看到 B、C 的帽子颜色，只要 B、C 帽子颜色相同，A 就可以判断出自己的帽子颜色。而 A 没有说话，说明 B、C 帽子颜色相反。而 B 可以看到 C 的帽子颜色，B 就可以判断出自己的帽子颜色一定和 C 相反。

