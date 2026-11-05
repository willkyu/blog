---
title: 宝可梦六代实机乱数（破解机插件辅助 & 不包含蛋）
author: willkyu
date: 2022-01-15 16:32:56
categories:
  - Pokemon
tags:
  - Pokemon
  - Pokemon-RNG-Abuse
  - Pokemon-Gen6
---
本文内容不涉及3ds/2ds系列的破解过程，本篇内容均建立在读者已经将3ds/2ds系列破解了的基础上.

同时本文使用的是**正版卡带 + 辅助插件**，相应盗版软件无法正常操作.

<!-- more -->

**注意，本教程仅支持宝可梦六代正作游戏：**

Version |X|Y|欧米伽红宝石|阿尔法蓝宝石|其他
:-----:|:------:|:------:|:------:|:------:|:------:
Support |✔|✔|✔|✔|✘

本篇搬运+修改自**無論**的原博客：[口袋妖怪第六世代-ORAS乱数记录](https://wulun0102.github.io/2021-08-21/%E5%8F%A3%E8%A2%8B%E5%A6%96%E6%80%AA%E7%AC%AC%E5%85%AD%E4%B8%96%E4%BB%A3-ORAS%E4%B9%B1%E6%95%B0%E8%AE%B0%E5%BD%95/).

授权图：
![Authorization](/images/body/Pokemon-RNG-Abuse-Gen6/Authorization.jpg)

# 前言

本文仅写出了自己在使用插件过程中遇到的BUG，如果有其他小伙伴出现了其他问题，可以跳转到参考网址中相关插件的发布网址寻求答案.
关于原始 **（非破解）** 的Seed确定方法我找到了一篇文章：[第六世代固定シンボル乱数調整のやり方 - かけらの記録ノート](https://sina-poke.hatenablog.com/entry/2017/05/06/000557). 总的来说非常繁琐，值得尝试但不建议推广. 参考文章中也有说到六代的乱数麻烦在哪里，在这里就不再赘述了.

成果展示：[無論的b站视频](https://www.bilibili.com/video/BV13v411N74t?spm_id_from=333.999.0.0)

> 如果你在找 3DS 系列的破解教程，请参考 [3DS/2DS破解-开始  -一只火狐的杂物间](https://stray-soul.com/index.php/3dshack-getstarted) 或者 [这里](https://3ds.hacks.guide/).

# 辅助插件准备及使用

> **PCalc** 和 **pokeCalcNTR** 是一个东西.
> 对于 alc 我只搜到了 *ALC MAXScript*（以下称为*ALC*）

安装一个插件（PCalc）来辅助您的Pokemon游戏，以下内容将引导您如何让插件正常运行.
**pokeCalcNTR for Gen 6 - v0.3.0**

## 所需工具：
- 一台有CFW（Custom Firmware）的3DS系列掌机（即俗称破解3DS）
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- PCalc for Gen 6
  - [PCalc-oras](https://pokemonrng.com/downloads/pcalc/pcalc-oras.zip)
  - [PCalc-xy](https://pokemonrng.com/downloads/pcalc/pcalc-xy.zip)

## Step 1：安装 NTR
通过安装一种引导器（BootNTR Selector）来完成安装 NTR.

- N3DS and N2DSXL: Download and install BootNTR Selector.
  - Download either of the CIAs that are not Mode 3. (Difference is Banner when loading BootNTR Selector, so you can choose either one.) Then copy CIA to SD card and install using FBI.
> Note： 如果使用FBI安装CIA，请在控制台启动FBI然后导航到目标CIA文件，然后按**A键**安装

启动引导NTR选择器并选择修改默认设置
- 版本3.6（替换3.4和3.5）是唯一适用于插件的版本，因此每次启动 NTR 时都会选择该版本
- **针对 O3DS 和 O2DS**：请在[How to Install PCalc](https://www.pokemonrng.com/misc-3ds-installing-pcalc)中寻找，但是ORAS对O3DS并不支持.

## 故障排除：

- （主要是3DS固件版本过高和Luma的问题？）
- BootNTR Selector 下最高版本的没有问题（需要）
- 我用的是 **Luma3ds 10.2.1** 与 **3DS 11.14.0 固件**
- [Important Information about 2DS/3DS System Version 11.14](https://support.sudomemo.net/info-about-2ds-3ds-system-version-11-14/)
  - 这个里面导致NTR安装失败出问题的是**boot.firm**
  - 我不知道网上在哪里找了一个做替换，然后就成了
  - 最后升级游戏时升级3DS固件版本到11.15现在也没啥问题
- 在下面贴出当时使用的 **Luma10.2.1原文件** 和 **现在使用的文件**
  - [Luma10.2.1原文件](https://pan.baidu.com/s/1Yjeuk1-qx2sC1cFhxXR57w) 可以用来升级Luma什么的
  - [现在使用的文件](https://pan.baidu.com/share/init?surl=l0SK4vuE5qv_dcetW3tuaQ) 请提取对应的 **boot.firm** 文件
  - 提取密码都是：**0102**

> 更新 Luma 可以参考[更新Luma10.2.1 -一只火狐的杂物间](https://stray-soul.com/index.php/updateluma10-2)

## Step 2：下载 PCalc 文件

第二步是下载 PCalc 插件（其他版本的插件可以找下面参考网址中的帖子去下载）

[OR/AS](https://pokemonrng.com/downloads/pcalc/pcalc-oras.zip)
[X/Y](https://pokemonrng.com/downloads/pcalc/pcalc-xy.zip)
[Transporter](https://pokemonrng.com/downloads/pcalc/pcalc-tport.zip)

1. 下载 `.zip` 文件，以获得对应的版本并解压内容.
2. 将插件文件夹从 `.zip` 移动到SD卡的根部. 如果出现提示，选择合并并覆盖内容.
3. 在SD卡上的`root部分`应有文件夹，并且应有 2/4/6/8 个文件夹（这取决于您下载并安装的 PCCALCS）. 并且每个文件夹内应有 `.Plugin` `cheat.plg` 的文件组成

## Step 3：启动 PCalc
启动NTR选择器，然后应用您的选择 `NTR 3.6`. 屏幕会闪烁一下蓝色，当你启动游戏的时候如果屏幕闪烁绿色，恭喜你做到了！

> Note: PCalc Menu can be opened by pressing X+Up on D-pad. NTR Menu can be opened by pressing X+Y. Useful for taking screenshots for proofs, all screenshots are saved to root of SD card as .bmp files.

# 游戏更新及插件启动故障排除
## 3DS固件版本故障排除
如果您更新到 11.6，NTR 无法工作，请确保您拥有最新的 BootNTR 选择器和/或引导选择器模式 3.
> 您可以在启动X时通过按住X轻松更新.

## 游戏版本故障排除
如果使用 ORAS 和 PCalc 不起作用：
- 确保你有最新更新的游戏补丁.
- ORAS为v1.4. 游戏版本可以在系统设置里面找到.

  >（System Settings —> Data Management —> NINTENDO 3DS —> Downloadable Content）

- 更新可以从 Eshop 下载或使用 CFW 从另一台机器中提取.

## 其他原因故障排除
如果游戏更新到最新版本，并且PCalc和/或NTR未加载：
- 删除 SD 卡上的所有 NTR 相关文件.
  - 删除 SD 卡根部的任何 NTR .bin文件.
  - 删除这些文件夹及其内容：
    - SD:/Nintendo 3DS/EBNTR/
    - SD:/3ds/ntr/
    - SD:/3ds/BootNTRSelector/
- 通过启动引导NTR选择器和启动NTR选择器模式3，再次重新下载所需的NTR文件.

## 关于神奇宝贝第 6/7 代游戏更新：
- 如果您有一个固件区域更改`console or emunand`，这可以从其他来源获得，例如从其他console、emunand 或 sysnand 中丢掉您的更新.
- 口袋妖怪游戏更新不是区域锁定（即日版破解机也能通过插入美版卡带下载游戏更新，即更新补丁各个区域的卡带通用）.
- 游戏卡带和数字更新存储在 SD 卡上，并且`console/emunand`是每个机子特定的，并且必须安装在您正在使用游戏对应的`console/emunand`上.

## 主机相关报错
### err 009-2920
- 问题描述：
  - 我遇到的情况就是OR游戏可以正常更新，但是AS的不行，猜测是之前有遗留没有删干净的残余文件（在删干净主界面能看到的应用之后）
- 修复方法：
  - 打开FBI —> 打开 ticket 选项 —> 看到红色字的ID一律删除
  - 疯狂选中按A就好了，然后直接就更新正常了

# 乱数ID

详情 [Trainer ID RNG（ORAS）](https://www.pokemonrng.com/retail-oras-tid)、[Trainer ID, Secret ID, and/or TSV RNG（XY）](https://www.pokemonrng.com/pcalc-xy-tid)中已经写明了，我在这里只简单的说一些事项.
![Trainer ID RNG](/images/body/Pokemon-RNG-Abuse-Gen6/Trainer-ID-RNG.png)

1. 打开 `wwwwwwzx` 大佬的乱数工具 **3DSRNGTool**
2. 获取开始帧信息（gen6下方的四组数据）
  - 方法1：使用NTR助手（非必须，需要在局域网下进行）
  - 方法2：手动填入
  - **注意事项**：这里不需要关注frame对应的seed，因为这里的乱数信息在很早就已经确定并且不是以60帧/s的速度改变ID数据，只需要注意给**角色取名**时的关键节点进行帧信息的获取就好. （具体方法请看上面的网址和[wwwwwwzx大佬GitHub中的`Readme.md`文件](https://github.com/wwwwwwzx/3DSRNGTool#readme)）
3. 决定ID信息
  - 如上面所述这里的乱数信息不是跟随图像变化的，消耗帧的方法是**给角色取名之后再取消**，过程相对比较繁琐所以我当时只刷了几遍，看到4999就收了emmm
  - 乱这个的时候建议多过几遍最开始的剧情找个好的开始帧…这样轻松一些（建议使用NTR助手）
  - NTR Helper里面的那个自动过帧我没玩儿明白反正…
4. 记录ID信息
  - 我个人建议在你乱出来ID之后，记录一下对应的表里ID（也就是TID & SID）他们共同决定了你的闪值（TSV）
  > 在六七代中训练家的TSV和获得宠物（初次取名）时的PSV是否相同决定了宠物是否为异色

# 确定TSV
- 如果你之前乱数过ID并记录了对应的TSV，请跳过这步并在乱数工具对应的位置上填好tsv
- 如果没有乱数过，请继续往下看

## 额外需要工具：

- Checkpoint（宝可梦游戏存档导出导入工具包）
- [PKHex](https://github.com/kwsch/PKHeX/releases)
  仅用于查看 **tsv**.

### STEP 1：导出存档
如何导出存档请看 [如何备份你的存档 相应部分](/Pokemon/Strategies/In-Game/How-To-Back-Up-Your-Savefiles/#NDS-%E4%B8%8E-3DS-%E5%8D%A1%E5%B8%A6-%E4%BB%A5%E5%8F%8A-3DS-VC-%E7%B3%BB%E5%88%97)或者直接点击[这里](https://projectpokemon.org/home/tutorials/save-editing/managing-3ds-saves/using-checkpoint-r25/)来查看. 然后在 `/3ds/Checkpoint/saves/(your game)/`目录中的 `main` 文件就是你的游戏存档，将其放到电脑合适地方以便于后面在 **PKHeX** 中打开

### STEP 2：打开 PKHEX
- 打开PKHeX （ 黄色框中参数选项中可以将软件调成中文 ）
- 将Step 1中获得的main文件拖入到PKHeX中
- 再选择红色框中的那个“OT/…”（初训家& ？）
- 鼠标悬浮到SID（or TID）里面的数字上就能看到你的TSV了

需要注意的参数|TSV显示
:-----:|:------:
![pkhex1](/images/body/Pokemon-RNG-Abuse-Gen6/pkhex1.png)|![pkhex2](/images/body/Pokemon-RNG-Abuse-Gen6/pkhex2.png)

# 乱数宝可梦
## 3DSRNGTOOL界面设置
以下是3DS乱数工具中会用到以及需要调整的部分
- 蓝色框中注意TSV是否填写正确（如果不知道请跳转到上方[确定TSV](#确定tsv)）
- 红色框中注意每次的 *Init Seed* （在点击神兽界面变化之后的）和延迟（因为不同神兽的捕获地点入场动画不同，所以对应的延迟参数也不同）
- 请确认蓝色框和红色框的数据之后再点击绿色框
- **注意！**黄色框的同步性格选项不会对下面结果有任何影响 依旧是是50%几率替换对应帧的性格Orz

## PCALC 工具使用
组合键使用
```
- X+Up: Key Combo Menu
- Start+Down: Egg Seed View
- Start+Up: RNG Tools
- Start+Left: Wild Pokemon View
- Start+Right: Party Pokemon View
- Select+Left: Party Pokemon View -1 Slot
  - Plugin switches to the other daycare in Egg View
  - Plugin switches Horde Pokemon -1 Slot in Wild View
- Select+Right: Party Pokemon View +1 Slot
  - Plugin switches to the other daycare in Egg View
  - Plugin switches Horde Pokemon +1 Slotin Wild View
- Start+Select: Pause Game
- Pause+A: Unpause Game
  - Additionally, press any D-Pad and the "Y" button plus A to unpause as well
    - (This helps with certain RNG types)
- Pause+Start: Unpause Game
- Pause+Select: Advance One Frame
```
这个里面我们主要用到 `Start+Select` & `Pause+Select`，简单翻译就是先使用 `Start+Select` 暂停帧跳动，然后再在 *Pause* 状态下单独按 `Select` 让游戏消耗一帧.

### 部分故障排除
- 我按了"A"，但我的战斗没有开始/没有点击上"A"
  - 确保按住"A"，而不是轻点它
- 我暂停在一个奇数/偶数的帧，但我的目标是在一个偶数/奇数帧
  - 保存您的游戏通常会将帧从奇数切换到偶数 or 偶数切换到奇数
    - 请在到达目标帧之前操作，以免后面无法调整
- other：[pokeCalcNTR for Gen 6 - The RNG Tool Suite for the 3ds](https://gbatemp.net/threads/pokecalcntr-for-gen-6-the-rng-tool-suite-for-the-3ds.473221/)

## 操作流程（通用）
1. 进入 **BootNTR Selector** 显示 *Succeeded* & 屏幕一篮  --->  进入游戏屏幕一绿（就可以开工了）
2. 在选择存档界面输入 *Init Seed* 到 3DSRNGTool 里面计算是否有合适的目标帧
  - 如果没有，按 **B** 回到神兽界面，再按 **A** 进入刷新 *Init Seed* ，道理同SL
  ![InitSeed](/images/body/Pokemon-RNG-Abuse-Gen6/InitSeed.png)
3. 确定停止界面（离目标帧大约100帧内 然后用select慢慢逼近）
4. 校准延迟（不同神兽的场景对应这不同击中时机，可以根据自己机器的情况改变 3DSRNGTool 中的延迟参数）
5. 精确调整帧数（逐步使用**Select** [注意：击中的帧数是奇数还是偶数](#部分故障排除)）
  - 使用 PCalc，在游戏选择屏幕上等待，直到接近您想要的Frame
  - 一旦你接近你想要的Frame，按**Start+Select**暂停游戏
  - 按**Select**逐帧前进，直到达到您想要的Frame
  - 到达所需Frame后，**按住A**
6. 击中目标帧

## 部分场景的逐步调整击中帧的界面
- 御三家
  ![initialFlash](/images/body/Pokemon-RNG-Abuse-Gen6/initialFlash.jpg)
- 水都剧情闪（OR的哥哥，AS的妹妹）
  ![Latios](/images/body/Pokemon-RNG-Abuse-Gen6/Latios.gif)
- 定点闪
  - 充满雷电的云
    ![Thundurus](/images/body/Pokemon-RNG-Abuse-Gen6/Thundurus.gif)
  - 时空裂缝
    ![Palkia](/images/body/Pokemon-RNG-Abuse-Gen6/Palkia.gif)

# Reference
- [口袋妖怪第六世代-ORAS乱数记录](https://wulun0102.github.io/2021-08-21/%E5%8F%A3%E8%A2%8B%E5%A6%96%E6%80%AA%E7%AC%AC%E5%85%AD%E4%B8%96%E4%BB%A3-ORAS%E4%B9%B1%E6%95%B0%E8%AE%B0%E5%BD%95/)
-  [3DS/2DS破解-开始  -一只火狐的杂物间](https://stray-soul.com/index.php/3dshack-getstarted)
- [How to Install PCalc](https://www.pokemonrng.com/misc-3ds-installing-pcalc)
- [第六世代固定シンボル乱数調整のやり方 - かけらの記録ノート](https://sina-poke.hatenablog.com/entry/2017/05/06/000557)
- [Trainer ID RNG](https://www.pokemonrng.com/retail-oras-tid)
- [Trainer ID, Secret ID, and/or TSV RNG](https://www.pokemonrng.com/pcalc-xy-tid)
- [pokeCalcNTR for Gen 6 - The RNG Tool Suite for the 3ds](https://gbatemp.net/threads/pokecalcntr-for-gen-6-the-rng-tool-suite-for-the-3ds.473221/)
- [【乱数】3ds乱数工具+6代一些游戏机制的补充【口袋妖怪吧】](https://tieba.baidu.com/p/5168730356?pid=108235360876&cid=0#108235360876)
- [常见问题 - 3DS Hacks Guide](https://tieba.baidu.com/p/5168730356?pid=108235360876&cid=0#108235360876)
- [3DS BootNTR金手指使用教程 - 一只火狐的杂物间一只火狐的杂物间](https://stray-soul.com/index.php/how-to-use-bootntr)
- [BootNTRSelector 2.13.4更新支持11.14【3ds破解吧】_百度贴吧](https://tieba.baidu.com/p/7108473529)

# Appreciation
- 感谢**無論**的授权，可以去[無論的博客](https://wulun0102.github.io/)看看.
- 感谢**wwwwwwzx**大佬的研究成果.
