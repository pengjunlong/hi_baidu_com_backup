title: CentOS安装postfix利用已有邮箱发信
author: 九头鸟龙
date: 2017-11-02 15:44:46
tags:
---
### 卸载sendmail并安装postfix+mailx
<script src="https://gist.github.com/pengjunlong/28d8fc2419cff25078bb72bffc7dd0ee.js"></script>

<!-- more -->

### 配置SMTP信息
<script src="https://gist.github.com/pengjunlong/81e82b01b007e491462dc65b9debf2e1.js"></script>

接着创建密码配置文件 /etc/postfix/sasl_passwd  账号密码用分号:隔开

<script src="https://gist.github.com/pengjunlong/52201b3a9997c5a06723e66de4df4198.js"></script>

密码是明文存储的，通过postmap创建hash加密文件sasl_passwd.db

最后测试没问题就可以删除sasl_passwd

### 创建ca证书配置main.cf
进入certs目录，先修改创建的证书时间，默认有效期只有一年，改成10年先

找到里面所有的 -days 365 改为 -days 3650,也可以随便定个时间,保存退出后执行make创建证书

<script src="https://gist.github.com/pengjunlong/3f72d43bea58178844dbf0f628f8c55d.js"></script>

添加账号映射
<script src="https://gist.github.com/pengjunlong/9eac256d1e00cec2654436b89ba1e885.js"></script>

备份并修改/etc/postfix/main.cf
<script src="https://gist.github.com/pengjunlong/8f5a8c65d4af6d93cda78cfa0053079f.js"></script>

### 重启postfix发送测试邮件
<script src="https://gist.github.com/pengjunlong/061cd0602f73c721c475fe82fc49c61b.js"></script>

### 监控发送日志
<script src="https://gist.github.com/pengjunlong/b408cb2bb7dd1009447f29c5461f1111.js"></script>
