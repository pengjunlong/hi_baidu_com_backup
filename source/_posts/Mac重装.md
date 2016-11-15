title: Mac重装系统
author: 九头鸟龙
tags: []
categories: []
date: 2016-11-15 17:33:00
---
# 数据备份
可以用外部存储或网络备份，也可以用磁盘工具单独分一个区用来备份

# 重装系统
关机后，开机时（开机音乐响后）按住command+R，如果不小心看到只有一个带感叹号文件夹在闪，可以开机后按住command+option+P+R,然后再开机按住command+R

开机后可选择进入磁盘工具，格式化原系统分区；然后退出磁盘工具，选择重新安装系统，注意需要有靠谱网络连接（实测不稳定出现2003F等错误后可关机重复操作，直至下载进度条完成）

# 码农必备xcode command tools
可使用xcode-select -p查看是否已安装
也可直接敲gcc命令，mac会聪明的自动弹出安装对话框，选择安装即可

# 软件管理必备brew
使用mac自带“终端”程序，敲入

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
```
即完成brew安装。

使用brew cask可方便的安装一些GUI软件，可考虑加上

```bash
brew install caskroom/cask/brew-cask
```

brew操作过程中可能会遇到github API报错（如果brew源未更改的话）

```bash
Error: GitHub API Error: API rate limit exceeded for 103.37.140.11.
```
根据命令行提示去github申请单独token即可

# 常用软件
```bash
#替换终端
brew cask install iterm2
#替换浏览器
brew cask install google-chrome
#开发
brew cask install java
brew install maven
brew install jetty
brew install vim --with-lua --with-override-system-vi
brew cask install android-studio
brew cask install intellij-idea
#娱乐
brew cask install virtualbox virtualbox-extension-pack
brew cask install the-unarchiver
brew cask install mplayerx
brew cask install sogouinput
open /usr/local/Caskroom/sogouinput/3.8.0.2054/安装搜狗输入法.app
```

# goproxy
./goproxy -v=2

# chrome设置
登录以同步设置、扩展、书签等
SwitchyOmega扩展用来配合科学上网，

配置在线恢复：
http://switchysharp.com/file/SwitchyOptions.bak

配置自动切换：
https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt

# dotfile管理
```bash
sh -c "`curl -fsSL https://raw.githubusercontent.com/skwp/dotfiles/master/install.sh `"
```

# hexo安装
```bash
brew install node
npm install hexo --no-optional
```