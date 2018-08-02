title: Mac重装系统
author: 九头鸟龙
tags: []
categories: []
date: 2016-11-15 17:33:00
---
# 关于备份
可以用外部存储或网络备份，也可以用磁盘工具单独分一个区用来备份

# 关于重装
关机后，开机时（开机音乐响后）按住command+R，如果不小心看到只有一个带感叹号文件夹在闪，可以开机后按住command+option+P+R,然后再开机按住command+R

开机后可选择进入磁盘工具，格式化原系统分区；然后退出磁盘工具，选择重新安装系统，注意需要有靠谱网络连接（实测不稳定出现2003F等错误后可关机重复操作，直至下载进度条完成）

# 软件安装与配置
## 码农必备xcode command tools
可使用xcode-select -p查看是否已安装

也可直接敲gcc命令，mac会聪明的自动弹出安装对话框，选择安装即可

安装后亲切的git等命令就可以用了


## 软件管理必备brew
使用mac自带“终端”程序，敲入

<script src="https://gist.github.com/pengjunlong/89a457fdd2eebb09f6939cbaf8b00852.js"></script>
即完成brew安装。

~~使用brew cask可方便的安装一些GUI软件，可考虑加上~~ 新版不需要了

```bash
brew install caskroom/cask/brew-cask
```

brew操作过程中可能会遇到github API报错（如果brew源未更改的话）

```bash
Error: GitHub API Error: API rate limit exceeded for 103.37.140.11.
```
根据命令行提示去github申请单独token即可

使用国内软件源
<script src="https://gist.github.com/pengjunlong/8a8f76c766b947be71c9aea4119385dd.js"></script>

## 常用软件
<script src="https://gist.github.com/pengjunlong/5557dd4115264ab5b4c8709d7ce76060.js"></script>

## git库访问权限支持
<script src="https://gist.github.com/pengjunlong/b81cbfaebf3053329c39c6470ed7314b.js"></script>



## goproxy
编译安装比较纠结（“GoProxy 对 golang 周边库做了一些修改”），所以直接下载编译好的包比较方便

[简易教程](https://github.com/phuslu/goproxy/blob/wiki/SimpleGuide.md)

访问https://github.com/phuslu/goproxy-ci/releases/latest 下载最新版，如goproxy_macos_amd64-r1419.tar.bz2，文件托管在amazonaws.com，会有点慢

查看appid可访问https://console.cloud.google.com/home/dashboard

导入代理自动切换规则可以参考https://github.com/gfwlist/gfwlist


<script src="https://gist.github.com/pengjunlong/01950506bd32b06a0c90df71c087a4eb.js"></script>

## chrome设置
登录以同步设置、扩展、书签等
SwitchyOmega扩展用来配合科学上网，

配置在线恢复：
http://switchysharp.com/file/SwitchyOptions.bak

配置自动切换：
https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt

## dotfile管理
https://github.com/skwp/dotfiles

从github上的介绍，这个“Yet Another Dotfile Repo”包含了vim、zsh相关的很多优秀插件和配置，mac的话还会帮你安装iterm2配色方案，当然有的配置可能不太符合个人原有使用习惯
<script src="https://gist.github.com/pengjunlong/aa542dfb62fd41aeccd4acc64b36d660.js"></script>

### 启用iterm2中的Solarized Colors

Go to Profiles => Colors => Load Presets to pick Solarized Dark.


## hexo安装
<script src="https://gist.github.com/pengjunlong/932d45b78bdf73ef51a88767d66992fa.js"></script>