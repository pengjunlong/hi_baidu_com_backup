---
title: MySQL字符集设置
date: 2015-10-29 06:58:47
tags: [database,MySQL字符集]
categories: 我的大学
---
set names影响下面3个字符集

```bash
mysql> show variables like "character_set%";
+--------------------------+------------------------------------------------------+
| Variable_name            | Value                                                |
+--------------------------+------------------------------------------------------+
| character_set_client     | utf8                                                 |
| character_set_connection | utf8                                                 |
| character_set_results    | utf8
```

- character_set_client影响MySQL服务器对client传过来语句的解析处理
- character_set_connection影响MySQL服务器决定存储数据前是否需要转换编码
- character_set_results影响MySQL服务器返回的结果编码

总之这3个值就是要一样，还要和客户端一致，所以才有了 set names 这个快捷命令
