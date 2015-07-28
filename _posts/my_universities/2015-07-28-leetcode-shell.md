---
layout: article
title: LeetCode Shell
categories: my_universities in_the_world
excerpt: 记录在leetcode解决的shell问题，没几题
---

### 问题：输出文件的第十行
[Tenth Line](https://leetcode.com/problems/tenth-line/)

你能只输出一个文件的第十行吗？比如，假设文件file.txt内容如下：
{% highlight text linenos %}
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
{% endhighlight %}
那么你的脚本需要输出第10行，也就是
{% highlight bash %}
Line 10
{% endhighlight %}
#### 提示
- 如果文件内容不足10行，你应该输出什么？
- 至少有3种不同方法，尽可能思考所有可能性吧~

#### 分析解答
{% highlight bash linenos %}
# Read from the file file.txt and output the tenth line to stdout.
sed -n "10p" file.txt
{% endhighlight %}
<hr/>
### 问题：转置文件内容
[Transpose File](https://leetcode.com/problems/transpose-file/)

给你一个文本文件file.txt，转置它的内容；文件中每行记录列数相同，以空格符分隔

例如，如果file.txt内容如下
{% highlight text linenos %}
name age
alice 21
ryan 30
{% endhighlight %}
那么你应该输出
{% highlight bash %}
name alice ryan
age 21 30
{% endhighlight %}


#### 分析解答
{% highlight bash linenos %}
# Read from the file file.txt and print its transposed content to stdout.
awk '{for (i=1;i<=NF;i++) {if (NR==1) {s[i] = $i;} else {s[i] = s[i]" "$i;}}} END {for(i=1;i<=NF;i++) {print s[i];}}' file.txt
{% endhighlight %}
<hr/>
