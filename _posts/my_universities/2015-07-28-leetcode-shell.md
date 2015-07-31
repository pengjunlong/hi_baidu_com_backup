---
layout: article
title: LeetCode Shell
categories: my_universities in_the_world
excerpt: 记录在leetcode解决的shell问题，没几题
---

* toc
{:toc}

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

### 有效的电话号码
[Valid Phone Numbers](https://leetcode.com/problems/valid-phone-numbers/)

文件file.txt中包含一些电话号码（每行一个），写一个一行的shell脚本输出所有有效的电话号码;假设有效的电话号码只有两种格式：
(xxx) xxx-xxxx 或 xxx-xxx-xxxx (x代表一个数字)

另外文件中每行数据前后也没有空格

例如文件内容如下：

{% highlight text linenos %}
987-123-4567
123 456 7890
(123) 456-7890
{% endhighlight %}
那么你的脚本需要返回
{% highlight bash %}
987-123-4567
(123) 456-7890
{% endhighlight %}
#### 分析解答
{% highlight bash linenos %}
# Read from the file file.txt and output all valid phone numbers to stdout.
cat file.txt | grep -E "^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
{% endhighlight %}
<hr/>
### 单词出现次数统计
[Word Frequency](https://leetcode.com/problems/word-frequency/)

写一个shell脚本计算文本文件words.txt中每个单词的出现次数（按出现次数倒序排列）

为了简化问题，我们假设：
words.txt只包含小写字母和空格，每个单词只包含小写字母，单词被一个或多个空格分割；每个单词出现次数唯一

例如，文件内容如下：
{% highlight text linenos %}
the day is sunny the the
the sunny is is
{% endhighlight %}
那么你的脚本需要输出
{% highlight bash %}
the 4
is 3
sunny 2
day 1
{% endhighlight %}
#### 分析解答
{% highlight bash linenos %}
# Read from the file words.txt and output the word frequency list to stdout.
cat words.txt | tr ' ' '\n' | grep -v "^$" | sort | uniq -c | awk '{print $2,$1}' | sort -nrk2
{% endhighlight %}
