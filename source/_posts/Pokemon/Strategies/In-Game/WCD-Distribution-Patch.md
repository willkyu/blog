---
title: 如何自制宝可梦Gen4与Gen5的配信器
author: willkyu
date: 2021-12-15 22:52:38
categories:
  - Pokemon
tags:
  - Pokemon
  - Pokemon-Distribution
  - Pokemon-Gen4
  - Pokemon-Gen5
---
这是宝可梦自制四五代配信器的教程.
如有纰漏，请[与我联系](/about/)，万分感谢！

<!-- more -->

**注意，本教程仅支持[宝可梦第四世代](https://wiki.52poke.com/wiki/%E7%AC%AC%E5%9B%9B%E4%B8%96%E4%BB%A3)正作游戏与[宝可梦第五世代](https://wiki.52poke.com/wiki/%E7%AC%AC%E4%BA%94%E4%B8%96%E4%BB%A3)正作游戏.**

如果你在找[宝可梦第三世代](https://wiki.52poke.com/wiki/%E7%AC%AC%E4%B8%89%E4%B8%96%E4%BB%A3)的船票配信方法，请点击[这里](https://github.com/mrhappyasthma/NDSEventTool.nds).

# 准备工作
**请确保你了解一些计算机基础知识**

## 硬件准备
- 能够游玩第四、五世代宝可梦卡带的*NDS*、*3DS*系列机器**两台**（以下简称 *DS* 系列掌机）.
- 电脑.
- *NDS*烧录卡与读卡器.

## 下载配信所需工具：
- 四代[WCDPatcher](https://gbatemp.net/threads/wcdpatcher.129568/)
  上面帖子里的下载地址失效了，可以点击[这里](https://projectpokemon.org/home/files/file/1808-pok%C3%A9mon-wcd-patcher/)下载.
- [你想要的配信的Mystery Gift and Wonder Card files](https://projectpokemon.org/home/files/category/2-event-gallery/)
- 或者点击[这里](/download/WCD-Distribution-Patch.rar)下载由b站用户[翾樾non](https://space.bilibili.com/3691432)整理的自制配信器所需的所有文件.
  > 很遗憾我没有找到他这里第五世代的`LTDCE.exe`文件的发布网站，但找到了另外一个第五世代配信器制作软件[PKMG5DC](https://github.com/PlasticJustice/PKMG5DC)，感兴趣的话可以自行研究一下

> b站用户[翾樾non](https://space.bilibili.com/3691432)有发布很详细的[视频教学](https://www.bilibili.com/video/BV1QW411D78Q?share_source=copy_web)，请先观看该视频.

# 制作配信器
如果你下载的是压缩包，请先解压.
> 接下来的教程将会以下载[翾樾non](https://space.bilibili.com/3691432)提供的压缩包为例.

## 第四世代
![Figure1](/images/body/WCD-Distribution-Patch/Figure1.png)

- 打开*Gen4*文件夹中的`WCDPatcher.exe`. 点击红色框.
- 在弹出的*Select the Distribution ROM*窗口中选择同一目录下的`NTR-AARE-USA - GameStop Deoxys.nds`文件并点击*打开*.
- 点击`WCDPatcher.exe`上的蓝色框.
- 在弹出的*Select the Wondercard ROM*窗口中，打开文件夹`Gen4\PPorg_GenIV_WCs\PPorg_GenIV_WCs\`并寻找你所需要的配信文件并点击*打开*.
  如`Gen4\PPorg_GenIV_WCs\PPorg_GenIV_WCs\Darkrai - Movie 2007\`文件夹下的`007 Movie Darkrai ENG-USA [PPorg].pcd`文件.

  > 注意，每个配信对应的文件夹中的文件分游戏语音（地区）版本，请选择你接收的游戏对应的版本

- 点击`WCDPatcher.exe`上的紫色框，并选择对应地区语言版本.
- 点击`WCDPatcher.exe`上的黄色框.
- 在弹出的*Select the New ROM Location*窗口中，打开到你想要保存的位置，在文件名处随意命名，点击*保存*.
- 得到`.nds`文件.

## 第五世代
![Figure2](/images/body/WCD-Distribution-Patch/Figure2.png)

- 打开*Gen5*文件夹中的`LTDCE.exe`. 点击**Open ROM**.
- 在弹出的*Open Nintendo DS ROM*窗口中选择同一目录下的`2046 Liberty Pass ENG .nds`文件并点击*打开*.
- 点击`LTDCE.exe`上的红色框.
- 在弹出的*Open Pokemon Mystery Gift File*窗口中，打开文件夹`Gen5\PPorg_GenV_WCs\PPorg_GenV_WCs`并根据你的游戏语言版本进入对应文件夹，寻找你所需要的配信文件并点击*打开*.
  如`Gen5\PPorg_GenV_WCs\PPorg_GenV_WCs\English`文件夹下的`028 Dark Explorer Darkrai ENG [PPorg].pgf`文件.
- 点击`LTDCE.exe`上的绿色框，并选择对应地区语言版本.
- 点击`LTDCE.exe`上的蓝色框.
- 在弹出的*Save Nintendo DS ROM*窗口中，打开到你想要保存的位置，在文件名处随意命名，点击*保存*.
- 得到`.nds`文件.

# 进行配信
- 将上一步得到的`.nds`文件放入烧录卡中，使用一台 *DS* 系列掌机打开该nds文件.
- 另一台 *DS* 系列掌机运行游戏，按照正常配信步骤配信即可. 参考[神百--神秘礼物](https://wiki.52poke.com/wiki/%E7%A5%9E%E7%A7%98%E7%A4%BC%E7%89%A9#.E7.AC.AC.E5.9B.9B.E4.B8.96.E4.BB.A3)界面.

> 注意，这一步请确保 *DS* 系列掌机的WiFi开关打开（New 3DS、New 2DS、2DS、DSi系列需要在设置中打开，3DS需要打开侧边开关，DS、DS Lite系列不用管）
