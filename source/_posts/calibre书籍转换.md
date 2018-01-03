title: calibre书籍转换
author: 九头鸟龙
date: 2017-10-10 11:01:29
tags:
---
# Android官方培训课程

```python
from calibre.web.feeds.recipes import BasicNewsRecipe
from calibre.ebooks.BeautifulSoup import NavigableString, Tag
 
class DesignPattern(BasicNewsRecipe):
 
    title = 'Android官方培训课程'
    description = 'Android官方培训课程'
    cover_url = 'http://hukai.me/android-training-course-in-chinese/android_training.jpg'
 
    url_prefix = 'http://hukai.me/android-training-course-in-chinese/'
    url = 'http://hukai.me/android-training-course-in-chinese/'
    no_stylesheets = True
    keep_only_tags = [dict(attrs={'class' : ['page-inner']})]
 
    def get_text(self, tag):
        text = ''
        for c in tag.contents:
            if isinstance(c, NavigableString):
                text = text + str(c)
            else:
                text = text + self.get_text(c)

        return text.strip()

    def parse_index(self):
        soup = self.index_to_soup(self.url)
 
        div = soup.find('ul', { 'class': 'summary' })
 
        articles = []
        for link in div.findAll('a'):
            til = self.get_text(link)
            url = self.url_prefix +'/'+ link['href']
            a = { 'title': til, 'url': url }
 
            articles.append(a)
 
        ans = [('Android官方培训课程', articles)]
 
        return ans

```

# Kafka设计解析

```python
from calibre.web.feeds.recipes import BasicNewsRecipe
 
class DesignPattern(BasicNewsRecipe):
 
    title = 'Kafka设计解析'
    description = 'Kafka设计解析'
    cover_url = 'https://kafka.apache.org/images/apache-kafka.png'
 
    url_prefix = 'http://www.jasongj.com/'
    url = 'http://www.jasongj.com/tags/Kafka/'
    no_stylesheets = True
    keep_only_tags = [dict(attrs={'class' : ['posts-collapse', 'post-description', 'post-body']})]
 
    def parse_index(self):
        soup = self.index_to_soup(self.url)
 
        div = soup.find('div', { 'class': 'posts-collapse' })
 
        articles = []
        for link in div.findAll('a'):

            til = link.find('span').contents[0].strip()
            url = self.url_prefix +'/'+ link['href']
            a = { 'title': til, 'url': url }
 
            articles.append(a)
 
        ans = [('Kafka设计解析', articles)]
 
        return ans
```

# java进阶
```python
from calibre.web.feeds.recipes import BasicNewsRecipe
 
class DesignPattern(BasicNewsRecipe):
 
    title = 'java进阶'
    description = 'Java进阶'
    cover_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png'
 
    url_prefix = 'http://www.jasongj.com/'
    url = 'http://www.jasongj.com/categories/java/'
    no_stylesheets = True
    keep_only_tags = [dict(attrs={'class' : ['posts-collapse', 'post-description', 'post-body']})]
 
    def parse_index(self):
        soup = self.index_to_soup(self.url)
 
        div = soup.find('section', { 'class': 'posts-collapse' })
 
        articles = []
        for link in div.findAll('a'):

            til = link.find('span').contents[0].strip()
            url = self.url_prefix +'/'+ link['href']
            a = { 'title': til, 'url': url }
 
            articles.append(a)
 
        ans = [('Java进阶', articles)]
 
        return ans

```

# Java设计模式
```python
from calibre.web.feeds.recipes import BasicNewsRecipe
 
class DesignPattern(BasicNewsRecipe):
 
    title = '设计模式'
    description = 'Java设计模式'
    cover_url = 'http://www.cvc.uab.es/shared/teach/a21291/web/images/sourcemakingdp.png'
 
    url_prefix = 'http://www.jasongj.com/'
    url = 'http://www.jasongj.com/tags/Design-Pattern/'
    no_stylesheets = True
    keep_only_tags = [dict(attrs={'class' : ['posts-collapse', 'post-description', 'post-body']})]
 
    def parse_index(self):
        soup = self.index_to_soup(self.url)
 
        div = soup.find('div', { 'class': 'posts-collapse' })
 
        articles = []
        for link in div.findAll('a'):

            til = link.find('span').contents[0].strip()
            url = self.url_prefix +'/'+ link['href']
            a = { 'title': til, 'url': url }
 
            articles.append(a)
 
        ans = [('设计模式', articles)]
 
        return ans

```