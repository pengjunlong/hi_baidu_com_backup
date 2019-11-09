title: CentOS安装postfix利用已有邮箱发信
author: 九头鸟龙
date: 2017-11-02 15:44:46
tags: [CentOS,postfix]
categories: 我的大学
---
### 卸载sendmail并安装postfix+mailx
```bash
#卸载sendmail
service sendmail stop
chkconfig sendmail off
yum remove sendmail
#安装postfix mailx和sasl需要的包
yum install postfix mailx cyrus-sasl-plain
```
<!-- more -->

### 配置SMTP信息
```bash
	                地址	端口（不带SSL）	端口（带SSL）
POP3服务器	pop.139.com	110	995
SMTP服务器	smtp.139.com	25	465
IMAP服务器	imap.139.com	143	993
```

接着创建密码配置文件 /etc/postfix/sasl_passwd  账号密码用分号:隔开

```bash
echo "[smtp.139.com]:465 xxx@139.com:xxx"  > /etc/postfix/sasl_passwd

postmap hash:/etc/postfix/sasl_passwd

rm /etc/postfix/sasl_passwd
```

密码是明文存储的，通过postmap创建hash加密文件sasl_passwd.db

最后测试没问题就可以删除sasl_passwd

### 创建ca证书配置main.cf
进入certs目录，先修改创建的证书时间，默认有效期只有一年，改成10年先

找到里面所有的 -days 365 改为 -days 3650,也可以随便定个时间,保存退出后执行make创建证书

```bash
cd /etc/ssl/certs/
vi Makefile

make server.pem

-----
Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:BEIJING
Locality Name (eg, city) [Default City]:BEIJING
Organization Name (eg, company) [Default Company Ltd]:SK
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:
Email Address []:
-----

#移动到/etc/postfix/目录
mv server.pem /etc/postfix/
```

添加账号映射
```bash
echo "root@139.com xxx@139.com" >> /etc/postfix/generic
postmap /etc/postfix/generic
```

备份并修改/etc/postfix/main.cf
```bash
mydomain = 139.com
myorigin = $mydomain
myhostname = $mydomain
mydestination = $mydomain
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
relayhost = [smtp.139.com]:465
smtp_use_tls = yes
smtp_tls_CAfile = /etc/postfix/server.pem
smtp_generic_maps = hash:/etc/postfix/generic
smtp_sasl_auth_enable = yes
smtp_sasl_security_options = noanonymous
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
```

### 重启postfix发送测试邮件
```bash
service postfix restart
#测试发送，最好先测试发送到其他域的邮件，例如163.com
echo 'This is a test mail' | mail -s 'This is a test mail' xxxxx@163.com
```

### 监控发送日志
```bash
tail -f /var/log/maillog
```
