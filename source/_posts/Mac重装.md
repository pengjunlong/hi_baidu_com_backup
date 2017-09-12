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

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
```
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
```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
brew update -v
```

## 常用软件
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
#brew cask install android-studio
brew cask install intellij-idea
brew install wget
#虚拟机，安装Windows用
brew cask install virtualbox virtualbox-extension-pack
brew cask install the-unarchiver
brew cask install mplayerx
#输入法
brew cask install sogouinput
open /usr/local/Caskroom/sogouinput/3.8.0.2054/安装搜狗输入法.app
```

## git库访问权限支持
```bash
ssh-keygen -t rsa -b 4096 -C "xxx@gmail.com"
#拷贝公钥
pbcopy < ~/.ssh/id_rsa.pub
```



## goproxy
编译安装比较纠结（“GoProxy 对 golang 周边库做了一些修改”），所以直接下载编译好的包比较方便

[简易教程](https://github.com/phuslu/goproxy/blob/wiki/SimpleGuide.md)

访问https://github.com/phuslu/goproxy-ci/releases/latest下载最新版，如goproxy_macos_amd64-r1419.tar.bz2，文件托管在amazonaws.com，会有点慢

查看appid可访问https://console.cloud.google.com/home/dashboard

导入代理自动切换规则可以参考https://github.com/gfwlist/gfwlist


```bash
mkdir goproxy
cd goproxy
#先下载gae服务器程序，用来上传到gae平台，之前已经部署过的话可以跳过
#上传成功，请不要忘记编辑 gae.user.json 把你的appid填进去
wget https://github.com/phuslu/goproxy-ci/releases/download/r1419/goproxy-gae-r65.zip
unzip goproxy-gae-r65.zip
cd goproxy-r65
python uploader.py
#然后是下载本地客户端，这里下载的是命令行形式的，也可以下载mac app版本
wget https://github.com/phuslu/goproxy-ci/releases/download/r1419/goproxy_macos_amd64-r1419.tar.bz2
tar zxvf goproxy_macos_amd64-r1419.tar.bz2
#编辑完gae.json就可以运行了
vim gae.json
sudo ./goproxy -v=2
#下载SwitchyOmega插件对应的备份配置，然后导入插件
wget https://raw.githubusercontent.com/pengjunlong/goagent/master/local/SwitchyOptions.bak
```

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
```bash
sh -c "`curl -fsSL https://raw.githubusercontent.com/skwp/dotfiles/master/install.sh `"
```
### 启用iterm2中的Solarized Colors

Go to Profiles => Colors => Load Presets to pick Solarized Dark.


## hexo安装
```bash
#安装hexo
brew install node
npm install -g hexo-cli
#下载博客hexo分支
git clone -b hexo --single-branch git@github.com:pengjunlong/pengjunlong.github.io.git hexo
cd hexo/
npm install
#下载主题
git clone https://github.com/iissnan/hexo-theme-next themes/next
git status
git checkout themes/
#运行
hexo s -w
```