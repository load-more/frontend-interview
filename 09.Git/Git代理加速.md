## 配置 Git 代理进行加速

首先，要打开 VPN。

查看配置文件 config.json。

我们可以看到一系列代理配置，比如：

![](https://gitee.com/gainmore/imglib/raw/master/img/20210809203840.png)

从而得到一个本地代理的监听地址：`socks//127.0.0.1:10808`（当然不止这一个，还有其他协议）。

之后，只要对 Git 进行代理配置即可：

`git config --global http.proxy socks://127.0.0.1:10808`

可以通过 `git config --global --list` 查看配置。

这样，之后进行的 `git push / pull` 或者 `git clone`，就会走代理的方式，使用 VPN 进行加速，速度会比之前提高非常多。



使用其他 VPN 软件也一样，大致步骤就是：

1. 打开文件位置，找到 `config.json` 配置文件
2. 获取 `协议名、监听地址、监听端口` 并拼接
3. 配置 Git 的代理