title: LeetCode Shell
tags: leetcode
date: 2015-07-28 06:53:01
---
[问题来源](https://leetcode.com/problemset/shell/)

### 单词出现次数统计
- 计算文本文件words.txt中每个单词的出现次数（按出现次数倒序排列）
- 假设words.txt只包含小写字母和空格，每个单词只包含小写字母，单词被一个或多个空格分割；每个单词出现次数唯一

```bash
cat words.txt | tr ' ' '\n' | grep -v "^$" | sort | uniq -c | awk '{print $2,$1}' | sort -nrk2
```

### 有效的电话号码
- 文件file.txt中包含一些电话号码（每行一个），写一个一行的shell脚本输出所有有效的电话号码
- 假设有效的电话号码只有两种格式：
(xxx) xxx-xxxx 或 xxx-xxx-xxxx (x代表一个数字)

```bash
cat file.txt | grep -E "^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
```

### 问题：转置文件内容
- 给你一个文本文件file.txt，转置它的内容
- 文件中每行记录列数相同，以空格符分隔
- 例如，如果file.txt内容如下
```bash
name age
alice 21
ryan 30
```
那么你应该输出
```bash
name alice ryan
age 21 30
```

```bash
awk '
{
  for (i=1; i<=NF; i++) {
    if (NR==1) {
      s[i] = $i;
    } else {
      s[i] = s[i]" "$i;
    }
  }
}
END {
  for (i=1; i<=NF; i++) {
    print s[i];
  }
}
' file.txt
```


### 输出文件的第十行

- 如果文件内容不足10行，你应该输出什么？
- 至少有3种不同方法，尽可能思考所有可能性吧~

```bash
sed -n "10p" file.txt
```
<hr/>



